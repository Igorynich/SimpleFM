import {Injectable} from '@angular/core';
import {ResultGenerator} from '../interfaces/result-generator';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentWeekSchedule, selectPlayersByClubsNameEn} from '../store/selectors/current-game.selectors';
import {CurrentWeekSchedule} from '../interfaces/current-week-schedule';
import {map, take, withLatestFrom} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {randomInteger} from '../utils/helpers';
import {Match} from '../interfaces/match';
import {addGoalScorersForMatch, setABunchOfResult, setResult} from '../store/actions/current-game.actions';
import { round } from 'lodash';
import {Player} from '../interfaces/player';
import {Club} from '../interfaces/club';
import {clearSubscription} from '../utils/clean-subscriptions';
import {getStarters} from '../utils/sort-roster';

@Injectable({
  providedIn: 'root'
})
export class BaseResultGenService implements ResultGenerator {

  lul$ = new BehaviorSubject<CurrentWeekSchedule[]>([]);
  inProgress = false;

  readonly BASE_NUMBER_OF_SHOTS = 10;
  readonly BASE_SHOTS_CONVERSION_PCT = 10;
  readonly HOME_TEAM_POWER_ADVANTAGE_PCT = 10;
  readonly SHOTS_MULTI_POWER = 2;
  readonly GOAL_CHANCE_MODIFIER = {
    GK: 0,
    D: 1,
    M: 2,
    F: 4
  };

  private _selectSub: Subscription;

  constructor(private store: Store<AppState>) {
  }

  generateWeekResults(): Observable<CurrentWeekSchedule[]> {
    const a$ =  this.store.select(selectCurrentWeekSchedule).pipe(map((value: CurrentWeekSchedule[]) => {
      console.warn(`Current Week Schedule`, value, value.length);
      // add generated results here to each of value[0, 1, 2, 3...].matches

      if (!this.inProgress) {
        console.log('Inside of inProgress');
        const allMatches = [];
        value.forEach((value1: CurrentWeekSchedule) => {
          allMatches.push(...value1.matches);
          /* value1.matches.forEach((value2: Match) => {
             if (!value2.result) {
               this.generateResult(value2);
             }
           });*/
        });

        this.generateResultsForWholeWeek(allMatches);
      }

      const lastSchedule = value[value.length - 1];
      const lastMatchInLastSchedule = lastSchedule.matches[lastSchedule.matches.length - 1];
      if (lastMatchInLastSchedule.result) {
        this.inProgress = false;
        console.log('Lul next', [...value]);
        // gotta use lul$ cause of strange behaviour of a$ observable(in subscription - new value, then, for some reason old)
        this.lul$.next([...value]);
      }
      return value;
    }));
    return a$;
  }

  private generateResult(match: Match): string {
    console.log('Generating res for ', match);
    const {home, away} = match;
    let result;
    clearSubscription(this._selectSub);
    this._selectSub = this.store.select(selectPlayersByClubsNameEn, {clubsNameEn: home.nameEn})
      // take(1) cause it runs result generation twice for LAST match (god knows why)
      .pipe(withLatestFrom(this.store.select(selectPlayersByClubsNameEn, {clubsNameEn: away.nameEn})), take(1))
      .subscribe(([homeRoster, awayRoster]) => {
      const homePower = this.calculateRosterPower(homeRoster);
      const awayPower = this.calculateRosterPower(awayRoster);
      console.log(`${home.nameEn} powers`, homePower);
      console.log(`${away.nameEn} powers`, awayPower);
      result = this.calculateResult(homePower, awayPower);
      this.generateMatchStats(homeRoster, awayRoster, result, match);

    });
    return result;
  }

  private generateResultsForWholeWeek(matches: Match[]) {
    console.log('Generating res for whole week ', matches);
    this.inProgress = true;
    const results = [];
    matches.forEach((value: Match) => {
      results.push(this.generateResult(value));
    });
    this.store.dispatch(setABunchOfResult({results, matches}));
  }

  /*private getStarters(roster: Player[]): Starters {
    const starters = roster.filter((value, index) => index < 11);
    console.log('Starters', starters);
    return {
      gk: starters.find((value1, index) => value1.position === 'GK'),
      d: starters.filter(value1 => value1.position === 'D'),
      m: starters.filter(value1 => value1.position === 'M'),
      f: starters.filter(value1 => value1.position === 'F')
    };
  }*/

