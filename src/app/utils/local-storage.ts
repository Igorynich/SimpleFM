/**
 * Gets keys value from storage
 * @param {string} key in local storage
 * @returns {any}
 */
export function getFromLocalStorage(key: string): any {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value, mapReviver);
  } catch (e) {
    return value;
  }
}

/**
 * Removes key with value from storage
 * @param {string} key
 */
export function removeFromLocalStorage(key: string | string[]) {
  key = Array.isArray(key) ? key : [key];
  key.map((k: string) => localStorage.removeItem(k));
}

/**
 * Sets the key to storage with given values
 * @param {string} key will be saved in local storage
 * @param data
 */
export function setToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data, mapReplacer));
  } catch (e) {
    localStorage.setItem(key, data);
  }
}

/**
 * Clear local storage
 */
export function clearLocalStorage() {
  localStorage.clear();
}

export function mapReplacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

export function mapReviver(key, value) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}
