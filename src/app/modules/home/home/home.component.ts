import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthProvider} from 'ngx-auth-firebaseui';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ROUTES} from '../../../constants/routes';
import {FirebaseService} from '../../../services/firebase.service';
import {User} from 'firebase';
import {StorageService} from '../../../services/storage.service';
import {Club} from '../../../interfaces/club';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/selectors/current-game.selectors';
import { loadSavedGame } from 'src/app/store/actions/current-game.actions';
import {CurrentGameState} from '../../../store/reducers/current-game.reducer';
import {SnackBarService} from '../../../services/snack-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  // authProviders = [AuthProvider.Google, AuthProvider.Twitter];
  // googleForm: FormGroup;
  isGoogleLogin = false;
  userName: FormControl;
  savedGame: CurrentGameState | null;
  savedGameData: {club: Club, season: number, week: number, userName: string};

  constructor(private router: Router, private userService: UserService, private fs: FirebaseService, private fb: FormBuilder,
              private storage: StorageService, private store: Store<AppState>,
              private snack: SnackBarService) { }

  ngOnInit() {
    this.userName = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    /*this.googleForm = this.fb.group({
      email: ['', Validators.email],
      password: ['']
    });*/
    this.savedGame = this.storage.getStore();
    console.warn('savedGame', this.savedGame);
    if (!!this.savedGame) {
      this.savedGameData = {
        club: this.savedGame.currentClub,
        season: this.savedGame.currentSeason,
        week: this.savedGame.currentWeek,
        userName: this.savedGame.userName
      };
    }
  }

  submitName() {
    console.log(this.userName.value);
    if (this.userName.valid) {
      this.userService.userName = this.userName.value;
      this.router.navigate([ROUTES.OFFICE]).catch(reason => {
        console.error('Navigation fail by ', reason);
      });
    }
  }

  login() {
    if (1) {
      this.fs.login().subscribe(value => {
        console.log('GOOGLE LOGIN', value);
        const token = value.credential.accessToken;
        const user: User = value.user;
        this.userService.userName = user.displayName;
        this.router.navigate([ROUTES.OFFICE]).catch(reason => {
          console.error('Navigation fail by ', reason);
        });
      }, error => {
        console.error('GOOGLE LOGIN ERROR', error);
      });
    }
  }

  printUser(event) {
    console.log(event);
  }

  printError(event) {
    console.error(event);
  }

  deleteSavedGame() {
    this.storage.clearStorage();
    this.savedGame = null;
    this.savedGameData = null;
  }

  loadSavedGame() {
    this.store.dispatch(loadSavedGame({data: this.savedGame}));
    this.userName.setValue(this.savedGame.userName);
    this.snack.createSnackBar('Сохранение загружено');
    // TODO make better
    this.submitName();
  }
}
