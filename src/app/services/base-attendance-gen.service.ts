import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState,
  selectClubByClubsNameEn,
  selectClubPowersByLeaguesNameEn,
  selectLeagueTableByLeaguesNameEn
} from '../store/selectors/current-game.selectors';
import {Match} from '../interfaces/match';
import {take, withLatestFrom} from 'rxjs/operators';
import {LeagueTable} from '../interfaces/league-table';
import {Club} from '../interfaces/club';
import {round} from 'lodash';
import {closest, limitTo} from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class BaseAttendanceGenService {

  readonly LEAGUE_POS_DIF_COEF = {        // homeNameEn - awayNameEn
    10: 0.6,
    9: 0.7,
    8: 0.8,
    7: 0.9,
    6: 0.9,
    5: 0.9,
    4: 1,
    3: 1,
    2: 1,
    1: 1,       // maybe needed to be bigger for closer numbers
    '-1': 1.1,
    '-2': 1.2,
    '-3': 1.3,
    '-4': 1.4,
    '-5': 1.5,
    '-6': 1.6,
    '-7': 1.7,
    '-8': 1.8,
    '-9': 1.9,
    '-10': 2
  };

  readonly HOME_LEAGUE_POS_COEF = {
    1: 2,
    2: 2,
    3: 2,
    4: 1.9,
    5: 1.8,
    6: 1.7,
    7: 1.6,
    8: 1.5,
    9: 1.4,
    10: 1.3,
    11: 1.2,
    12: 1.1,
    13: 1,
    14: 0.9,
    15: 0.8,
    16: 0.7,
    17: 0.6,
    18: 0.5
  };

  readonly POWER_DIF_COEF = {
    44: 0.5,
    38: 0.6,
    33: 0.7,
    27: 0.8,
    22: 0.9,
    16: 1,
    11: 1.1,
    6: 1.2,
    '-6': 1.3,
    '-11': 1.4,
    '-16': 1.5,
    '-22': 1.6,
    '-27': 1.7,
    '-33': 1.8,
    '-38': 1.9,
    '-44': 2
  };

  readonly SEASON_START_POWER_POSITIONS_DIF_COEF = {
    30: 0.5,
    20: 0.6,
    15: 0.7,
    10: 0.8,
    7: 0.9,
    4: 1,
    '-4': 1.1,
    '-7': 1.2,
    '-10': 1.4,
    '-15': 1.6,
    '-20': 1.8,
    '-30': 2
  };

  constructor(private store: Store<AppState>) { }

  generateAttendance(homePower: number, awayPower: number, result: string, match: Match): number {
    let home: Club;
    let away: Club;
    this.store.select(selectClubByClubsNameEn, {clubsNameEn: match.homeNameEn}).pipe(take(1)).subscribe(club => {
      home = club;
    });
    this.store.select(selectClubByClubsNameEn, {clubsNameEn: match.awayNameEn}).pipe(take(1)).subscribe(club => {
      away = club;
    });
    let attendance = home.stadium;
    const baseAttendance = round(home.stadium / 2, 0);
    this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: home.leagueNameEn})
      .pipe(withLatestFrom(this.store.select(selectClubPowersByLeaguesNameEn, {leaguesNameEn: home.leagueNameEn})), take(1))
      .subscribe(([leagueTable, clubPowersArray]: [LeagueTable[], {club: Club, power: number}[]]) => {
        // use leaguePosition - powerPosition to generate attendance
        const homeLeaguePos = leagueTable.findIndex((tableLine: LeagueTable) => home.nameEn === tableLine.club.nameEn);
        const awayLeaguePos = leagueTable.findIndex((tableLine: LeagueTable) => away.nameEn === tableLine.club.nameEn);
        const homeStartSeasonPowerObj = clubPowersArray.find((powerObj: {club: Club, power: number}) =>
          powerObj.club.nameEn === match.homeNameEn);
        const awayStartSeasonPowerObj = clubPowersArray.find((powerObj: {club: Club, power: number}) =>
          powerObj.club.nameEn === match.awayNameEn);
        const homeStartSeasonPowerPos = clubPowersArray.findIndex((powerObj: {club: Club, power: number}) =>
          powerObj.club.nameEn === match.homeNameEn);
        const awayStartSeasonPowerPos = clubPowersArray.findIndex((powerObj: {club: Club, power: number}) =>
          powerObj.club.nameEn === match.awayNameEn);
        const posDif = limitTo(homeLeaguePos - awayLeaguePos, 10);
        console.log('posDif: real - rounded', homeLeaguePos - awayLeaguePos, posDif);
        const posDifAttCoef = this.LEAGUE_POS_DIF_COEF[posDif];
        const homeLeaguePosAttCoef = this.HOME_LEAGUE_POS_COEF[limitTo(homeLeaguePos || 1, 18)];
        const awayLeaguePosAttCoef = this.HOME_LEAGUE_POS_COEF[limitTo(awayLeaguePos || 1, 18)];
        console.log('Curernt match Powers', homePower, awayPower);
        const powerDif = homePower - awayPower;
        const powerDifCoef = this.POWER_DIF_COEF[closest(powerDif, Object.keys(this.POWER_DIF_COEF))];
        console.log('Start season PowerObjs', homeStartSeasonPowerObj, awayStartSeasonPowerObj);
        console.log('Start season Power positions', homeStartSeasonPowerPos, awayStartSeasonPowerPos);
        const seasonStartPowerPosDif = homeStartSeasonPowerPos - awayStartSeasonPowerPos;
        const seasonStartPowerPosDifCoef =
          this.SEASON_START_POWER_POSITIONS_DIF_COEF[
            closest(seasonStartPowerPosDif, Object.keys(this.SEASON_START_POWER_POSITIONS_DIF_COEF))];
        console.log(`Coefs: ${baseAttendance} * ${posDifAttCoef} * ${homeLeaguePosAttCoef} * ${awayLeaguePosAttCoef}
         * ${powerDifCoef} * ${seasonStartPowerPosDifCoef}`);
        attendance = baseAttendance * posDifAttCoef * homeLeaguePosAttCoef * awayLeaguePosAttCoef * powerDifCoef
          * seasonStartPowerPosDifCoef;
        if (attendance > home.stadium) {
          attendance = home.stadium;
        }
        console.warn(`${match.homeNameEn} - ${match.awayNameEn} Attendance`, attendance);
    });
    return round(attendance, 0);
  }
}
