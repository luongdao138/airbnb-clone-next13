export function exclude<T, Key extends keyof T>(
  data: T | null,
  keys: Key[]
): Omit<T, Key> | null {
  if (!data) return null;
  for (let key of keys) {
    delete data[key];
  }
  return data;
}
