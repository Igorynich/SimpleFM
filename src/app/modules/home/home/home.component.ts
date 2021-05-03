import {AuthProvider, Theme} from 'ngx-auth-firebaseui';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ROUTES} from '../../../constants/routes';
import {FirebaseService} from '../../../services/firebase.service';
// import {User} from 'firebase';
import firebase from 'firebase';
import {StorageService} from '../../../services/storage.service';
import {Club} from '../../../interfaces/club';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/selectors/current-game.selectors';
import {CurrentGameState} from '../../../store/reducers/current-game.reducer';
import {SnackBarService} from '../../../services/snack-bar.service';
import {ConfigService} from '../../../services/config.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {startLoadingSavedGame} from '../../../store/actions/current-game.actions';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  authProviders = [AuthProvider.Google];
  authTheme = Theme.RAISED;
  // googleForm: FormGroup;
  isGoogleLogin = false;
  userName: FormControl;
  savedGame: CurrentGameState | null;
  savedGameData: {club: Club, season: number, week: number, userName: string};

  constructor(private router: Router, private userService: UserService, private fs: FirebaseService, private fb: FormBuilder,
              private storage: StorageService, private store: Store<AppState>,
              private snack: SnackBarService,
              public config: ConfigService,
              private dialog: MatDialog) { }

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
        const user: firebase.User = value.user;
        this.userService.userName = user.displayName;

      }, error => {
        console.error('GOOGLE LOGIN ERROR', error);
      });
    }
  }

  login1(ev: firebase.UserInfo) {
    console.log('google login1', ev);
    this.userService.userName = ev.displayName;
    this.router.navigate([ROUTES.OFFICE]).catch(reason => {
      console.error('Navigation fail by ', reason);
    });
  }

  printUser(event) {
    console.log(event);
  }

  printError(event) {
    console.error(event);
  }

  deleteSavedGame() {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    }).afterClosed().pipe(take(1)).subscribe(value => {
      if (value) {
        this.storage.clearStorage();
        this.savedGame = null;
        this.savedGameData = null;
      }
    });
  }

  loadSavedGame() {
    this.store.dispatch(startLoadingSavedGame({data: this.savedGame}));
    /*this.userName.setValue(this.savedGame.userName);
    this.snack.createSnackBar($localize `Сохранение загружено`);
    this.submitName();*/
  }
}
