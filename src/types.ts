export type Direction = "hexToRgb" | "rgbToHex" | "rgbToHsl" | "hslToRgb";

export interface Config {
  extensionsAllowed: string;
  direction: Direction;
  ignoredFilesAndPaths: string;
}
