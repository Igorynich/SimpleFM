import {Player} from '../interfaces/player';
import {RosterPower, Starters} from '../services/base-result-gen.service';
import {LeagueTable} from '../interfaces/league-table';
import {CUP_INTERVAL, HOME_TEAM_POWER_ADVANTAGE_PCT} from '../constants/general';
import {round} from 'lodash';
import {Match1} from '../interfaces/match1';
import {Match} from '../interfaces/match';
import {Club} from '../interfaces/club';

export function sortClubsRoster(roster: Player[]): Player[] {
  const gks = roster.filter(pl => pl.position === 'GK').sort((a, b) => b.power - a.power);
  const defs = roster.filter(pl => pl.position === 'D').sort((a, b) => b.power - a.power);
  const mids = roster.filter(pl => pl.position === 'M').sort((a, b) => b.power - a.power);
  const forwards = roster.filter(pl => pl.position === 'F').sort((a, b) => b.power - a.power);
  return [
    ...gks.splice(0, 1),
    ...defs.splice(0, 4),
    ...mids.splice(0, 4),
    ...forwards.splice(0, 2),
    ...gks,
    ...defs,
    ...mids,
    ...forwards
  ];
}

export function sortStarters(roster: Player[]): Player[] {
  const starters = getStarters(roster);
  const sortedStarters = [...starters.gk, ...starters.d, ...starters.m, ...starters.f];
  return [...sortedStarters, ...getReserves(roster)];
}

export function getStarters(roster: Player[]): Starters {
  const starters = roster.filter((value, index) => index < 11);
  // console.log('Starters', starters);
  return {
    gk: starters.filter((value) => value.position === 'GK').sort((a, b) => b.power - a.power),
    d: starters.filter(value => value.position === 'D').sort((a, b) => b.power - a.power),
    m: starters.filter(value => value.position === 'M').sort((a, b) => b.power - a.power),
    f: starters.filter(value => value.position === 'F').sort((a, b) => b.power - a.power)
  };
}

export function getReserves(roster: Player[]): Player[] {
  // return roster.filter((value, index) => index >= 11).sort((a, b) => b.power - a.power);
  return roster.filter((value, index) => index >= 11);
}

export function sortTable(a: LeagueTable, b: LeagueTable) {
  if (a.points === b.points) {                          // очки
    if (b.gd === a.gd) {                                // разница мячей
      if (b.gf === a.gf) {                              // забитые мячи
        if (b.wins === a.wins) {                        // победы
          if (b.draws === a.draws) {                    // ничьи
            return b.clubName > a.clubName ? -1 : 1;    // алфавит
          }
          return b.draws - a.draws;
        }
        return b.wins - a.wins;
      }
      return b.gf - a.gf;
    }
    return b.gd - a.gd;
  }
  return b.points - a.points;
}

export function resultSplitter(result: string): number[] {
  return result ? result.split(' - ').map(value => parseInt(value, 10)) : [0, 0];
}

export function decideWinner(result: string): 'home' | 'away' | 'draw' {
  const [homeScore, awayScore] = result.split(' - ');
  const [homeGoals, awayGoals] = resultSplitter(result);
  const isHomeAWinner = homeScore.includes('e') || homeScore.includes('p') || homeGoals > awayGoals;
  const isAwayAWinner = awayScore.includes('e') || awayScore.includes('p') || awayGoals > homeGoals;
  if (isHomeAWinner) {
    return 'home';
  }
  if (isAwayAWinner) {
    return 'away';
  }
  return 'draw';
}

export function isCupWeek(curWeek: number, cupRounds: number): boolean {
  return !!curWeek && curWeek % CUP_INTERVAL === 0 && curWeek <= CUP_INTERVAL * cupRounds;
}

export function getLeagueWeek(curWeek: number, cupRounds: number): number {
  if (curWeek > CUP_INTERVAL * cupRounds) {
    return curWeek - cupRounds;
  }
  return curWeek - Math.floor(curWeek / CUP_INTERVAL);
}

export function leagueTourToWeek(tour: number, cupRounds: number): number {       // 22 , 5
  let add = Math.floor(tour / CUP_INTERVAL);    // 4
  if (add >= CUP_INTERVAL) {      // false
    add += Math.floor(cupRounds / CUP_INTERVAL);
  }
  const sum = tour + add;         // 26
  let res = tour + Math.floor(sum / CUP_INTERVAL);      // 27
  if (res > CUP_INTERVAL * cupRounds) {     // true
    // res -= cupRounds;       // 22
    res = tour + cupRounds;
  }
  if (getLeagueWeek(res, cupRounds) !== tour) {
    console.error('Yikes', tour, res);
  }
  return res;
}

export function calculateRosterPower(roster: Player[], isHomeTeam = false): RosterPower {
  const homeAdvMulti = isHomeTeam ? (1 + HOME_TEAM_POWER_ADVANTAGE_PCT / 100) : 1;
  const {gk, d, m, f} = getStarters(roster);
  return {
    gk: gk[0].power * homeAdvMulti,
    d: round(d.reduce((previousValue, currentValue) => previousValue + currentValue.power, 0) * homeAdvMulti, 2),
    m: round(m.reduce((previousValue, currentValue) => previousValue + currentValue.power, 0) * homeAdvMulti, 2),
    f: round(f.reduce((previousValue, currentValue) => previousValue + currentValue.power, 0) * homeAdvMulti, 2)
  };
}

export function matchToMatch1(match: Match, home: Club, away: Club): Match1 {
  return {
    away,
    field: match.field,
    home,
    id: match.id,
    isCupMatch: match.isCupMatch,
    tournament: match.tournament
  };
}
