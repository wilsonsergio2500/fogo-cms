

export function deepCopy<T>(obj) {
  return JSON.parse(JSON.stringify(obj)) as T;
}
