export type Direction = "hexToRgb" | "rgbToHex";

export interface Config {
  extensionsAllowed: string;
  direction: Direction;
  ignoredFilesAndPaths: string;
}
