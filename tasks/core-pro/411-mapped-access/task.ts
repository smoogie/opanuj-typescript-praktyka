type PagesMap = {
  homepage: string;
  about: string;
  contact: string;
};

type BooleanMap<T> = {
  [K in keyof T]: boolean;
}

type PagesAccess = BooleanMap<PagesMap>;

export function checkAccess(map: PagesMap): PagesAccess {
   const access: PagesAccess = {} as PagesAccess;
   let values = [];
    for (const key in map) {
      const value = map[key as keyof PagesMap]
      access[key as keyof PagesAccess] = value !== '' && !values.includes(value);
      values.push(value);
    }
    return access;
}
