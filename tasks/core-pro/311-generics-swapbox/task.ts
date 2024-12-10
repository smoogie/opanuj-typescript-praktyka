function swapNumbers(a: number, b: number): [number, number] {
  return swapBox<number>(a, b);
}

function swapStrings(a: string, b: string): [string, string] {
  return swapBox<string>(a, b);
}

export function swapBox<T>(a: T, b: T): [T, T] {
  return [b, a];
}

const [n1, n2] = swapNumbers(10, 20);
const [s1, s2] = swapStrings('hello', 'world');
const [x, y] = swapBox(false, true);
