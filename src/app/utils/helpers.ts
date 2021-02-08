/* Create async observable that emits-once and completes
after a JS engine turn */
import {defer, Observable} from 'rxjs';
import {round} from 'lodash';

export function asyncData<T>(data: T): Observable<T> {
  return defer(() => Promise.resolve(data));
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function values<T>(obj: T | null | undefined): any[] {
  return obj ? Object.values(obj) : [];
}

export function limitTo(num: number, limit: number, bothSides = true): number {
  let result = num;
  if (num > limit) {
    result = limit;
  } else if (bothSides && (num < -limit)) {
    result = -limit;
  }
  return result;
}

export function closest(goal: number, array: string[] | number[]): string | number {
  // @ts-ignore
  const res = array.reduce((prev, curr) => {
    return (Math.abs(round(curr, 1) - goal) < Math.abs(round(prev, 1) - goal) ? curr : prev);
  });
  return res;
}

export function chooseItemByChance<T>(itemChanceObj: {item: T, chance: number}[]): T {
  console.warn('------chooseItemByChance START', itemChanceObj);
  const multipliedChanceItems = itemChanceObj.map(value => {
    return {item: value.item, chance: value.chance * 1000};
  });
  const sumChance = multipliedChanceItems.reduce((prev, cur) => prev + cur.chance, 0);
  const random = randomInteger(0, round(sumChance));
  console.log('chooseItemByChance random', random);
  const chances = multipliedChanceItems.map(value => value.chance);
  const closestChance = closest(random, chances);
  console.log('chooseItemByChance closestChance', closestChance);
  const result = multipliedChanceItems.find(value => value.chance === closestChance);
  console.log('chooseItemByChance result', result);
  console.warn('------chooseItemByChance END', result.item);
  return result.item;
}