  private calculateRosterPower(roster: Player[], isHomeTeam = false): RosterPower {
    const homeAdvMulti = isHomeTeam ? (1 + this.HOME_TEAM_POWER_ADVANTAGE_PCT / 100) : 1;
    /*const starters = roster.filter((value1, index) => index < 11);
    const gk = starters.find((value1, index) => value1.position === 'GK');
    const d = starters.filter(value1 => value1.position === 'D');
    const m = starters.filter(value1 => value1.position === 'M');
    const f = starters.filter(value1 => value1.position === 'F');*/
    const {gk, d, m, f} = getStarters(roster);
    return {
      gk: gk[0].power * homeAdvMulti,
      d: round(d.reduce((previousValue, currentValue) => previousValue + currentValue.power, 0) * homeAdvMulti, 2),
      m: round(m.reduce((previousValue, currentValue) => previousValue + currentValue.power, 0) * homeAdvMulti, 2),
      f: round(f.reduce((previousValue, currentValue) => previousValue + currentValue.power, 0) * homeAdvMulti, 2)
    };
  }

  private calculateResult(homePower: RosterPower, awayPower: RosterPower): string {
    const homeOffensePower = homePower.f + homePower.m;
    const awayOffensePower = awayPower.f + awayPower.m;
    const homeDefencePower = homePower.gk + homePower.d;
    const awayDefencePower = awayPower.gk + awayPower.d;
    const homeShotsMulti = Math.pow(homeOffensePower / awayDefencePower, this.SHOTS_MULTI_POWER);
    const awayShotsMulti = Math.pow(awayOffensePower / homeDefencePower, this.SHOTS_MULTI_POWER);
    const homeShots = this.BASE_NUMBER_OF_SHOTS * homeShotsMulti;
    const awayShots = this.BASE_NUMBER_OF_SHOTS * awayShotsMulti;
    console.log(`SHOTS: ${homeShots} - ${awayShots}`);
    let homeGoals = 0;
    let awayGoals = 0;
    let i = 1;
    let j = 1;
    while (i <= homeShots || j <= awayShots) {
      if (i <= homeShots) {
        const gameDif = homeGoals - awayGoals;
        const min = gameDif > 0 ? Math.pow(gameDif, 1.6) : 1;       // goal score mitigation
        const rand = randomInteger(min, 100);
        if (rand <= this.BASE_SHOTS_CONVERSION_PCT) {
          homeGoals++;
        }
        i++;
      }
      if (j <= awayShots) {
        const gameDif = awayGoals - homeGoals;
        const min = gameDif > 0 ? Math.pow(gameDif, 1.6) : 1;       // goal score mitigation
        const rand = randomInteger(min, 100);
        if (rand <= this.BASE_SHOTS_CONVERSION_PCT) {
          awayGoals++;
        }
        j++;
      }
    }
    return `${homeGoals} - ${awayGoals}`;
  }

  private generateMatchStats(homeRoster: Player[], awayRoster: Player[], result: string, match: Match) {
    const [homeGoals, awayGoals] = result.split(' - ').map(value => +value);
    const homeScores: {[minute: number]: Player} = this.generateGoalScorers(homeGoals, homeRoster);
    const awayScores: {[minute: number]: Player} = this.generateGoalScorers(awayGoals, awayRoster);
    this.store.dispatch(addGoalScorersForMatch({matchId: match.id, goals: {homeGoals: homeScores, awayGoals: awayScores}}));
    // dispatch goals
  }

  private generateGoalScorers(numOfGoals: number, roster: Player[]): {[minute: number]: Player} {
    if (!!numOfGoals) {
      const homeGoalChanceWeightsArray = this.getGoalChanceWeights(roster);
      console.log('homeGoalChanceWeightsArray', homeGoalChanceWeightsArray);
      const homeGoalChanceSum = homeGoalChanceWeightsArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      const goals: {[minute: number]: Player} = {};
      for (let i = 1; i <= numOfGoals; i++) {
        const randomMinute = randomInteger(1, 90);
        const homeRandomInt = randomInteger(0, homeGoalChanceSum);
        let sum = 0;
        for (let j = 0; j < homeGoalChanceWeightsArray.length; j++) {
          sum = sum + homeGoalChanceWeightsArray[j];
          if (sum > homeRandomInt) {
            goals[randomMinute] = roster[j];
            break;
          }
        }
      }
      console.warn('goals', goals);
      return goals;
    }
    return {};
  }

  private getGoalChanceWeights(roster: Player[]): number[] {
    const starters = getStarters(roster);
    const weights = {
      gk: starters.gk.map(value => value.power * this.GOAL_CHANCE_MODIFIER.GK * 10),
      d: starters.d.map(value => value.power * this.GOAL_CHANCE_MODIFIER.D * 10),
      m: starters.m.map(value => value.power * this.GOAL_CHANCE_MODIFIER.M * 10),
      f: starters.f.map(value => value.power * this.GOAL_CHANCE_MODIFIER.F * 10)
    };
    return [...weights.gk, ...weights.d, ...weights.m, ...weights.f];
  }
}

export interface RosterPower {
  gk: number;
  d: number;
  m: number;
  f: number;
}

export interface Starters {
  gk: Player[];
  d: Player[];
  m: Player[];
  f: Player[];
}
