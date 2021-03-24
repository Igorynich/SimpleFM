import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState,
  getLeagueTierHigher, getWeeksOnCurrentJob,
  selectClubPowersByLeaguesNameEn, selectClubsByLeagueName, selectCurrentClub,
  selectLeagueTableByLeaguesNameEn
} from '../store/selectors/current-game.selectors';
import {Club} from '../interfaces/club';
import {take} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {LeagueTable} from '../interfaces/league-table';
import {League} from '../interfaces/league';
import {chooseItemByChance, randomInteger} from '../utils/helpers';
import { newJobTaken, oneMoreWeekOnCurrentJob } from '../store/actions/current-game.actions';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private curClub: Club;

  // TODO change to normal values
  readonly MIN_TIME_ON_ONE_JOB = 1;      // 10 weeks

  readonly BASE_NEW_JOB_OFFER_CHANCE = 50;
  readonly NEW_JOB_OFFER_CHANCE_GROWTH_BY_ACHIEVEMENT_RANK = 1;
  readonly GET_OFFER_FROM_CLUB_CHANCE_GROWTH_BY_HIS_UNDERACHIEVEMENT_RANK = 2;
  readonly ACHIEVEMENT_RANK_TO_GET_TIER_HIGHER_JOB_OFFER = 7;
  readonly MAX_NUM_OF_HIGHER_TIER_CLUBS_TO_OFFER = 3;

  constructor(private store: Store<AppState>) { }

  gotNewJobOffer(): boolean {
    console.error('CHECKING FOR NEW JOB');
    let weeksOnCurrentJob;
    this.store.select(getWeeksOnCurrentJob).pipe(take(1)).subscribe(value => {
      weeksOnCurrentJob = value;
    });
    const enoughTimeOnCurrentJob = weeksOnCurrentJob >= this.MIN_TIME_ON_ONE_JOB;
    let isClubToOfferNewJob;
    this.store.select(selectCurrentClub).pipe(take(1)).subscribe(club => {
      this.curClub = club;
    });
    const random = randomInteger(1, 100);
    if (random < this.BASE_NEW_JOB_OFFER_CHANCE +
      this.NEW_JOB_OFFER_CHANCE_GROWTH_BY_ACHIEVEMENT_RANK * this.getClubAchievementRating(this.curClub)) {
      isClubToOfferNewJob = true;
    }
    if (enoughTimeOnCurrentJob && isClubToOfferNewJob) {
      console.warn('NEW JOB GRANTED');
    }
    const curClubHasPositiveAchieveRank = this.getClubAchievementRating(this.curClub) > 0;
    return enoughTimeOnCurrentJob && isClubToOfferNewJob;
  }

  findNewJobOfferingCLub(): Club {
    const underachievingClubsChances = this.findUnderachievingClubsForAClub(this.curClub).map(club1 => {
      return {
        item: club1,
        chance: Math.abs(this.getClubAchievementRating(club1)) * this.GET_OFFER_FROM_CLUB_CHANCE_GROWTH_BY_HIS_UNDERACHIEVEMENT_RANK
      };
    });
    return chooseItemByChance(underachievingClubsChances);
  }

  getClubAchievementRating(club: Club): number {
    let rating = 0;
    combineLatest([
      this.store.select(selectClubPowersByLeaguesNameEn, {leaguesNameEn: club.leagueNameEn}),
      this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: club.leagueNameEn})
    ]).pipe(take(1)).subscribe(([clubPowers, leagueTable]) => {    // clubPowers: {club: Club, power: number}[]  leagueTable: LeagueTable[]
      const clubPowerPosition = clubPowers.findIndex((value: {club: Club, power: number}) => value.club.nameEn === club.nameEn);
      const clubLeaguePosition = leagueTable.findIndex((value: LeagueTable) => value.club.nameEn === club.nameEn);
      rating = clubPowerPosition - clubLeaguePosition;
    });
    return rating;
  }

  findUnderachievingClubsForAClub(club: Club): Club[] {
    const leagueNameEn = club.leagueNameEn;
    let leagueTierHigher: League | null;
    this.store.select(getLeagueTierHigher, {leaguesNameEn: leagueNameEn}).pipe(take(1)).subscribe(value => {
      leagueTierHigher = value;
    });
    const underachievingClubsOfSameLeague: Club[] = this.findUnderachievingClubsByLeagueNameEn(leagueNameEn)
      .filter(value => value.nameEn !== club.nameEn);     // except club itself
    let underachievingClubOfHigherTierLeague: Club[] = [];
    if (!!leagueTierHigher && this.getClubAchievementRating(club) >= this.ACHIEVEMENT_RANK_TO_GET_TIER_HIGHER_JOB_OFFER) {
      underachievingClubOfHigherTierLeague = this.findUnderachievingClubsByLeagueNameEn(leagueTierHigher.nameEn);
      underachievingClubOfHigherTierLeague.sort((a, b) => this.getClubAchievementRating(a) - this.getClubAchievementRating(b));
      underachievingClubOfHigherTierLeague = underachievingClubOfHigherTierLeague.filter((value, index) =>
        index < this.MAX_NUM_OF_HIGHER_TIER_CLUBS_TO_OFFER);
    }
    return [...underachievingClubsOfSameLeague, ...underachievingClubOfHigherTierLeague];
  }

  findUnderachievingClubsByLeagueNameEn(leagueNameEn: string, lowerThanRating = 0): Club[] {
    let underachievingClubs;
    this.store.select(selectClubsByLeagueName, {leaguesNameEn: leagueNameEn}).pipe(take(1)).subscribe((clubs: Club[]) => {
      underachievingClubs = clubs.filter((club: Club) => this.getClubAchievementRating(club) < lowerThanRating);
    });
    return underachievingClubs;
  }

  oneMoreWeekOnCurrentJob() {
    this.store.dispatch(oneMoreWeekOnCurrentJob());
  }

  newJobTaken(newClub: Club) {
    this.store.dispatch(newJobTaken({clubsNameEn: newClub.nameEn}));
  }
}
