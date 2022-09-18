export type Direction =
  | "hexToRgb"
  | "rgbToHex"
  | "rgbToHsl"
  | "hslToRgb"
  | "hexToHsl"
  | "hslToHex";

export interface Config {
  extensionsAllowed: string;
  direction: Direction;
  ignoredFilesAndPaths: string;
}
