// Zaimplementuj typ MergeableObject z wykorzystaniem typów wbudowanych - Exclude i NonNullable.
type MergeableObject<T> =  NonNullable<Exclude<T, Function | string | number | boolean>>;

export function mergeObjects<T, U>(obj1: MergeableObject<T>, obj2: MergeableObject<U>): T & U {
  const merged = { ...obj1, ...obj2 };
  console.log(merged);
  return merged;
}
