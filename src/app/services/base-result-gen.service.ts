import {Injectable} from '@angular/core';
import {ResultGenerator} from '../interfaces/result-generator';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentWeekSchedule, selectPlayersByClubsNameEn} from '../store/selectors/current-game.selectors';
import {CurrentWeekSchedule} from '../interfaces/current-week-schedule';
import {filter, map, take, withLatestFrom} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {randomInteger} from '../utils/helpers';
import {Match} from '../interfaces/match';
import {addGoalScorersForMatch, setABunchOfResult, setResult, updateTables} from '../store/actions/current-game.actions';
import {round} from 'lodash';
import {Player} from '../interfaces/player';
import {Club} from '../interfaces/club';
import {clearSubscription} from '../utils/clean-subscriptions';
import {getStarters, resultSplitter} from '../utils/sort-roster';

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
  readonly ASSIST_CHANCE_MODIFIER = {
    GK: 1,
    D: 10,
    M: 50,
    F: 30
  };
  readonly NO_ASSIST_CHANCE_PCT = 20;

  private _selectSub: Subscription;

  constructor(private store: Store<AppState>) {
  }

  generateWeekResults(): Observable<CurrentWeekSchedule[]> {
    const a$ = this.store.select(selectCurrentWeekSchedule).pipe(filter((value: CurrentWeekSchedule[]) => {
        const lastSchedule = value[value.length - 1];
        const lastMatchInLastSchedule = lastSchedule.matches[lastSchedule.matches.length - 1];
        if (lastMatchInLastSchedule.result) {
          // this.inProgress = false;
          console.log('Lul next', [...value]);
          // gotta use lul$ cause of strange behaviour of a$ observable(in subscription - new value, then, for some reason old)
          // TODO check if lul is still needed
          this.lul$.next([...value]);
        }
        return (!this.inProgress && !lastMatchInLastSchedule.result) || (this.inProgress && !!lastMatchInLastSchedule.result);
      }),
      map((value: CurrentWeekSchedule[]) => {
        console.warn(`Current Week Schedule`, value, value.length);

        if (!this.inProgress) {
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
          this.store.dispatch(updateTables());
          // generate attendance and income
          // update tables, stat boards, transfer market, progress players and update schedule (if cup?)
        }
        this.inProgress = false;
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
        result = this.calculateResult(homePower, awayPower, match);
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

  private calculateRosterPower(roster: Player[], isHomeTeam = false): RosterPower {
    const homeAdvMulti = isHomeTeam ? (1 + this.HOME_TEAM_POWER_ADVANTAGE_PCT / 100) : 1;
    const {gk, d, m, f} = getStarters(roster);
    return {
      gk: gk[0].power * homeAdvMulti,
      d: round(d.reduce((previousValue, currentValue) => previousValue + currentValue.power, 0) * homeAdvMulti, 2),
      m: round(m.reduce((previousValue, currentValue) => previousValue + currentValue.power, 0) * homeAdvMulti, 2),
      f: round(f.reduce((previousValue, currentValue) => previousValue + currentValue.power, 0) * homeAdvMulti, 2)
    };
  }

  private calculateResult(homePower: RosterPower, awayPower: RosterPower, match: Match): string {
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
    let cupDeciderH = '';
    let cupDeciderA = '';
    if (match.isCupMatch && homeGoals === awayGoals) {      // cup match deciding goal
      const rand = randomInteger(0, 1);     // randomize: winner - home or away
      const rand1 = randomInteger(0, 1);    // randomize: extra time or penalty
      switch (rand1) {
        case 0:               // extra time decider
          rand === 0 ? homeGoals++ : awayGoals++;
          rand === 0 ? cupDeciderH = 'e' : cupDeciderA = 'e';
          break;
        case 1:               // penalty decider
          rand === 0 ? cupDeciderH = 'p' : cupDeciderA = 'p';
          break;
      }
    }
    return `${homeGoals}${cupDeciderH} - ${awayGoals}${cupDeciderA}`;
  }

  private generateMatchStats(homeRoster: Player[], awayRoster: Player[], result: string, match: Match) {
    const [homeGoals, awayGoals] = resultSplitter(result);
    const cupDecider = result.includes('e') ? 'e' : '';
    const homeScorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } } =
      this.generateGoalScorers(homeGoals, homeRoster, homeGoals > awayGoals ? cupDecider : '');
    const awayScorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } } =
      this.generateGoalScorers(awayGoals, awayRoster, homeGoals < awayGoals ? cupDecider : '');
    const gains: Player[] = this.generateGains(homeRoster, awayRoster, result, match, homeScorers, awayScorers);
    this.store.dispatch(addGoalScorersForMatch({
      matchId: match.id,
      goals: {
        homeRoster: homeRoster.filter((value, index) => index < 11),
        awayRoster: awayRoster.filter((value, index) => index < 11),
        homeGoals: homeScorers.goals,
        homeAssists: homeScorers.assists,
        awayGoals: awayScorers.goals,
        awayAssists: awayScorers.assists
      }
    }));
  }

  private generateGoalScorers(numOfGoals: number, roster: Player[], cupDecider: '' | 'e' = ''):
    { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } } {

    if (!!numOfGoals) {
      // goals
      const goalChanceWeightsArray = this.getGoalChanceWeights(roster);
      console.log('goalChanceWeightsArray', goalChanceWeightsArray);
      const goalChanceSum = goalChanceWeightsArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      const goals: { [minute: number]: Player } = {};
      const assists: { [minute: number]: Player } = {};
      for (let i = 1; i <= numOfGoals; i++) {
        let randomMinute = randomInteger(1, 90);
        if (i === numOfGoals && cupDecider === 'e') {     // extra time cup decider (90-120 mins)
          randomMinute = randomInteger(90, 120);
        }
        const randomIntGoal = randomInteger(1, goalChanceSum);
        let sumG = 0;
        let lastScorerIndex;    // to prevent goal scorer from assisting
        // finding a player matching randomIntGoal
        for (let j = 0; j < goalChanceWeightsArray.length; j++) {
          sumG = sumG + goalChanceWeightsArray[j];
          if (sumG > randomIntGoal) {
            goals[randomMinute] = roster[j];
            lastScorerIndex = j;
            break;
          }
        }
        // assists
        const assistChanceWeightsArray = this.getAssistChanceWeights(roster, lastScorerIndex);
        const assistChanceSum = assistChanceWeightsArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        console.log('assistChanceWeightsArray', assistChanceWeightsArray);
        const randomIntAssist = randomInteger(1, assistChanceSum);
        let sumA = 0;
        const randomIntChanceOfAssistHappened = randomInteger(1, 100);
        // roll for assistant to happen
        if (randomIntChanceOfAssistHappened > this.NO_ASSIST_CHANCE_PCT) {
          // finding a player matching randomIntAssist
          for (let k = 0; k < assistChanceWeightsArray.length; k++) {
            sumA = sumA + assistChanceWeightsArray[k];
            if (sumA > randomIntAssist) {
              assists[randomMinute] = roster[k];
              break;
            }
          }
        } else {
          assists[randomMinute] = null;
        }
      }
      console.warn('goals', goals);
      console.warn('assists', assists);
      return {goals, assists};
    }
    return {goals: {}, assists: null};
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

  private getAssistChanceWeights(roster: Player[], scorerIndex: number): number[] {
    const starters: Starters = getStarters(roster);
    const weights = {
      gk: starters.gk.map(value => value.power * this.ASSIST_CHANCE_MODIFIER.GK * 10),
      d: starters.d.map(value => value.power * this.ASSIST_CHANCE_MODIFIER.D * 10),
      m: starters.m.map(value => value.power * this.ASSIST_CHANCE_MODIFIER.M * 10),
      f: starters.f.map(value => value.power * this.ASSIST_CHANCE_MODIFIER.F * 10)
    };
    // map removes goal scorer from assist chances
    return [...weights.gk, ...weights.d, ...weights.m, ...weights.f].map((value, index) => index === scorerIndex ? 0 : value);
  }

  private generateGains(homeRoster: Player[], awayRoster: Player[], result: string, match: Match,
                        homeScorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } },
                        awayScorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } }): Player[] {
    const homePower: RosterPower = this.calculateRosterPower(homeRoster);      // home advantage bonus already included
    const awayPower: RosterPower = this.calculateRosterPower(awayRoster);
    const homeSumPower = homePower.gk + homePower.d + homePower.m + homePower.f;
    const awaySumPower = awayPower.gk + awayPower.d + awayPower.m + awayPower.f;
    const sumPowerDif = homeSumPower - awaySumPower;
    const [homeGoals, awayGoals] = resultSplitter(result);
    const resultDif = homeGoals - awayGoals;
    /*if () {

    }*/
    return [];
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
