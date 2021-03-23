import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {capitalize} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject(LOCALE_ID) private localeId: string) {
    console.warn('LOCALE', localeId);
  }

  get locale(): string {
    return capitalize(this.localeId);
  }

  get name(): string {
    return `name${this.locale}`;
  }

  get leagueName(): string {
    return `leagueName${this.locale}`;
  }

  get clubName(): string {
    return `clubName${this.locale}`;
  }
}
