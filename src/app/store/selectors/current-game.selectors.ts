import {CurrentGameState} from '../reducers/current-game.reducer';
import {createSelector, MemoizedSelectorWithProps, State} from '@ngrx/store';
import {WeekSchedule} from '../../interfaces/league-schedule';
import {CUP_INTERVAL} from '../../constants/general';
import {Match} from '../../interfaces/match';
import {decideWinner, getLeagueWeek, isCupWeek, matchToMatch1, resultSplitter, sortClubsRoster, sortTable} from '../../utils/sort-roster';
import {Player} from '../../interfaces/player';
import {round} from 'lodash';
import {PlayerStats} from '../../interfaces/player-stats';
import {MatchStats} from '../../interfaces/match-stats';
import {values} from '../../utils/helpers';
import {Club} from '../../interfaces/club';
import {Match1} from '../../interfaces/match1';
import {Props} from '@ngrx/store/src/models';
import {League} from '../../interfaces/league';

export interface AppState {
  currentGame: CurrentGameState;
}

export const selectCurrentGameState = (state: AppState) => {
  // console.log('FULL STATE', state);
  return state.currentGame;
};

export const selectCurrentState = createSelector(selectCurrentGameState, (state: CurrentGameState) => state);
export const selectCurrentClub = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.currentClub);
export const selectCurrentPlayers = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.currentPlayers);
export const selectCurrentWeek = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.currentWeek + 1);
export const selectCurrentSeason = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.currentSeason + 1);
export const curGameLoading = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.loading);
export const isLastWeekOfTheSeason = createSelector(selectCurrentGameState, (state: CurrentGameState) =>
  state.currentWeek >= state.weeksInASeason);

export const getAllClubs = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.clubs || []);
export const getAllLeagues = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.leagues || []);
export const getAllCountries = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.countries || []);
export const getAllPlayers = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.players || []);

export const getLeagueByLeagueNameEn = createSelector(selectCurrentGameState, (state: CurrentGameState, {leaguesNameEn}) => {
  return state.leagues.find(value => value.nameEn === leaguesNameEn);
});

export const getCurrentCountryLeagues = createSelector(selectCurrentGameState, (state: CurrentGameState) => {
  const curClub = state.currentClub;
  const curLeague = state.leagues.find(value => value.nameEn === curClub.leagueNameEn);
  return state.leagues.filter(value => value.countryNameEn === curLeague.countryNameEn);
});

export const getLeagueTierHigher = createSelector(selectCurrentGameState, (state: CurrentGameState, {leaguesNameEn}) => {
  const league = state.leagues.find(value => value.nameEn === leaguesNameEn);
  return state.leagues.find(value => value.tier === league.tier + 1) || null;
});

export const selectClubByClubsNameEn = createSelector(selectCurrentGameState, (state: CurrentGameState, {clubsNameEn}) => {
  return state.clubs.find(value => value.nameEn === clubsNameEn);
});

export const selectClubByClubsName = createSelector(selectCurrentGameState, (state: CurrentGameState, {clubsName}) => {
  return state.clubs.find(value => value.nameEn === clubsName || value.nameRu === clubsName);
});

export const selectPlayersByClubsNameEn = createSelector(selectCurrentGameState, (state, {clubsNameEn}) => {
  if (clubsNameEn === state.currentClub.nameEn) {
    return state.currentPlayers || state.players.filter(value => value.clubNameEn === clubsNameEn);
  }
  const teamRoster: Player[] = state.players.filter(value => value.clubNameEn === clubsNameEn);
  return sortClubsRoster(teamRoster);
});

export const selectLeagueScheduleByLeaguesNameEn: MemoizedSelectorWithProps<AppState, { leaguesNameEn: string }, Match1[][]> =
  createSelector(selectCurrentGameState, (state, {leaguesNameEn}) => {
    const league = state.leagues.find(value => value.nameEn === leaguesNameEn);
    return state.schedule[league.id].map((value: WeekSchedule[]) => value.map(value1 => {
      const match: Match = state.matches[value1.matchId];
      const home: Club = state.clubs.find(value2 => value2.nameEn === match.homeNameEn);
      const away: Club = state.clubs.find(value2 => value2.nameEn === match.awayNameEn);
      return matchToMatch1(match, home, away);
    }));
  });

