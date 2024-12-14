export type Code = `${Group}-${Group}-${Group}`;

type Acceptable = '0' | '1'
type Group = `${Acceptable}${Acceptable}${Acceptable}`

export function codeToDecimal(code: Code) {
  const groups = code.split('-');
  let result = '';
  for (const group of groups) {
    result += parseInt(group, 2).toString();
  }
  return result;
}
