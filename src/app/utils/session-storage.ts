import {mapReplacer, mapReviver} from './local-storage';

export function setToSessionStorage(key: string, data: any): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(data, mapReplacer));
  } catch (e) {
    sessionStorage.setItem(key, data);
  }
}

export function getFromSessionStorage(key: string): any {
  const value = sessionStorage.getItem(key);
  try {
    return JSON.parse(value, mapReviver);
  } catch (e) {
    return value;
  }
}