export const selectCupScheduleByLeaguesNameEn: MemoizedSelectorWithProps<AppState, { leaguesNameEn: string }, Match1[][]> =
  createSelector(selectCurrentGameState, (state, {leaguesNameEn}) => {
    const league = state.leagues.find(value => value.nameEn === leaguesNameEn);
    const country = state.countries.find(value => value.nameEn === league.countryNameEn);
    return state.schedule[country.id].map((value: WeekSchedule[]) => value.map(value1 => {
      const match: Match = state.matches[value1.matchId];
      const home: Club = state.clubs.find(value2 => value2.nameEn === match.homeNameEn);
      const away: Club = state.clubs.find(value2 => value2.nameEn === match.awayNameEn);
      return matchToMatch1(match, home, away);
    }));
  });

export const selectLeagueTableByLeaguesNameEn = createSelector(selectCurrentGameState, (state, {leaguesNameEn}) => {
  // console.log('selectLeagueTableByLeaguesNameEn', leaguesNameEn);
  const league = state.leagues.find(value => value.nameEn === leaguesNameEn);
  console.log('selectLeagueTableByLeaguesNameEn1', league);
  if (state.tables[league.id]?.length) {
    return [...state.tables[league.id]].sort(sortTable);
  }
  return [];
});

export const selectClubPowersByLeaguesNameEn = createSelector(selectCurrentGameState, (state, {leaguesNameEn}) => {
  const clubPowers = [];
  state.seasonData.clubPowers.forEach((power: number, clubNameEn: string) => {
    const club: Club = state.clubs.find(value => value.nameEn === clubNameEn);
    if (club && club.leagueNameEn === leaguesNameEn) {
      clubPowers.push({
        club,
        power
      });
    }
  });
  return clubPowers;
});

export const selectTicketPriceByClubsNameEn = createSelector(selectCurrentGameState, (state, {clubsNameEn}) => {
  return state.seasonData.ticketPrices.get(clubsNameEn);
});

export const selectFinanceRecordsByClubsNameEn = createSelector(selectCurrentGameState, (state, {clubsNameEn}) => {
  return state.finances?.get(clubsNameEn);
});

export const getCupRoundsNum = createSelector(selectCurrentGameState, state => {
  const curClub = state.currentClub;
  const league = state.leagues.find(value => value.nameEn === curClub.leagueNameEn);
  const country = state.countries.find(value => value.nameEn === league.countryNameEn);
  return state.schedule[country.id].length;
});

export const selectCurrentWeekSchedule = createSelector(selectCurrentGameState, state => {
  const curWeek = state.currentWeek;
  const curClub = state.currentClub;
  const league = state.leagues.find(value => value.nameEn === curClub.leagueNameEn);
  const country = state.countries.find(value => value.nameEn === league.countryNameEn);
  const cupRounds = state.schedule[country.id].length;
  const schedule = [];      // {matches: null, tournament: null};
  if (isCupWeek(curWeek, cupRounds)) {
    if (state.schedule[country.id][(curWeek / CUP_INTERVAL) - 1]) {
      const allCupMatches: Match[] = state.schedule[country.id][(curWeek / CUP_INTERVAL) - 1].map(value => state.matches[value.matchId]);
      const onlyRealMatches: Match[] = allCupMatches.filter(value => !!value.homeNameEn && !!value.awayNameEn);
      schedule.push({
        tournament: {nameRu: `Кубок ${country.nameRu}`, nameEn: `Cup of ${country.nameEn}`},
        matches: onlyRealMatches,  // TODO check this shit
        stats: onlyRealMatches.map(value => state.stats[value.id])
      });
    }
  } else {
    const countryLeagues = state.leagues.filter(value => value.countryNameEn === country.nameEn);
    const index = getLeagueWeek(curWeek, cupRounds);     // index учитывает кубковые недели
    // console.log('leagueWeek', index);
    countryLeagues.forEach(value => {
      const leagueSchedule = state.schedule[value.id] ? state.schedule[value.id][index] : null;
      if (leagueSchedule) {
        schedule.push({
          tournament: value,
          matches: leagueSchedule.map(value1 => state.matches[value1.matchId]),
          stats: leagueSchedule.map(value1 => state.stats[value1.matchId])
        });
      }
    });
  }
  // console.warn('SELECT WEEK SCHEDULE', curWeek, schedule);
  return schedule;
});

