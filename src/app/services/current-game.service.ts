import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {map, switchMap, take} from 'rxjs/operators';
import {Club} from '../interfaces/club';
import {Observable} from 'rxjs';
import {Player} from '../interfaces/player';
import {League} from '../interfaces/league';
import {shuffleArray} from '../utils/helpers';
import {Country} from '../interfaces/country';
import {WeekSchedule} from '../interfaces/league-schedule';
import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {

  currentClub: Club;
  currentClubId: string;
  currentPlayers: Player[];
  scheduleShell = [];
  weekScheduleShell = [];
  rerunsHappened = 0;

  constructor(private fs: FirebaseService) {
  }

  getCurrentClub(): Observable<any> {
    return this.fs.getClubs().pipe(take(1), map(clubs => {
      const randomNum = Math.ceil(Math.random() * 19).toFixed(0);
      console.log(randomNum);
      this.currentClub = clubs[randomNum];
      this.currentClubId = this.currentClub.id;
    }), switchMap(value => this.fs.getPlayersByClub(this.currentClub.nameEn).pipe(map(players => {
      console.log(`Players of ${this.currentClub.nameRu}`, players);
      // init sort for 4-4-2
      const gks = players.filter(pl => pl.position === 'GK').sort((a, b) => b.power - a.power);
      const defs = players.filter(pl => pl.position === 'D').sort((a, b) => b.power - a.power);
      const mids = players.filter(pl => pl.position === 'M').sort((a, b) => b.power - a.power);
      const forwards = players.filter(pl => pl.position === 'F').sort((a, b) => b.power - a.power);
      this.currentPlayers = [
        ...gks.splice(0, 1),
        ...defs.splice(0, 4),
        ...mids.splice(0, 4),
        ...forwards.splice(0, 2),
        ...gks,
        ...defs,
        ...mids,
        ...forwards
      ];
    }))));
  }

  generateLeagueSchedules(leagues: League[], clubs: Club[]): {[key: string]: WeekSchedule[][]} {
    const leagueSchedules = {};
    leagues.forEach(league => {
      this.scheduleShell = [];
      const leagueClubs = clubs.filter(club => club.leagueNameEn === league.nameEn);
      if (!!leagueClubs.length) {
        this.generateLeagueScheduleShell(clubs.length);
        shuffleArray(leagueClubs);
        console.log('Shuffled clubs', leagueClubs);
        const leagueSchedule = this.scheduleShell.map(value => {
          return value.map(value1 => {
            return {
              home: leagueClubs[value1.home.num - 1],
              away: leagueClubs[value1.away.num - 1]
            };
          });
        });
        const leagueScheduleReversed = leagueSchedule.map(value => {
          return value.map(value1 => {
            const home = value1.home;
            const away = value1.away;
            return {
              home: away,
              away: home
            };
          });
        });
        console.log(`${league.nameRu} schedule`, leagueSchedule);
        leagueSchedules[league.id] = [...leagueSchedule, ...leagueScheduleReversed];
      }
    });
    return leagueSchedules;
  }

  generateCupSchedules(countries: Country[], leagues: League[], clubs: Club[]) {

  }


  generateLeagueScheduleShell(numOfTeams: number) {
    const teams: Team[] = [];
    for (let i = 0; i < numOfTeams; i++) {
      teams.push({
        num: i + 1,
        last: null
      });
    }
    // num of weeks  = numOfTeams - 1
    for (let i = 0; i < numOfTeams - 1; i++) {
      this.rerunsHappened = 0;
      this.weekScheduleShell = [];
      console.warn(`-------WEEK ${i + 1}`);
      if (i === 0) {
        // week 1
        for (let j = 0; j < numOfTeams; j = j + 2) {
          this.pushTeamsToWeekly(teams[j], teams[j + 1]);
        }
      } else {
        this.generateWeeklySchedule(teams);
        console.log(`Weekly ${i + 1} COMPLETE`, this.weekScheduleShell);
      }
      this.scheduleShell.push(this.weekScheduleShell);
    }

    console.log('Resulting schedule', this.scheduleShell.map(value => value.map(value1 => `${value1.home.num} - ${value1.away.num}`)));
  }

  generateWeeklySchedule(teams: Team[]) {
    for (let i = 0; i < teams.length / 2; i ++) {
      const leftoverTeams = teams.filter(value => this.teamIsNotInWeekSchedule(value));
      const randomIndex = Math.floor(Math.random() * (leftoverTeams.length - 1));
      const team = leftoverTeams[randomIndex];
      const eligibleTeams = teams.filter(team1 => !this.getTeamPlayed(team).includes(team1.num) && team.num !== team1.num
        && this.teamIsNotInWeekSchedule(team1));
      if (!eligibleTeams.length && this.rerunsHappened < 1000) {
        console.error(`----rerun for team ${team.num}----`, team, this.getTeamPlayed(team))
        this.rerunsHappened++;
        this.weekScheduleShell = [];
        this.generateWeeklySchedule(teams);
        break;
      }
      const randomIndex1 = Math.floor(Math.random() * (eligibleTeams.length - 1));
      let homeTeam: Team = team;
      let awayTeam: Team = eligibleTeams[randomIndex1];
      // TODO: adjust homes-aways based on previous weeks
      if (team.last === 'a') {
        homeTeam = team;
        awayTeam = eligibleTeams[randomIndex1];
      } else if (team.last === 'h') {
        awayTeam = team;
        homeTeam = eligibleTeams[randomIndex1];
      }
      this.pushTeamsToWeekly(homeTeam, awayTeam);
    }
  }

  getTeamPlayed(team: Team, scheduleShell = this.scheduleShell): number[] {
    const played: number[] = [];
    scheduleShell.forEach((value, index) => {
      const teamsMatch = value.find(value1 => value1.home.num === team.num || value1.away.num === team.num);
      if (!teamsMatch) {
        console.error(`No match for ${team.num} in week ${index + 1}`, value);
      }
      const opponentNum = teamsMatch.home.num === team.num ? teamsMatch.away.num : teamsMatch.home.num;
      played.push(opponentNum);
    });
    return played;
  }

  pushTeamsToWeekly(homeTeam: Team, awayTeam: Team) {
    // console.log('Pushing to weekly', homeTeam, awayTeam);
    this.weekScheduleShell.push({
      home: homeTeam,
      away: awayTeam
    });
    // marking teams - who they played and where
    // homeTeam.played.push(awayTeam.num);
    homeTeam.last = homeTeam.last === 'h' ? '2h' : 'h';
    // awayTeam.played.push(homeTeam.num);
    awayTeam.last = awayTeam.last === 'a' ? '2a' : 'a';
  }

  teamIsNotInWeekSchedule(team: Team): boolean {
    return !this.weekScheduleShell.find(value => {
      return value.home.num === team.num || value.away.num === team.num;
    });
  }
}

export interface Team {
  num: number;
  last: 'h' | '2h' | 'a' | '2a' | null;
}
