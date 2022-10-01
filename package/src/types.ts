export type Direction =
   | 'hexToRgb'
   | 'rgbToHex'
   | 'rgbToHsl'
   | 'hslToRgb'
   | 'hexToHsl'
   | 'hslToHex'
   | 'allToRgb'
   | 'allToHex'
   | 'allToHsl'

export interface Config {
   extensionsAllowed: string
   direction: Direction
   ignoredFilesAndPaths: string
}