export const selectScheduleByClubsNameEn = createSelector(selectCurrentGameState, (state, {clubsNameEn}) => {
  const club = state.clubs.find(value => value.nameEn === clubsNameEn);
  const league = state.leagues.find(value => value.nameEn === club.leagueNameEn);
  const country = state.countries.find(value => value.nameEn === league.countryNameEn);
  const leagueSchedule: WeekSchedule[][] = state.schedule[league.id];
  const clubsLeagueSchedule: WeekSchedule[] = leagueSchedule.map((value: WeekSchedule[]) => {
    return value.find(match => {
      const realMatch: Match = state.matches[match.matchId];
      return realMatch.homeNameEn === club.nameEn || realMatch.awayNameEn === club.nameEn;
    });
  });
  const cupSchedule: WeekSchedule[][] = state.schedule[country.id];
  const clubsCupSchedule: WeekSchedule[] = cupSchedule.map((value: WeekSchedule[]) =>
    value.find(match => {
      const realMatch: Match = state.matches[match.matchId];
      return realMatch.homeNameEn === club.nameEn || realMatch.awayNameEn === club.nameEn;
    }));
  // console.log('clubsCupSchedule', clubsCupSchedule);
  clubsCupSchedule.forEach((value, index) => {
    clubsLeagueSchedule.splice(CUP_INTERVAL * (index + 1), 0, value);
  });
  return clubsLeagueSchedule.map(value => {
    // console.log('!!!!!selectScheduleByClubsNameEn', state.matches, value);
    return state.matches[value?.matchId];
  });
});

export const selectCupScheduleByCountryNameEn = createSelector(selectCurrentGameState, (state, {countryNameEn}) => {
  const curClub = state.currentClub;
  const curLeague = state.leagues.find(value => value.nameEn === curClub.leagueNameEn);
  const country = state.countries.find(value => value.nameEn === countryNameEn || value.nameEn === curLeague.countryNameEn);
  return state.schedule[country.id];
});

export const selectClubsByLeagueId = createSelector(selectCurrentGameState, (state, {leagueId}) => {
  const league = state.leagues.find(value => value.id === leagueId);
  return state.clubs.filter(value => value.leagueNameEn === league.nameEn) || [];
});

export const selectClubsByLeagueName = createSelector(selectCurrentGameState, (state, {leaguesNameEn}) => {
  const league = state.leagues.find(value => value.nameEn === leaguesNameEn);
  return state.clubs.filter(value => value.leagueNameEn === league.nameEn) || [];
});

export const selectLeagueScheduleShellByNumberOfClubs = createSelector(selectCurrentGameState, (state, {numOfClubs}) => {
  return state.scheduleShells[`league_${numOfClubs}`];
});

export const selectNextOpponent = createSelector(selectCurrentGameState, selectScheduleByClubsNameEn,
  (state, clubsSchedule: Match[], {clubsNameEn}) => {
    const curWeek = state.currentWeek;
    const curClub: Club = state.currentClub;
    const nextWeeksMatch: Match = (clubsSchedule[curWeek]?.homeNameEn && clubsSchedule[curWeek]?.awayNameEn) ?
      clubsSchedule[curWeek] : clubsSchedule[curWeek + 1];
    const nextWeeksMatchHomeClub: Club = state.clubs.find(value => value.nameEn === nextWeeksMatch?.homeNameEn);
    const nextWeeksMatchAwayClub: Club = state.clubs.find(value => value.nameEn === nextWeeksMatch?.awayNameEn);
    const nextOpp: Club = nextWeeksMatch?.homeNameEn === curClub.nameEn ? nextWeeksMatchAwayClub : nextWeeksMatchHomeClub;
    const field = nextWeeksMatch?.homeNameEn === curClub.nameEn ? 'H' : 'A';
    // console.log('selectNextOpponent schedule', clubsSchedule);
    return {opponent: nextOpp, field};
  });

