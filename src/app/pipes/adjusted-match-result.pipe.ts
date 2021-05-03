import { Pipe, PipeTransform } from '@angular/core';
import {MatchStats1} from '../interfaces/match-stats1';
import {resultSplitter} from '../utils/sort-roster';

@Pipe({
  name: 'adjustedMatchResult'
})
export class AdjustedMatchResultPipe implements PipeTransform {

  transform(value: MatchStats1, field: 'H' | 'A'): string {
    if (!value?.result) {
      return '';
    } else {
      if (field === 'A') {
        const [home, away] = resultSplitter(value?.result);
        return `${away} - ${home}`;
      }
      return value?.result;
    }
  }

}
