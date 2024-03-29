import {Injectable} from '@angular/core';
import {ResultGenerator} from '../interfaces/result-generator';
import {Store} from '@ngrx/store';
import {
  AppState,
  selectClubByClubsNameEn,
  selectCurrentWeekSchedule,
  selectPlayersByClubsNameEn
} from '../store/selectors/current-game.selectors';
import {CurrentWeekSchedule} from '../interfaces/current-week-schedule';
import {catchError, filter, map, take, withLatestFrom} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {randomInteger} from '../utils/helpers';
import {Match} from '../interfaces/match';
import {
  addAttendanceForMatch, addFinanceRecord,
  addGainsAndLossesForMatch,
  addGoalScorersForMatch,
  setABunchOfResult,
  setResult,
  updateTables
} from '../store/actions/current-game.actions';
import {round} from 'lodash';
import {Player} from '../interfaces/player';
import {Club} from '../interfaces/club';
import {clearSubscription} from '../utils/clean-subscriptions';
import {calculateRosterPower, getStarters, resultSplitter} from '../utils/sort-roster';
import {BaseGainsGenService} from './base-gains-gen.service';
import {BaseAttendanceGenService} from './base-attendance-gen.service';
import {FinanceService} from './finance.service';

@Injectable({
  providedIn: 'root'
})
export class BaseResultGenService implements ResultGenerator {

  lul$ = new BehaviorSubject<CurrentWeekSchedule[]>([]);
  inProgress = false;

  readonly BASE_NUMBER_OF_SHOTS = 10;
  readonly BASE_SHOTS_CONVERSION_PCT = 10;
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

  constructor(private store: Store<AppState>,
              private gainsService: BaseGainsGenService,
              private attendanceService: BaseAttendanceGenService,
              private financeService: FinanceService) {
  }

  generateWeekResults(): Observable<CurrentWeekSchedule[]> {
    const a$ = this.store.select(selectCurrentWeekSchedule).pipe(take(1),
      map((value: CurrentWeekSchedule[]) => {
        console.warn(`Current Week Schedule`, value);
        if (!this.inProgress) {
          const allMatches = [];
          value.forEach((value1: CurrentWeekSchedule) => {
            allMatches.push(...value1.matches);
          });
          this.generateResultsForWholeWeek(allMatches);
        }
        this.inProgress = false;
        return value;
      }), catchError(err => {
        console.error('Caught this shit', err);
        return of([]);
      }));
    return a$;
  }

  private generateResultsForWholeWeek(matches: Match[]) {
    console.log('Generating res for whole week ', matches);
    this.inProgress = true;
    const results = [];
    matches.forEach((value: Match) => {
      results.push(this.generateResult(value));
    });
    // this.store.dispatch(setABunchOfResult({results, matches}));
  }

  private generateResult(match: Match): string {
    // console.warn(`Generating for ${match.homeNameEn} - ${match.awayNameEn} ---- START`, match);
    const {homeNameEn, awayNameEn} = match;
    let result;
    clearSubscription(this._selectSub);
    this._selectSub = this.store.select(selectPlayersByClubsNameEn, {clubsNameEn: homeNameEn})
    // take(1) cause it runs result generation twice for LAST match (god knows why)
      .pipe(withLatestFrom(this.store.select(selectPlayersByClubsNameEn, {clubsNameEn: awayNameEn})), take(1))
      .subscribe(([homeRoster, awayRoster]) => {
        const homePower = calculateRosterPower(homeRoster, true);
        const awayPower = calculateRosterPower(awayRoster);
        // console.log(`${homeNameEn} powers`, homePower);
        // console.log(`${awayNameEn} powers`, awayPower);
        result = this.calculateResult(homePower, awayPower, match);
        this.generateMatchStats(homeRoster, awayRoster, result, match);
        this.generateAttendancesAndIncome(homeRoster, awayRoster, result, match);
        // console.warn(`Generating for ${match.homeNameEn} - ${match.awayNameEn} ---- FINISH`, match);
      });
    return result;
  }

  private calculateResult(homePower: RosterPower, awayPower: RosterPower, match: Match): string {
    // console.warn(`Calculating Result for ${match.homeNameEn} - ${match.awayNameEn} ---- START`, match);
    const homeOffensePower = homePower.f + homePower.m;
    const awayOffensePower = awayPower.f + awayPower.m;
    const homeDefencePower = homePower.gk + homePower.d;
    const awayDefencePower = awayPower.gk + awayPower.d;
    const homeShotsMulti = Math.pow(homeOffensePower / awayDefencePower, this.SHOTS_MULTI_POWER);
    const awayShotsMulti = Math.pow(awayOffensePower / homeDefencePower, this.SHOTS_MULTI_POWER);
    const homeShots = this.BASE_NUMBER_OF_SHOTS * homeShotsMulti;
    const awayShots = this.BASE_NUMBER_OF_SHOTS * awayShotsMulti;
    // console.log(`SHOTS: ${homeShots} - ${awayShots}`);
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
      const rand = randomInteger(0, 1);     // randomize: winner - homeNameEn or awayNameEn
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
    // console.warn(`Result: ${homeGoals}${cupDeciderH} - ${awayGoals}${cupDeciderA}`);
    // console.warn(`Calculating Result for ${match.homeNameEn} - ${match.awayNameEn} ---- FINISH`);
    return `${homeGoals}${cupDeciderH} - ${awayGoals}${cupDeciderA}`;
  }

