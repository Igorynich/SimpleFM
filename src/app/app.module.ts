import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import {SharedModule} from './shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {currentGameReducer} from './store/reducers/current-game.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CurrentGameEffects} from './store/effects/current-game.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    StoreModule.forRoot({currentGame: currentGameReducer}),
    EffectsModule.forRoot([CurrentGameEffects]),
    // MatPasswordStrengthModule,
    // NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig)  // auth ui module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
