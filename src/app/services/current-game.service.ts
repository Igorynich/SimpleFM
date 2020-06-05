import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {map, switchMap, take} from 'rxjs/operators';
import {Club} from '../interfaces/club';
import {Observable} from 'rxjs';
import {Player} from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {

  currentClub: Club;
  currentClubId: string;
  currentPlayers: Player[];

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
}
