export const localStorageMock = (function localStorage() {
  let store: Record<string, string> = {};

  return {
    getItem(key: string): string {
      return store[key];
    },

    setItem(key: string, value: string): void {
      store[key] = value;
    },

    clear(): void {
      store = {};
    },

    removeItem(key: string): void {
      delete store[key];
    },

    getAll(): typeof store {
      return store;
    },
  };
}());

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
