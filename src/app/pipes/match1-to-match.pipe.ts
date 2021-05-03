import { Pipe, PipeTransform } from '@angular/core';
import {Match} from '../interfaces/match';
import {Match1} from '../interfaces/match1';

@Pipe({
  name: 'match1ToMatch'
})
export class Match1ToMatchPipe implements PipeTransform {

  transform(value: Match1, ...args: unknown[]): Match {
    return {...value, homeNameEn: value.home.nameEn, awayNameEn: value.away.nameEn};
  }

}
