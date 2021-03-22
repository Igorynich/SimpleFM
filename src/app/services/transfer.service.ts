import {Injectable} from '@angular/core';
import {Player} from '../interfaces/player';
import {Store} from '@ngrx/store';
import {
  AppState, getAllClubs,
  getAllPlayers, getAlreadySoldAPlayerThisWeekNum, getGeneratedForWeekNum, selectCurrentClub,
  selectCurrentWeek,
  selectPlayersByClubsNameEn,
  selectTransferListedPlayers
} from '../store/selectors/current-game.selectors';
import {combineLatest, Observable, of} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {randomInteger} from '../utils/helpers';
import {playersListedOnTransfer, playerTransferToAClub} from '../store/actions/current-game.actions';
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

  readonly RANDOM_TRANSFER_CHANCE_PCT_BY_PLAYER = 10;

  constructor(private store: Store<AppState>) {
  }

  generateTransferList(): void {
    combineLatest([
      this.store.select(selectCurrentWeek),
      this.store.select(getGeneratedForWeekNum)
    ]).pipe(take(1)).subscribe(([curWeek, generatedForWeekNum]) => {
      // week 1 or weeks over interval
      console.log('generateTransferList', curWeek, generatedForWeekNum);
      if (generatedForWeekNum !== curWeek && (curWeek === 1 || (curWeek - 1) % this.TRANSFER_LIST_UPDATE_INTERVAL === 0)) {
        this.generateListedPlayers();
      }
    });
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
    combineLatest([
      this.store.select(getAllClubs),
      this.store.select(selectCurrentClub)
    ]).pipe(take(1)).subscribe(([clubs, curClub]) => {
      // not players' club and not current club
      const eligibleClubs = clubs.filter(club => club.nameEn !== player.clubNameEn && club.nameEn !== curClub.nameEn);
      // clubs that have money for transfer
      const clubsWithMoney = eligibleClubs.filter(club => club.budget >= player.price);
      // looking for power dif need of the player (which club gets the most of the transfer)
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
          const averagePowerOfSamePos = startingPlayersOfSamePosition.reduce((prev, cur) => prev + cur.power, 0) /
            startingPlayersOfSamePosition.length;
          console.warn(`Average power of ${club.nameEn} ${player.position} = ${averagePowerOfSamePos}`);
          const powerDif = player.power - averagePowerOfSamePos;
          if (powerDif > biggestPowerDif.powerDif) {
            biggestPowerDif.club = club;
            biggestPowerDif.powerDif = powerDif;
          }
        });
      });
      theClub = biggestPowerDif.club;
    });
    return theClub;
  }

  makeRandomTransfers() {
    this.store.select(selectTransferListedPlayers).pipe(take(1)).subscribe((listedPlayers: Player[]) => {
      listedPlayers.forEach(player => {
        const random = randomInteger(1, 100);
        if (random <= this.RANDOM_TRANSFER_CHANCE_PCT_BY_PLAYER) {
          const buyerClub = this.findABuyerForAPlayer(player);
          console.warn(`${player.nameEn} random transfer ${player.clubNameEn} => ${buyerClub.nameEn}`);
          this.store.dispatch(playerTransferToAClub({player, clubsNameEn: buyerClub.nameEn}));
        }
      });
    });
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
    combineLatest([
      this.store.select(selectCurrentWeek),
      this.store.select(getAlreadySoldAPlayerThisWeekNum)
    ]).pipe(take(1)).subscribe(([curWeek, alreadySoldWeekNum]) => {
      res = alreadySoldWeekNum === curWeek;
    });
    return res;
  }
}
