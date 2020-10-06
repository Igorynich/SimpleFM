/* Create async observable that emits-once and completes
after a JS engine turn */
import {defer, Observable} from 'rxjs';

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
