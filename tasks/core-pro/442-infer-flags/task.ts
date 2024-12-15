import { type FeatureFlags } from './legacy-flags.ts';

type FlagsV2<T> =  {
  [Prop in keyof T as Prop extends `${infer S}V2${infer E}` ? `${S}${E}` : never]: T[Prop];
};

export type ModernFeatureFlags = FlagsV2<FeatureFlags>;

export function getFeatureFlagsV2(flags: FeatureFlags): ModernFeatureFlags {
  let flags2 = {};
  for (const key in flags) {
    if (key.includes('V2')) {
      const v2Key = key.replace('V2', '');
      flags2 = { ...flags2, [v2Key]: flags[key as keyof FeatureFlags] };
    }
  }
  const flagsV2: ModernFeatureFlags = flags2 as ModernFeatureFlags;
  return flagsV2;
}
