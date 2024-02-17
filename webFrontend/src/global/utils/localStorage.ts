const localStorageFunc = {
  get: (key: string) => {
    const value = window.localStorage.getItem(key);
    if (value) return JSON.parse(value);
  },
  set: <T>(key: string, value: T) => {
    const jsonValue = JSON.stringify(value);
    window.localStorage.setItem(key, jsonValue);
  },
  remove: (key: string) => {
    window.localStorage.removeItem(key);
  },
  removeAll: () => window.localStorage.clear(),
};

export default localStorageFunc;
