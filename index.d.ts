import { SemVer, Range } from 'semver';
export default function (
  a: string | SemVer | Range | null | undefined,
  b: string | SemVer | Range | null | undefined
): -1 | 0 | 1;
