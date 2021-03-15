import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {delay, map, switchMap, take} from 'rxjs/operators';
import {Club} from '../interfaces/club';
import {combineLatest, Observable} from 'rxjs';
import {Player} from '../interfaces/player';
import {League} from '../interfaces/league';
import {shuffleArray} from '../utils/helpers';
import {Country} from '../interfaces/country';
import {WeekSchedule} from '../interfaces/league-schedule';
import {Store} from '@ngrx/store';
import {
  AppState,
  selectClubsByLeagueId,
  selectLeagueScheduleShellByNumberOfClubs,
  selectMatchById
} from '../store/selectors/current-game.selectors';
import {LeagueTable} from '../interfaces/league-table';
import {Match} from '../interfaces/match';
import {addMatch} from '../store/actions/current-game.actions';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {

  currentClub: Club;
  currentClubId: string;
  currentPlayers: Player[];
  idCounter = 0;
  scheduleShell = [];
  weekScheduleShell = [];
  rerunsHappened = 0;

  constructor(private store: Store<AppState>) {
  }


  generateLeagueSchedules(leagues: League[] = [], clubs: Club[] = []): { [key: string]: WeekSchedule[][] } {
    const leagueSchedules = {};
    leagues.forEach(league => {
      this.scheduleShell = [];
      const leagueClubs = clubs.filter(club => club.leagueNameEn === league.nameEn);

      if (!!leagueClubs.length) {
        let scheduleShell;
        shuffleArray(leagueClubs);
        console.log('Shuffled clubs', leagueClubs);
        this.store.select(selectLeagueScheduleShellByNumberOfClubs, {numOfClubs: leagueClubs.length}).pipe(take(1))
          .subscribe(value => {
            console.log('League schedule', value);
            scheduleShell = value.schedule;
            const leagueSchedule = scheduleShell.map(value2 => {
              return value2.week.map(value1 => {
                const match = this.createMatch(leagueClubs[value1.h - 1], leagueClubs[value1.a - 1], league);
                return {
                  matchId: match.id
                };
              });
            });
            leagueSchedules[league.id] = leagueSchedule;
            // TODO check if schedule is full
            if (leagueSchedule.length === (leagueClubs.length - 1)) {
              const leagueScheduleReversed = leagueSchedule.map(value2 => {
                return value2.map(value1 => {
                  const match = this.createMatch(value1.home, value1.away, league);
                  return {
                    matchId: match.id
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

  private createMatch(homeTeam: Club | null, awayTeam: Club | null, tournament: League | { nameEn: string, nameRu: string },
                      isCupMatch = false): Match {
    const match: Match = {
      id: this.idCounter,
      isCupMatch,
      tournament,
      homeNameEn: homeTeam?.nameEn,
      awayNameEn: awayTeam?.nameEn
    };
    this.idCounter++;
    // console.log('Dispatching addMatch', match.id);
    this.store.dispatch(addMatch({match: {[match.id]: match}}));
    return match;
  }

  generateCupSchedules(countries: Country[] = [], leagues: League[] = [], clubs: Club[] = []): { [countryId: string]: WeekSchedule[][] } {
    const cupsSchedules = {};
    countries.forEach(country => {
      const countryLeagues = leagues.filter(league => league.countryNameEn === country.nameEn);
      if (countryLeagues.length) {
        const countryLeagueNameEns = countryLeagues.map(league => league.nameEn);
        const countryClubs = clubs.filter(club => countryLeagueNameEns.includes(club.leagueNameEn));
        if (countryClubs.length) {
          cupsSchedules[country.id] = this.generateCupScheduleShell(countryClubs, country);
        }
      }
    });
    return cupsSchedules;
  }

  private generateCupScheduleShell(clubs: Club[], country: Country): WeekSchedule[][] {
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
            homeNameEn: (!match1.homeNameEn || !match1.awayNameEn) ? (match1.homeNameEn || match1.awayNameEn) : null,
            awayNameEn: (!match2.homeNameEn || !match2.awayNameEn) ? (match2.homeNameEn || match2.awayNameEn) : null,
            isCupMatch: true
          });
        }
      }*/
      cupSchedule.push(roundSchedule);
    }
    shuffleArray(clubs);
    const tournament = {nameEn: `Cup of ${country.nameEn}`, nameRu: `Кубок ${country.nameRu}`};
    console.log('cupSchedule', cupSchedule);
    // use this to generate WeekSchedule[][] in existing forEaches, instead of additional one in the end
    // const cupScheduleWithRealClubsAsWeekSchedule: WeekSchedule[][] = [];
    const cupScheduleWithRealClubs: { home: Club | null, away: Club | null }[][] = cupSchedule.map(value => {
      return value.map(value1 => {
        const home = value1.home ? clubs[value1.home.num - 1] : null;
        const away = value1.away ? clubs[value1.away.num - 1] : null;
        return {
          home,
          away
        };
      });
    });
    cupScheduleWithRealClubs.forEach((value: { home: Club | null, away: Club | null }[], index) => {
      // проводим во второй раунд те клубы у которых нет соперников в 1-м - т.о. заполняем 2-й раунд
      if (index === 1) {    // возможно добавить проверку на нынешнюю неделю сезона и генерировать весь оставшийся скедуль исходя из этого
        for (let j = 0; j < cupScheduleWithRealClubs[index - 1].length / 2; j++) {
          const match1 = cupScheduleWithRealClubs[index - 1][j * 2];
          const match2 = cupScheduleWithRealClubs[index - 1][j * 2 + 1];
          const home = (!match1.home || !match1.away) ? (match1.home || match1.away) : null;
          const away = (!match2.home || !match2.away) ? (match2.home || match2.away) : null;
          value.push({
            home, away
          });
        }
      }
      // заполняем оставшиеся раунды пустыми матчами
      if (index > 1) {
        for (let j = 0; j < cupScheduleWithRealClubs[index - 1].length / 2; j++) {
          value.push({
            home: null,
            away: null
          });
        }
      }
    });

    // that's an additional one
    const cupMatches: WeekSchedule[][] = cupScheduleWithRealClubs.map((value: { home: Club | null, away: Club | null }[], index) => {
      return value.map(value1 => {
        const match = this.createMatch(value1.home, value1.away, tournament, true);
        return {matchId: match.id};
      });
    });

    console.log(`cupScheduleWithRealClubs of ${tournament}`, cupScheduleWithRealClubs);
    return cupMatches;
  }


  /*generateLeagueScheduleShell(numOfTeams: number) {
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

    console.log('Resulting schedule', this.scheduleShell.map(value => value.map(value1 =>
     `${value1.homeNameEn.num} - ${value1.awayNameEn.num}`)));
  }*/

  /*generateWeeklySchedule(teams: Team[]) {
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
  }*/

  /*getTeamPlayed(team: Team, scheduleShell = this.scheduleShell): number[] {
    const played: number[] = [];
    scheduleShell.forEach((value, index) => {
      const teamsMatch = value.find(value1 => value1.homeNameEn.num === team.num || value1.awayNameEn.num === team.num);
      if (!teamsMatch) {
        console.error(`No match for ${team.num} in week ${index + 1}`, value);
      }
      const opponentNum = teamsMatch.homeNameEn.num === team.num ? teamsMatch.awayNameEn.num : teamsMatch.homeNameEn.num;
      played.push(opponentNum);
    });
    return played;
  }

  pushTeamsToWeekly(homeTeam: Team, awayTeam: Team) {
    // console.log('Pushing to weekly', homeTeam, awayTeam);
    this.weekScheduleShell.push({
      homeNameEn: homeTeam,
      awayNameEn: awayTeam
    });
    // marking teams - who they played and where
    // homeTeam.played.push(awayTeam.num);
    homeTeam.last = homeTeam.last === 'h' || homeTeam.last === '2h' ? '2h' : 'h';
    // awayTeam.played.push(homeTeam.num);
    awayTeam.last = awayTeam.last === 'a' || awayTeam.last === '2a' ? '2a' : 'a';
  }

  teamIsNotInWeekSchedule(team: Team): boolean {
    return !this.weekScheduleShell.find(value => {
      return value.homeNameEn.num === team.num || value.awayNameEn.num === team.num;
    });
  }*/

  generateTables(leagues: League[]): { [leagueId: string]: LeagueTable[] } {
    const tables = {};
    leagues.forEach(value => {
      const table = [];
      this.store.select(selectClubsByLeagueId, {leagueId: value.id}).pipe(take(1)).subscribe(clubs => {
        if (!!clubs.length) {
          clubs.sort((a, b) => a.nameRu > b.nameRu ? 1 : -1);
          clubs.forEach((club: Club, i) => {
            table.push({
              clubName: club.nameRu,
              games: 0,
              wins: 0,
              draws: 0,
              loses: 0,
              gf: 0,
              ga: 0,
              gd: 0,
              points: 0
            });
          });
          tables[value.id] = table;
        }
      });
    });
    return tables;
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