export const selectMatchById = createSelector(selectCurrentGameState, (state, {matchId}) => {
  // console.log('selectMatchById', matchId, state.matches);
  return state.matches[matchId];
});

export const selectMatchStatsByMatchId = createSelector(selectCurrentGameState, (state, {matchId}) => {
  // console.log('selectMatchById', matchId, state.matches);
  return state.stats[matchId];
});

export const selectMatchGainsByMatchId = createSelector(selectCurrentGameState, (state, {matchId}) => {
  // console.log('selectMatchById', matchId, state.matches);
  return state.gainsAndLosses[matchId];
});

export const selectClubsRosterStats = createSelector(selectCurrentGameState, selectScheduleByClubsNameEn,
  (state, clubsSchedule: Match[], {clubsNameEn}) => {
    const map = new Map<string, PlayerStats>();
    const clubsRoster: Player[] = state.players.filter((value: Player) => value.clubNameEn === clubsNameEn);
    const matchStats: MatchStats[] = clubsSchedule.map(value => state.stats[value?.id]);
    clubsRoster.forEach((player: Player) => {
      const games = matchStats.reduce((sum, curMatchStats) => {
        // console.log('curMatchStats', curMatchStats, );
        return (!!curMatchStats?.homeRoster.find(pl => pl.nameEn === player.nameEn) ||
          !!curMatchStats?.awayRoster.find(pl => pl.nameEn === player.nameEn)) ? sum + 1 : sum;
      }, 0);
      const assists = matchStats.reduce((sum, curMatchStats) => {
          const homeAssists = !!curMatchStats?.homeAssists ?
            Object.values(curMatchStats.homeAssists).filter((pl: Player | null) => pl?.nameEn === player.nameEn).length : 0;
          const awayAssists = !!curMatchStats?.awayAssists ?
            Object.values(curMatchStats.awayAssists).filter((pl: Player | null) => pl?.nameEn === player.nameEn).length : 0;
          return sum + homeAssists + awayAssists;
        },
        0);
      const goals = matchStats.reduce((sum, curMatchStats) => {
          const homeGoals = !!curMatchStats?.homeGoals ?
            Object.values(curMatchStats.homeGoals).filter((pl: Player | null) => pl?.nameEn === player.nameEn).length : 0;
          const awayGoals = !!curMatchStats?.awayGoals ?
            Object.values(curMatchStats.awayGoals).filter((pl: Player | null) => pl?.nameEn === player.nameEn).length : 0;
          return sum + homeGoals + awayGoals;
        },
        0);
      const playerStats: PlayerStats = {
        assists,
        games,
        goals
      };
      if (player.position === 'GK') {
        const conceded = clubsSchedule.reduce((sum, curMatch: Match) => {
          const havePlayedInMatch = !!state.stats[curMatch?.id]?.homeRoster.find(pl => pl.nameEn === player.nameEn) ||
            !!state.stats[curMatch?.id]?.awayRoster.find(pl => pl.nameEn === player.nameEn);
          if (!!curMatch && havePlayedInMatch) {
            const isHome = !!state.stats[curMatch.id]?.homeRoster.find(pl => pl.nameEn === player.nameEn);
            const curMatchStats = state.stats[curMatch.id];
            const [homeGoals, awayGoals] = resultSplitter(curMatchStats.result);
            const conc = isHome ? awayGoals : homeGoals;
            return sum - conc;
          }
          return sum;
        }, 0);
        playerStats.conceded = conceded;
      }
      map.set(player.nameEn, playerStats);
    });
    return map;
  });

