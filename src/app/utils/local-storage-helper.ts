
interface Window {
  FromLocalStorage<T>(key: string) : T;
  IntoLocalStorage<T>(key: string, value: T);
}


Window.prototype.FromLocalStorage = function <T>(key: string) : T {
  const fromStore = localStorage.getItem(key);
  return !!fromStore ? JSON.parse(fromStore) as T : null;
}

Window.prototype.IntoLocalStorage = function <T>(key: string, value: T) {
  const toStore = JSON.stringify(value);
  localStorage.setItem(key, toStore);
}

