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
import {Store} from '@ngrx/store';
import {AppState, selectLeagueScheduleShellByNumberOfClubs} from '../store/selectors/current-game.selectors';

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

  constructor(private fs: FirebaseService, private store: Store<AppState>) {
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

  generateLeagueSchedules(leagues: League[], clubs: Club[]): { [key: string]: WeekSchedule[][] } {
    const leagueSchedules = {};
    leagues.forEach(league => {
      this.scheduleShell = [];
      const leagueClubs = clubs.filter(club => club.leagueNameEn === league.nameEn);

      if (!!leagueClubs.length) {
        let scheduleShell;
        shuffleArray(leagueClubs);
        console.log('Shuffled clubs', leagueClubs);
        this.store.select(selectLeagueScheduleShellByNumberOfClubs, {numOfClubs: leagueClubs.length})
        /*this.fs.getLeagueScheduleShell(leagueClubs.length)*/.subscribe(value => {
          console.log('League schedule', value);
          scheduleShell = value.schedule;
          const leagueSchedule = scheduleShell.map(value2 => {
            return value2.week.map(value1 => {
              return {
                home: leagueClubs[value1.h - 1],
                away: leagueClubs[value1.a - 1]
              };
            });
          });
          leagueSchedules[league.id] = leagueSchedule;
          // TODO check if schedule is full
          if (leagueSchedule.length === (leagueClubs.length - 1)) {
            const leagueScheduleReversed = leagueSchedule.map(value2 => {
              return value2.map(value1 => {
                const home = value1.home;
                const away = value1.away;
                return {
                  home: away,
                  away: home
                };
              });
            });
            leagueSchedules[league.id] = [...leagueSchedule, ...leagueScheduleReversed];
          }
        });
        console.log(`${league.nameRu} schedule`, leagueSchedules[league.id]);
        // this.generateLeagueScheduleShell(clubs.length);
      }
    });
    return leagueSchedules;
  }

  generateCupSchedules(countries: Country[], leagues: League[], clubs: Club[]): { [countryId: string]: WeekSchedule[][] } {
    const cupsSchedules = {};
    countries.forEach(country => {
      const countryLeagues = leagues.filter(league => league.countryNameEn === country.nameEn);
      if (countryLeagues.length) {
        const countryLeagueNameEns = countryLeagues.map(league => league.nameEn);
        const countryClubs = clubs.filter(club => countryLeagueNameEns.includes(club.leagueNameEn));
        if (countryClubs.length) {
          cupsSchedules[country.id] = this.generateCupScheduleShell(countryClubs);
        }
      }
    });
    return cupsSchedules;
  }

  private generateCupScheduleShell(clubs: Club[]): WeekSchedule[][] {
    let numOfClubsToGenSchedule = clubs.length;
    if (Math.log2(clubs.length) % 1 !== 0) {
      numOfClubsToGenSchedule = 2 ** Math.ceil(Math.log2(clubs.length));
    }
    let teams: CupTeam[] = [];
    for (let i = 0; i < clubs.length; i++) {
      teams.push({
        num: i + 1,
        real: true
      });
    }
    for (let i = teams.length; i < numOfClubsToGenSchedule; i++) {
      teams.push({
        num: i + 1,
        real: false
      });
    }
    // num of rounds = Math.ceil(Math.log2(clubs.length))
    const numOfRounds = Math.ceil(Math.log2(clubs.length));
    const numOfRealMatchesInR1 = clubs.length - (teams.length / 2);
    const cupSchedule = [];
    for (let i = 0; i < numOfRounds; i++) {
      const roundSchedule = [];
      if (i === 0) {
        let realMatchesCount = 0;
        while (teams.length) {
          const randomIndex = Math.floor(Math.random() * (teams.length - 1));
          const home = teams[randomIndex];
          teams = teams.filter((value, index) => index !== randomIndex);
          let away;
          if (!home.real) {
            const realTeams = teams.filter(value => value.real);
            // only real teams
            const randomIndex1 = Math.floor(Math.random() * (realTeams.length - 1));
            away = realTeams[randomIndex1];
          } else if (home.real && realMatchesCount < numOfRealMatchesInR1) {
            // any team
            const randomIndex1 = Math.floor(Math.random() * (teams.length - 1));
            away = teams[randomIndex1];
            if (teams[randomIndex1].real) {
              realMatchesCount++;
            }
          } else if (home.real && realMatchesCount >= numOfRealMatchesInR1) {
            // only fake teams
            const fakeTeams = teams.filter(value => !value.real);
            const randomIndex1 = Math.floor(Math.random() * (fakeTeams.length - 1));
            away = fakeTeams[randomIndex1];
          }
          teams = teams.filter(value => value.num !== away.num);
          roundSchedule.push({
            home,
            away,
            isCupMatch: true
          });
        }
      } /*else {
        // rounds after 1 generated automatically as w1(winner of match 1 previous round) - w2, w3 - w4 etc
        for (let j = 0; j < cupSchedule[i - 1].length / 2; j++) {
          const match1 = cupSchedule[i - 1][j];
          const match2 = cupSchedule[i - 1][j + 1];
          roundSchedule.push({
            home: (!match1.home || !match1.away) ? (match1.home || match1.away) : null,
            away: (!match2.home || !match2.away) ? (match2.home || match2.away) : null,
            isCupMatch: true
          });
        }
      }*/
      cupSchedule.push(roundSchedule);
    }
    shuffleArray(clubs);
    const cupScheduleWithRealClubs: WeekSchedule[][] = cupSchedule.map(value => {
      return value.map(value1 => {
        return {
          home: value1.home ? clubs[value1.home.num - 1] : null,
          away: value1.away ? clubs[value1.away.num - 1] : null,
          isCupMatch: true
        };
      });
    });
    cupScheduleWithRealClubs.forEach((value, index) => {
      // проводим во второй раунд те клубы у которых нет соперников в 1-м - т.о. заполняем 2-й раунд
      if (index === 1) {    // возможно добавить проверку на нынешнюю неделю сезона и генерировать весь оставшийся скедуль исходя из этого
        for (let j = 0; j < cupScheduleWithRealClubs[index - 1].length / 2; j++) {
          const match1 = cupScheduleWithRealClubs[index - 1][j * 2];
          const match2 = cupScheduleWithRealClubs[index - 1][j * 2 + 1];
          value.push({
            home: (!match1.home || !match1.away) ? (match1.home || match1.away) : null,
            away: (!match2.home || !match2.away) ? (match2.home || match2.away) : null,
            isCupMatch: true
          });
        }
      }
      // заполняем оставшиеся раунды пустыми матчами
      if (index > 1) {
        for (let j = 0; j < cupScheduleWithRealClubs[index - 1].length / 2; j++) {
          value.push({
            home: null,
            away: null,
            isCupMatch: true
          });
        }
      }
    });
    console.log('cupScheduleWithRealClubs', cupScheduleWithRealClubs);
    return cupScheduleWithRealClubs;
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
    for (let i = 0; i < teams.length / 2; i++) {
      const leftoverTeams = teams.filter(value => this.teamIsNotInWeekSchedule(value));
      const randomIndex = Math.floor(Math.random() * (leftoverTeams.length - 1));
      const team = leftoverTeams[randomIndex];
      const eligibleTeams = teams.filter(team1 => !this.getTeamPlayed(team).includes(team1.num) && team.num !== team1.num
        && this.teamIsNotInWeekSchedule(team1));
      if (!eligibleTeams.length && this.rerunsHappened < 1000) {
        console.error(`----rerun for team ${team.num}----`, team, this.getTeamPlayed(team));
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
        const eligibleTeamsFiltered = eligibleTeams.filter(value => value.last !== 'a' && value.last !== '2a');
        awayTeam = eligibleTeams[randomIndex1];
      } else if (team.last === 'h') {
        awayTeam = team;
        homeTeam = eligibleTeams[randomIndex1];
      } else if (team.last === '2h') {
        awayTeam = team;
        homeTeam = eligibleTeams[randomIndex1];
      } else if (team.last === '2a') {
        homeTeam = team;
        awayTeam = eligibleTeams[randomIndex1];
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
    homeTeam.last = homeTeam.last === 'h' || homeTeam.last === '2h' ? '2h' : 'h';
    // awayTeam.played.push(homeTeam.num);
    awayTeam.last = awayTeam.last === 'a' || awayTeam.last === '2a' ? '2a' : 'a';
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

export interface CupTeam {
  num: number;
  real: boolean;
}