export const selectClubsRosterLastMatchStats = createSelector(selectCurrentGameState, selectScheduleByClubsNameEn,
  (state, clubsSchedule: Match[], {clubsNameEn}) => {
    const map = new Map<string, PlayerStats>();
    const lastMatch: Match = state.currentWeek === 0 ?
      null : (clubsSchedule[state.currentWeek - 1] || clubsSchedule[state.currentWeek - 2]);
    // console.log('Last Match for selectClubsRosterLastMatchStats', lastMatch, state);
    if (!!lastMatch) {
      const lastMatchStats: MatchStats = state.stats[lastMatch?.id];
      const lastMatchGains: { gains: Player[], losses: Player[] } = state.gainsAndLosses[lastMatch?.id];
      // console.log('Last Match Stats and Gains', lastMatchStats, lastMatchGains);
      const clubsRoster: Player[] = state.players.filter((value: Player) => value.clubNameEn === clubsNameEn);
      clubsRoster.forEach((player: Player) => {
        const playerStats: PlayerStats = {
          assists: 0,
          games: 0,
          goals: 0
        };
        if (lastMatchStats) {
          const isHome = !!lastMatchStats?.homeRoster.find(pl => pl.nameEn === player.nameEn);
          const isAway = !!lastMatchStats?.awayRoster.find(pl => pl.nameEn === player.nameEn);
          const games = (isHome || isAway) ? 1 : 0;
          let goals = 0;
          let assists = 0;
          if (isHome) {
            goals = values(lastMatchStats?.homeGoals).filter((pl: Player | null) => pl?.nameEn === player.nameEn).length;
            assists = values(lastMatchStats?.homeAssists).filter((pl: Player | null) => pl?.nameEn === player.nameEn).length;
          } else if (isAway) {
            goals = values(lastMatchStats?.awayGoals).filter((pl: Player | null) => pl?.nameEn === player.nameEn).length;
            assists = values(lastMatchStats?.awayAssists).filter((pl: Player | null) => pl?.nameEn === player.nameEn).length;
          }
          playerStats.goals = goals;
          playerStats.assists = assists;
          playerStats.games = games;
          if (player.position === 'GK') {
            const havePlayedInMatch = isHome || isAway;
            if (havePlayedInMatch) {
              const [homeG, awayG] = resultSplitter(lastMatchStats.result);
              playerStats.conceded = isHome ? awayG : homeG;
            }
          }
        }
        if (lastMatchGains) {
          const gains = lastMatchGains.gains.filter((pl: Player) => pl.nameEn === player.nameEn).length;
          const losses = lastMatchGains.losses.filter((pl: Player) => pl.nameEn === player.nameEn).length;
          playerStats.gainsLastGame = round((gains - losses) * 0.1, 1);
        }
        map.set(player.nameEn, playerStats);
      });
    }
    return map;
  });

export const selectTransferListedPlayers = createSelector(selectCurrentGameState,
  (state: CurrentGameState) => state.transferListedPlayers);

export const getWeeksOnCurrentJob = createSelector(selectCurrentGameState,
  (state: CurrentGameState) => state.jobData.weeksOnCurrentJob);

export const getGeneratedForWeekNum = createSelector(selectCurrentGameState,
  (state: CurrentGameState) => state.transferData.generatedForWeekNum);

export const getAlreadySoldAPlayerThisWeekNum = createSelector(selectCurrentGameState,
  (state: CurrentGameState) => state.transferData.alreadySoldAPlayerThisWeekNum);