  private generateMatchStats(homeRoster: Player[], awayRoster: Player[], result: string, match: Match) {
    // console.warn(`Generating Match Stats for ${match.homeNameEn} - ${match.awayNameEn} ---- START`, match);
    const [homeGoals, awayGoals] = resultSplitter(result);
    const cupDecider = result.includes('e') ? 'e' : '';
    const homeScorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } } =
      this.generateGoalScorers(homeGoals, homeRoster, homeGoals > awayGoals ? cupDecider : '');
    const awayScorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } } =
      this.generateGoalScorers(awayGoals, awayRoster, homeGoals < awayGoals ? cupDecider : '');
    // console.warn(`Goalscorers pre dispatch`, homeScorers, awayScorers);
    this.store.dispatch(addGoalScorersForMatch({
      matchId: match.id,
      goals: {
        homeRoster: homeRoster.filter((value, index) => index < 11),
        awayRoster: awayRoster.filter((value, index) => index < 11),
        homeGoals: homeScorers.goals,
        homeAssists: homeScorers.assists,
        awayGoals: awayScorers.goals,
        awayAssists: awayScorers.assists
      },
      result
    }));
    // console.warn(`Goalscorers post dispatch`);
    const {gains, losses} = this.gainsService.generateGainsAndLosses(homeRoster, awayRoster, result, match, homeScorers, awayScorers);
    // console.warn(`GainsLosses pre dispatch`);
    this.store.dispatch(addGainsAndLossesForMatch({
      matchId: match.id,
      gains,
      losses
    }));
    // console.warn(`GainsLosses post dispatch`);
    // console.warn(`Generating Match Stats for ${match.homeNameEn} - ${match.awayNameEn} ---- FINISH`);
  }

  private generateGoalScorers(numOfGoals: number, roster: Player[], cupDecider: '' | 'e' = ''):
    { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } } {

    if (!!numOfGoals) {
      // goals
      const goalChanceWeightsArray = this.getGoalChanceWeights(roster);
      // console.log('goalChanceWeightsArray', goalChanceWeightsArray);
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
        // console.log('assistChanceWeightsArray', assistChanceWeightsArray);
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
      // console.warn('goals', goals);
      // console.warn('assists', assists);
      return {goals, assists};
    }
    return {goals: {}, assists: null};
  }

  private generateAttendancesAndIncome(homeRoster: Player[], awayRoster: Player[], result: string, match: Match) {
    // console.warn(`Generating Attendance for ${match.homeNameEn} - ${match.awayNameEn} ---- START`, match);
    const homeSumPower = homeRoster.filter((value, index) => index < 11)
      .reduce((previousValue, currentValue: Player) => previousValue + currentValue.power, 0);
    const awaySumPower = awayRoster.filter((value, index) => index < 11)
      .reduce((previousValue, currentValue: Player) => previousValue + currentValue.power, 0);
    const attendance = this.attendanceService.generateAttendance(homeSumPower, awaySumPower, result, match);
    this.store.dispatch(addAttendanceForMatch({
      matchId: match.id,
      attendance
    }));
    this.store.select(selectClubByClubsNameEn, {clubsNameEn: match.homeNameEn}).pipe(take(1)).subscribe(club => {
      const income = this.financeService.generateMatchIncome(attendance, club);
      // console.warn(`Attendance pre dispatch`);
      this.store.dispatch(addFinanceRecord({
        clubNameEn: match.homeNameEn,
        description: 'match day income',
        income,
        expense: null
      }));
      // console.warn(`Attendance post dispatch`);
    });
    // console.warn(`Generating Attendance for ${match.homeNameEn} - ${match.awayNameEn} ---- FINISH`, match);
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

  /*private generateGains(homeRoster: Player[], awayRoster: Player[], result: string, match: Match,
                        homeScorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } },
                        awayScorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } }): Player[] {
    const homePower: RosterPower = this.calculateRosterPower(homeRoster);      // homeNameEn advantage bonus already included
    const awayPower: RosterPower = this.calculateRosterPower(awayRoster);
    const homeSumPower = homePower.gk + homePower.d + homePower.m + homePower.f;
    const awaySumPower = awayPower.gk + awayPower.d + awayPower.m + awayPower.f;
    const sumPowerDif = homeSumPower - awaySumPower;
    const [homeGoals, awayGoals] = resultSplitter(result);
    const resultDif = homeGoals - awayGoals;
    /!*if () {

    }*!/
    return [];
  }*/
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
