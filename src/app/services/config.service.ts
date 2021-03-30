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
    const lang = this.localeId.toLowerCase().includes('en') ? 'en' : (this.localeId.includes('ru') ? 'ru' : 'en');
    return capitalize(lang);
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
