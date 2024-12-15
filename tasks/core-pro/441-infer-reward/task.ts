export type RewardRadar<S> = S extends `${string}⚡️[${infer V extends NonNullable<number>}$]⚡️${string}` ? `${V}$` : null;