export const getLeaguePlayersStats = createSelector(selectCurrentGameState,
  (state: CurrentGameState, props?: {leagueName: string}) => {
    // console.warn('PROPS', props);
    let league: League;
    if (!props?.leagueName) {
      const curClub = state.currentClub;
      league = state.leagues.find(value => value.nameEn === curClub.leagueNameEn);
    } else {
      league = state.leagues.find(value =>
        value.nameEn === props.leagueName || value.nameRu === props.leagueName);
    }
    const allMatches: Match[] = Object.values(state.matches);
    const curLeagueMatches: Match[] = allMatches.filter(value => value?.tournament?.nameEn === league.nameEn);
    const curLeagueMatchesStats: MatchStats[] = curLeagueMatches.map(value => state.stats[value.id]);
    const goalScorers = new Map<string, { goals?: number, assists?: number, 'g+a'?: number }>();
    curLeagueMatchesStats.forEach((matchStats: MatchStats) => {
      if (matchStats?.homeGoals) {
        Object.values(matchStats.homeGoals).forEach((gscorer: Player) => {
          if (gscorer) {
            const mapRec = goalScorers.get(gscorer?.nameEn);
            const curGoalsForPlayer = mapRec?.goals || 0;
            const curAssistsForPlayer = mapRec?.assists || 0;
            goalScorers.set(gscorer.nameEn, {goals: curGoalsForPlayer + 1, assists: curAssistsForPlayer});
          }
        });
      }
      if (matchStats?.awayGoals) {
        Object.values(matchStats.awayGoals).forEach(gscorer => {
          if (gscorer) {
            const mapRec = goalScorers.get(gscorer?.nameEn);
            const curGoalsForPlayer = mapRec?.goals || 0;
            const curAssistsForPlayer = mapRec?.assists || 0;
            goalScorers.set(gscorer.nameEn, {goals: curGoalsForPlayer + 1, assists: curAssistsForPlayer});
          }
        });
      }
      if (matchStats?.homeAssists) {
        Object.values(matchStats.homeAssists).forEach(assistant => {
          if (assistant) {
            const mapRec = goalScorers.get(assistant?.nameEn);
            const curAssistsForPlayer = mapRec?.assists || 0;
            const curGoalsForPlayer = mapRec?.goals || 0;
            goalScorers.set(assistant.nameEn, {assists: curAssistsForPlayer + 1, goals: curGoalsForPlayer});
          }
        });
      }
      if (matchStats?.awayAssists) {
        Object.values(matchStats.awayAssists).forEach(assistant => {
          if (assistant) {
            const mapRec = goalScorers.get(assistant?.nameEn);
            const curAssistsForPlayer = mapRec?.assists || 0;
            const curGoalsForPlayer = mapRec?.goals || 0;
            goalScorers.set(assistant.nameEn, {assists: curAssistsForPlayer + 1, goals: curGoalsForPlayer});
          }
        });
      }
    });
    goalScorers.forEach((value, key) => {
      value['g+a'] = (value.goals || 0) + (value.assists || 0);
    });
    const entries = [...goalScorers.entries()].map(([key, value]) => {
      // console.log('goalScorers.entries()', key, value);
      const player: Player = state.players.find(value1 => value1.nameEn === key);
      return [player, value];
    });
    // @ts-ignore
    return new Map<Player, { goals?: number, assists?: number, 'g+a'?: number }>(entries);
  });

export const getClubsCupResultByClubsNameEn = createSelector(selectCurrentGameState,
  (state: CurrentGameState, {clubsNameEn}) => {
    const club = state.clubs.find(value => value.nameEn === clubsNameEn);
    const league = state.leagues.find(value => value.nameEn === club.leagueNameEn);
    const country = state.countries.find(value => value.nameEn === league.countryNameEn);
    const cupSchedule: WeekSchedule[][] = state.schedule[country.id];
    const cupMatches: Match[][] = cupSchedule.map((value: WeekSchedule[]) => value.map((value1: WeekSchedule) =>
      state.matches[value1.matchId]));
    const finalMatch: Match = cupMatches[cupMatches.length - 1][0];
    const finalMatchStats: MatchStats = state.stats[finalMatch.id];
    const winner = decideWinner(finalMatchStats.result);
    if (winner === 'draw') {
      console.error('Cup final is DRAW?', finalMatch, finalMatchStats);
    }
    if ((finalMatch.homeNameEn === clubsNameEn && winner === 'home') || (finalMatch.awayNameEn === clubsNameEn && winner === 'away')) {
      // if won the cup
      return {
        clubNameEn: clubsNameEn,
        eliminated: null,
        total: cupSchedule.length
      };
    } else {
      // if didn't win
      const roundsOfParticipation = cupMatches.filter((matchArr: Match[]) => !!matchArr.find((match: Match) =>
        match.homeNameEn === clubsNameEn || match.awayNameEn === clubsNameEn));
      /*console.log('clubs cup result', {
        clubNameEn: clubsNameEn,
        eliminated: roundsOfParticipation.length,
        total: cupSchedule.length
      });*/
      return {
        clubNameEn: clubsNameEn,
        eliminated: roundsOfParticipation.length,
        total: cupSchedule.length
      };
    }
  });


