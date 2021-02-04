import {Injectable} from '@angular/core';
import {Player} from '../interfaces/player';
import {Store} from '@ngrx/store';
import {
  AppState, getAllClubs,
  getAllPlayers, selectCurrentClub,
  selectCurrentWeek,
  selectPlayersByClubsNameEn,
  selectTransferListedPlayers
} from '../store/selectors/current-game.selectors';
import {Observable, of} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {randomInteger} from '../utils/helpers';
import {playersListedOnTransfer} from '../store/actions/current-game.actions';
import {round} from 'lodash';
import {Club} from '../interfaces/club';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  readonly TRANSFER_LIST_UPDATE_INTERVAL = 2;     // weeks
  readonly MIN_OF_LISTED_PLAYERS = 5;
  readonly MAX_OF_LISTED_PLAYERS = 10;
  readonly MAX_NUMBER_OF_PLAYERS_LISTED_BY_ONE_CLUB = 1;
  readonly MIN_NUMBER_OF_PLAYERS_BY_POSITION_TO_ALLOW_LISTING = {
    GK: 2,
    D: 5,
    M: 5,
    F: 3
  };

  // to confirm generation only once a week
  private generatedForWeekNum: number;

  private alreadySoldAPlayerThisWeekNum: number;

  constructor(private store: Store<AppState>) {
  }

  generateTransferList(): void {
    this.store.select(selectCurrentWeek).pipe(take(1)).subscribe((curWeek => {
      // week 1 or weeks over interval
      if (this.generatedForWeekNum !== curWeek && (curWeek === 1 || (curWeek - 1) % this.TRANSFER_LIST_UPDATE_INTERVAL === 0)) {
        this.generateListedPlayers();
        this.generatedForWeekNum = curWeek;
      }
    }));
  }

  private generateListedPlayers(): Player[] {
    const listedPlayers = [];
    const numOfPlayersToList = randomInteger(this.MIN_OF_LISTED_PLAYERS, this.MAX_OF_LISTED_PLAYERS);
    console.error('LISTED PLAYERS', numOfPlayersToList);
    this.store.select(getAllPlayers).pipe(take(1)).subscribe(allPlayers => {
      const randoms = [];
      while (listedPlayers.length < numOfPlayersToList) {
        // for (let i = 0; i < numOfPlayersToList; i++) {
        const random = randomInteger(0, allPlayers.length - 1);
        const player: Player = allPlayers[random];
        if (this.playerCanBeListed(player, listedPlayers)) {
          listedPlayers.push(player);
        }
      }
    });
    const pricedListedPlayers = this.generateListWithPrices(listedPlayers);
    this.store.dispatch(playersListedOnTransfer({listedPlayers: pricedListedPlayers}));
    return pricedListedPlayers;
  }

  private playerCanBeListed(player: Player, listedPlayers: Player[]): boolean {
    let playerIsOnCurrentClub;
    this.store.select(selectCurrentClub).pipe(take(1)).subscribe(curClub => {
      playerIsOnCurrentClub = player.clubNameEn === curClub.nameEn;
    });
    const playerAlreadyOnTheList = !!listedPlayers.find(value => value.nameEn === player.nameEn);
    const clubAlreadyHaveMaxNumOfPlayerListed = listedPlayers.filter(value => value.clubNameEn === player.clubNameEn)
      .length >= this.MAX_NUMBER_OF_PLAYERS_LISTED_BY_ONE_CLUB;
    const clubHaveEnoughPlayersOfThatPosition = this.isClubHaveEnoughPlayersOfThatPosition(player);
    return !playerIsOnCurrentClub && !playerAlreadyOnTheList && !clubAlreadyHaveMaxNumOfPlayerListed && clubHaveEnoughPlayersOfThatPosition;
  }

  generateListWithPrices(listedPlayers: Player[]): Player[] {
    return listedPlayers.map(player => {
      return {...player, price: this.generatePriceForPlayer(player)};
    });
  }

  private generatePriceForPlayer(player: Player): number {
    const power = player.power;
    return round(Math.pow(power, 2), 3);
  }

  findABuyerForAPlayer(player: Player): Club {
    let theClub: Club;
    this.store.select(getAllClubs).pipe(take(1)).subscribe(clubs => {
      const clubsWithMoney = clubs.filter(club => club.budget >= player.price);
      // const powerDifMap = new Map<string, number>();    // clubsNameEn, powerDif
      const biggestPowerDif = {
        club: null,
        powerDif: -10
      };
      clubsWithMoney.forEach(club => {
        this.store.select(selectPlayersByClubsNameEn, {clubsNameEn: club.nameEn}).pipe(take(1))
          .subscribe((clubPlayers: Player[]) => {
          // const playersOfSamePosition: Player[] = clubPlayers.filter(pl => pl.position === player.position);
          // console.warn(`Club Players of ${club.nameEn} = ${clubPlayers}`, clubPlayers);
          const playersOfSamePosition: Player[] = clubPlayers.filter((pl, index) => pl.position === player.position);
          const startingPlayersOfSamePosition = playersOfSamePosition.filter((value, index) => index < 4);
          // console.warn(`${player.position} starters for ${club.nameEn} = ${startingPlayersOfSamePosition}`, startingPlayersOfSamePosition);
          const averagePowerOfSamePos = startingPlayersOfSamePosition.reduce((prev, cur) => prev + cur.power, 0) /
            startingPlayersOfSamePosition.length;
          console.warn(`Average power of ${club.nameEn} ${player.position} = ${averagePowerOfSamePos}`);
          const powerDif = player.power - averagePowerOfSamePos;
          if (powerDif > biggestPowerDif.powerDif) {
            biggestPowerDif.club = club;
            biggestPowerDif.powerDif = powerDif;
          }
          // powerDifMap.set(club.nameEn, powerDif);
        });
      });
      // powerDifMap.forEach().
      theClub = biggestPowerDif.club;
      /*const random = randomInteger(0, clubsWithMoney.length - 1);
      theClub = clubsWithMoney[random];*/
    });
    return theClub;
  }

  isClubHaveEnoughPlayersOfThatPosition(player: Player): boolean {
    let clubsRoster: Player[];
    this.store.select(selectPlayersByClubsNameEn, {clubsNameEn: player.clubNameEn}).pipe(take(1))
      .subscribe(clubsPlayers => {
        clubsRoster = clubsPlayers;
      });
    const playersOfThatPosition = clubsRoster.filter(value => value.position === player.position);
    let clubHaveEnoughPlayersOfThatPosition;
    switch (player.position) {
      case 'GK': {
        clubHaveEnoughPlayersOfThatPosition = playersOfThatPosition.length >= this.MIN_NUMBER_OF_PLAYERS_BY_POSITION_TO_ALLOW_LISTING.GK;
        break;
      }
      case 'D': {
        clubHaveEnoughPlayersOfThatPosition = playersOfThatPosition.length >= this.MIN_NUMBER_OF_PLAYERS_BY_POSITION_TO_ALLOW_LISTING.D;
        break;
      }
      case 'M': {
        clubHaveEnoughPlayersOfThatPosition = playersOfThatPosition.length >= this.MIN_NUMBER_OF_PLAYERS_BY_POSITION_TO_ALLOW_LISTING.M;
        break;
      }
      case 'F': {
        clubHaveEnoughPlayersOfThatPosition = playersOfThatPosition.length >= this.MIN_NUMBER_OF_PLAYERS_BY_POSITION_TO_ALLOW_LISTING.F;
        break;
      }
    }
    return clubHaveEnoughPlayersOfThatPosition;
  }

  playerWasAlreadySoldThisWeek(): boolean {
    let res;
    this.store.select(selectCurrentWeek).pipe(take(1)).subscribe(value => {
      res = this.alreadySoldAPlayerThisWeekNum === value;
    });
    return res;
  }

  currentPlayerSold() {
    this.store.select(selectCurrentWeek).pipe(take(1)).subscribe(value => {
      this.alreadySoldAPlayerThisWeekNum = value;
    });
  }
}
