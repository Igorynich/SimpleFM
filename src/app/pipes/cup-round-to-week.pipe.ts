import { Pipe, PipeTransform } from '@angular/core';
import {CUP_INTERVAL} from '../constants/general';

@Pipe({
  name: 'cupRoundToWeek'
})
export class CupRoundToWeekPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return value * CUP_INTERVAL + 1;
  }

}
