import {Injectable} from '@angular/core';
import {Player} from '../interfaces/player';
import {Match} from '../interfaces/match';
import {calculateRosterPower, resultSplitter} from '../utils/sort-roster';
import {RosterPower} from './base-result-gen.service';
import {randomInteger} from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class BaseGainsGenService {

  readonly GAIN_STEP = 0.1;

  readonly POWER_STEP = 0.5;

  readonly GAIN_SCALE = {
    4: {hg: 0.6, ag: 1.8},
    3: {hg: 0.7, ag: 1.6},
    2: {hg: 0.8, ag: 1.4},
    1: {hg: 0.9, ag: 1.2},
    0: {hg: 1, ag: 1},
    '-1': {hg: 1.2, ag: 0.9},
    '-2': {hg: 1.4, ag: 0.8},
    '-3': {hg: 1.6, ag: 0.7},
    '-4': {hg: 1.8, ag: 0.6}
  };

  readonly OK_RESULTS_STEPS = {
    4: 6,
    3: 4,
    2: 2,
    1: 1,
    0: 0,
    '-1': -1,
    '-2': -2,
    '-3': -4,
    '-4': -6
  };

  readonly INDIVIDUAL_GAINS = {
    CLEAN_SHEET: 0.1,
    GOAL: 0.1,
    ASSIST: 0.1,
    MULTIPLE_GA_MULTI: 1.5      // 3: 0.2 * 1.5 * 1.5 * 3 = 1.35  2: 0.2 * 1.5 * 2 = 0.6
  };

  readonly INDIVID_GAINS_RESULT_COEF = {
    4: {hc: 0.6, ac: 1.4},
    3: {hc: 0.7, ac: 1.3},
    2: {hc: 0.8, ac: 1.2},
    1: {hc: 0.9, ac: 1.1},
    0: {hc: 1, ac: 1},
    '-1': {hc: 1.1, ac: 0.9},
    '-2': {hc: 1.2, ac: 0.8},
    '-3': {hc: 1.3, ac: 0.7},
    '-4': {hc: 1.4, ac: 0.6},
  };

  readonly INDIVIDUAL_LOSSES = {
    THREE_CONCEDED: 0.25,
    FOUR_CONCEDED: 0.4,
    FIVE_CONCEDED: 0.6,
    BIG_LOSS: 0.05,
    NO_GOALS_SCORED: 0.25
  };

  readonly INDIVID_LOSSES_RESULT_COEF = {
    4: {hc: 0.2, ac: 1.8},
    3: {hc: 0.4, ac: 1.6},
    2: {hc: 0.6, ac: 1.4},
    1: {hc: 0.8, ac: 1.2},
    0: {hc: 1, ac: 1},
    '-1': {hc: 1.2, ac: 0.8},
    '-2': {hc: 1.4, ac: 0.6},
    '-3': {hc: 1.6, ac: 0.4},
    '-4': {hc: 1.8, ac: 0.2},
  };

  constructor() {
  }

  generateGainsAndLosses(homeRoster: Player[], awayRoster: Player[], result: string, match: Match,
                         homeScorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } },
                         awayScorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } })
    : { gains: Player[], losses: Player[] } {
    const homePower: RosterPower = calculateRosterPower(homeRoster);      // homeNameEn advantage bonus already included
    const awayPower: RosterPower = calculateRosterPower(awayRoster);
    const homeStartingRoster = homeRoster.filter((value, index) => index < 11);
    const awayStartingRoster = awayRoster.filter((value, index) => index < 11);
    const homeSumPower = homePower.gk + homePower.d + homePower.m + homePower.f;
    const awaySumPower = awayPower.gk + awayPower.d + awayPower.m + awayPower.f;
    const sumPowerDif = (homeSumPower - awaySumPower) / 11;

    const [homeGoals, awayGoals] = resultSplitter(result);
    const resultDif = this.limitTo(homeGoals - awayGoals);
    // console.warn(`${match.homeNameEn} - ${match.awayNameEn}--------------START`);
    // console.warn('REsult Dif', resultDif, result);
    const okPowerDif = this.OK_RESULTS_STEPS[resultDif];
    // console.log('okPowerDif', okPowerDif);
    const realPowerDifSteps = Math.floor(sumPowerDif / this.POWER_STEP);
    // console.log('realPowerDifSteps', realPowerDifSteps, homeSumPower, awaySumPower);
    const powerDiscr = this.limitTo(realPowerDifSteps - okPowerDif);
    // console.log('powerDiscr', powerDiscr);
    console.warn(`${match.homeNameEn} - ${match.awayNameEn} POWER DIFF = ${sumPowerDif}`, powerDiscr);
    const gains = this.GAIN_SCALE[powerDiscr];
    // console.log('gains', gains);
    const indivGainsCoef = this.INDIVID_GAINS_RESULT_COEF[powerDiscr];
    const resultGainsPlayers = [];
    const resultLossesPlayers = [];
    // homeNameEn
    // console.warn('Regular Gains Home');
    resultGainsPlayers.push(...this.assignRegularGains(homeStartingRoster, gains.hg));
    // console.warn('Regular Losses Home');
    resultLossesPlayers.push(...this.assignRegularLosses(homeStartingRoster, gains.hg));
    // console.warn('Individual Gains Home');
    resultGainsPlayers.push(...this.assignIndividualGains(homeStartingRoster, homeScorers, awayGoals, indivGainsCoef.hc));
    // console.warn('Individual Losses Home');
    resultLossesPlayers.push(...this.assignIndividualLosses(homeStartingRoster, homeScorers, homeGoals, awayGoals, indivGainsCoef.hc));
    // awayNameEn
    // console.warn('Regular Gains Away');
    resultGainsPlayers.push(...this.assignRegularGains(awayStartingRoster, gains.ag));
    // console.warn('Regular Losses Away');
    resultLossesPlayers.push(...this.assignRegularLosses(awayStartingRoster, gains.ag));
    // console.warn('Individual Gains Home');
    resultGainsPlayers.push(...this.assignIndividualGains(awayStartingRoster, awayScorers, homeGoals, indivGainsCoef.ac));
    // console.warn('Individual Lossses Home');
    resultLossesPlayers.push(...this.assignIndividualLosses(awayStartingRoster, awayScorers, awayGoals, homeGoals, indivGainsCoef.ac));
    // console.warn(`${match.homeNameEn} - ${match.awayNameEn}--------------FINISH`, resultGainsPlayers);
    return {gains: resultGainsPlayers, losses: resultLossesPlayers};
  }

  private assignRegularGains(roster: Player[], gains: number): Player[] {
    const playersIndexes = [];
    const fractGain = gains - Math.floor(gains);
    const totalGain = Math.floor(gains) + (this.isRollSuccess(fractGain) ? 1 : 0);
    // console.log('gains and totalGain', gains, totalGain);
    for (let i = 0; i < totalGain; i++) {
      const randomInt = randomInteger(0, roster.length - 1);
      playersIndexes.push(randomInt);
    }
    // console.warn('regular gain players', playersIndexes.map(ind => roster[ind]));
    return playersIndexes.map(ind => roster[ind]);
  }

  private assignIndividualGains(roster: Player[],
                                scorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } },
                                goalsConceded: number, indivGainsCoef: number): Player[] {
    const players = [];
    const goalScorers: Player[] = scorers?.goals ? Object.values(scorers.goals) : [];
    const assistants: Player[] = scorers?.assists ? Object.values(scorers.assists) : [];
    const gkAndDefs = roster.filter(pl => pl.position === 'GK' || pl.position === 'D');
    // console.log('Goals and Asists and GkAndD', goalScorers, assistants, gkAndDefs);
    const gmap = this.scorersToMap(goalScorers);
    // goalScorers individ gains assigned here
    gmap.forEach((numOfGoals, plNameEn) => {
      let chance = this.INDIVIDUAL_GAINS.GOAL * numOfGoals * indivGainsCoef;
      for (let i = 2; i <= numOfGoals; i++) {
        chance = chance * this.INDIVIDUAL_GAINS.MULTIPLE_GA_MULTI;
      }
      // console.log(`${plNameEn} - ${numOfGoals} goals = ${chance}`);
      // целая часть chance
      for (let i = 1; i <= Math.floor(chance); i++) {
        players.push(goalScorers.find((pl: Player) => pl.nameEn === plNameEn));
        // console.log(`GoalScorer got gain from ${chance} 1`, goalScorers.find((pl: Player) => pl.nameEn === plNameEn));
      }
      // дробная
      const fractureChance = chance - Math.floor(chance);
      if (this.isRollSuccess(fractureChance)) {
        players.push(goalScorers.find((pl: Player) => pl.nameEn === plNameEn));
        // console.log(`GoalScorer got gain from ${chance} 2`, goalScorers.find((pl: Player) => pl.nameEn === plNameEn));
      }
    });
    // assistants individ gains assigned here
    const amap = this.scorersToMap(assistants);
    amap.forEach((numOfAssists, plNameEn) => {
      let chance = this.INDIVIDUAL_GAINS.ASSIST * numOfAssists * indivGainsCoef;
      for (let i = 2; i <= numOfAssists; i++) {
        chance = chance * this.INDIVIDUAL_GAINS.MULTIPLE_GA_MULTI;
      }
      // console.log(`${plNameEn} - ${numOfAssists} asists = ${chance}`);
      // целая часть chance
      for (let i = 1; i <= Math.floor(chance); i++) {
        players.push(assistants.find((pl: Player) => pl?.nameEn === plNameEn));
        // console.log(`Assistants got gain from ${chance} 1`, assistants.find((pl: Player) => pl?.nameEn === plNameEn));
      }
      // дробная
      const fractureChance = chance - Math.floor(chance);
      if (this.isRollSuccess(fractureChance)) {
        players.push(assistants.find((pl: Player) => pl?.nameEn === plNameEn));
        // console.log(`Assistants got gain from ${chance} 2`, assistants.find((pl: Player) => pl?.nameEn === plNameEn));
      }
    });
    // clean sheet gains here
    if (goalsConceded === 0) {
      gkAndDefs.forEach((pl: Player) => {
        const chance = this.INDIVIDUAL_GAINS.CLEAN_SHEET * indivGainsCoef;
        // console.log(`${pl.nameEn} - ${goalsConceded} goals conceded = ${chance}`);
        // целая часть chance (не возможно на данный момент но включено на всякий)
        for (let i = 1; i <= Math.floor(chance); i++) {
          players.push(pl);
          // console.log(`GkAndD got gain from ${chance} 1`, pl);
        }
        // дробная
        const fractureChance = chance - Math.floor(chance);
        if (this.isRollSuccess(fractureChance)) {
          players.push(pl);
          // console.log(`GkAndD got gain from ${chance} 2`, pl);
        }
      });
    }
    // console.log('Indiv player gains FINAL', players);
    return players;
  }

  private assignRegularLosses(roster: Player[], gains: number): Player[] {
    return [];
  }

  private assignIndividualLosses(roster: Player[],
                                 scorers: { goals: { [minute: number]: Player }, assists: { [minute: number]: Player | null } },
                                 goalsScored: number, goalsConceded: number, indivLossesCoef: number): Player[] {
    const players = [];
    // 3, 4, 5 conceded
    if (goalsConceded === 3 || goalsConceded === 4 || goalsConceded === 5) {
      const gkAndDefs = roster.filter(pl => pl.position === 'GK' || pl.position === 'D');
      gkAndDefs.forEach((pl: Player) => {
        let indivLoss;
        switch (goalsConceded) {
          case 3: {
            indivLoss = this.INDIVIDUAL_LOSSES.THREE_CONCEDED;
            break;
          }
          case 4: {
            indivLoss = this.INDIVIDUAL_LOSSES.FOUR_CONCEDED;
            break;
          }
          case 5: {
            indivLoss = this.INDIVIDUAL_LOSSES.FIVE_CONCEDED;
            break;
          }
        }
        const chance = indivLoss * indivLossesCoef;
        // console.log(`${pl.nameEn} - ${goalsConceded} goals conceded = ${chance}`);
        // целая часть chance (не возможно на данный момент но включено на всякий)
        for (let i = 1; i <= Math.floor(chance); i++) {
          players.push(pl);
          // console.log(`GkAndD got loss from ${chance} 1`, pl);
        }
        // дробная
        const fractureChance = chance - Math.floor(chance);
        if (this.isRollSuccess(fractureChance)) {
          players.push(pl);
          // console.log(`GkAndD got loss from ${chance} 2`, pl);
        }
      });
    }
    // big loss
    if (goalsScored - goalsConceded <= -3) {
      roster.forEach((pl: Player) => {
        const chance = this.INDIVIDUAL_LOSSES.BIG_LOSS * indivLossesCoef;
        // console.log(`${pl.nameEn} - ${goalsScored - goalsConceded} big loss = ${chance}`);
        // целая часть chance (не возможно на данный момент но включено на всякий)
        for (let i = 1; i <= Math.floor(chance); i++) {
          players.push(pl);
          // console.log(`Roster got loss from ${chance} 1`, pl);
        }
        // дробная
        const fractureChance = chance - Math.floor(chance);
        if (this.isRollSuccess(fractureChance)) {
          players.push(pl);
          // console.log(`Roster got loss from ${chance} 2`, pl);
        }
      });
    }
    // no goals scored
    if (goalsScored === 0) {
      const mAndFs = roster.filter(pl => pl.position === 'M' || pl.position === 'F');
      mAndFs.forEach((pl: Player) => {
        const chance = this.INDIVIDUAL_LOSSES.NO_GOALS_SCORED * indivLossesCoef;
        // console.log(`${pl.nameEn} - ${goalsScored} no goals loss = ${chance}`);
        // целая часть chance (не возможно на данный момент но включено на всякий)
        for (let i = 1; i <= Math.floor(chance); i++) {
          players.push(pl);
          // console.log(`mAndFs got loss from ${chance} 1`, pl);
        }
        // дробная
        const fractureChance = chance - Math.floor(chance);
        if (this.isRollSuccess(fractureChance)) {
          players.push(pl);
          // console.log(`mAndFs got loss from ${chance} 2`, pl);
        }
      });
    }
    return players;
  }


  // returns map: scorer nameEn => num of scores
  private scorersToMap(scorers: Player[]): Map<string, number> {
    const map = new Map<string, number>();
    // console.log('scorers', scorers);
    scorers.forEach((pl: Player | null) => {
      // console.log('player', pl);
      if (pl) {
        if (map.get(pl.nameEn)) {
          map.set(pl.nameEn, map.get(pl.nameEn) + 1);
        } else {
          map.set(pl.nameEn, 1);
        }
      }
    });
    return map;
  }

  private isRollSuccess(chance: number): boolean {
    if (chance > 1 || chance < 0) {
      return false;
    }
    const randomInt = randomInteger(1, 100);
    // console.log(`Rolled ${randomInt} of ${chance * 100}`, randomInt <= (chance * 100));
    return randomInt <= (chance * 100);
  }

  private limitTo(val: number, to = 4): number {
    if (val > to) {
      val = to;
    } else if (val < (0 - to)) {
      val = 0 - to;
    }
    return val;
  }


}
