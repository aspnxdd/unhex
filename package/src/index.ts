#!/usr/bin/env node
import type { Config, Direction } from './types'

import fs from 'fs'
import { hexToRgb, rgbToHex, hslToRgb, rgbToHsl } from './utils'
import config from '../unhex.config'
import { cli } from './cli'
import { join } from 'path'
import { rgbMatch, hslMatch, hexMatch } from './regex'

async function main() {
   const conf = await cli()
   readDir(process.cwd(), true, conf)
}

main()

export function readDir(dir: string, writeFile: boolean = true, conf = config as Config) {
   return fs.readdirSync(dir).map((file) => {
      if (conf.ignoredFilesAndPaths?.split(', ').includes(file)) return
      const path = join(dir, file)
      const isDir = fs.existsSync(path) && fs.lstatSync(path).isDirectory()
      if (isDir) {
         readDir(path, writeFile, conf)
      } else {
         const extension = path.split('.').pop()
         if (conf.extensionsAllowed?.includes('*') || conf.extensionsAllowed?.includes(`.${extension}`)) {
            return parseFile(path, writeFile, conf.direction)
         }
      }
   })
}

export function parseFile(fileName: string, writeFile: boolean = true, direction: Direction) {
   console.log('Parsing file: ', fileName)
   const fileContent = fs.readFileSync(`${fileName}`, 'utf8')

   if (direction === 'hexToRgb') {
      const rgbData = fileContent.replace(hexMatch, (hex) => {
         return hexToRgb(hex)
      })
      writeFile && fs.writeFileSync(`${fileName}`, rgbData)
      return rgbData
   }
   if (direction === 'rgbToHex') {
      const hexData = fileContent.replace(rgbMatch, (rgb) => {
         return rgbToHex(rgb)
      })
      writeFile && fs.writeFileSync(`${fileName}`, hexData)
      return hexData
   }
   if (direction === 'rgbToHsl') {
      const hslData = fileContent.replace(rgbMatch, (rgb) => {
         return rgbToHsl(rgb)
      })
      writeFile && fs.writeFileSync(`${fileName}`, hslData)
      return hslData
   }
   if (direction === 'hslToRgb') {
      const rgbData = fileContent.replace(hslMatch, (hsl) => {
         return hslToRgb(hsl)
      })
      writeFile && fs.writeFileSync(`${fileName}`, rgbData)
      return rgbData
   }

   if (direction === 'hexToHsl') {
      const rgbData = fileContent.replace(hexMatch, (hex) => {
         return hexToRgb(hex)
      })
      const hslData = rgbData.replace(rgbMatch, (rgb) => {
         return rgbToHsl(rgb)
      })
      writeFile && fs.writeFileSync(`${fileName}`, hslData)
      return hslData
   }

   if (direction === 'hslToHex') {
      const rgbData = fileContent.replace(hslMatch, (hsl) => {
         return hslToRgb(hsl)
      })
      const hexData = rgbData.replace(rgbMatch, (rgb) => {
         return rgbToHex(rgb)
      })
      writeFile && fs.writeFileSync(`${fileName}`, hexData)
      return hexData
   }

   if (direction === 'allToRgb') {
      const hexToRgbData = fileContent.replace(hexMatch, (hex) => {
         return hexToRgb(hex)
      })

      const hslToRgbData = hexToRgbData.replace(hslMatch, (hsl) => {
         return hslToRgb(hsl)
      })
      if (writeFile) {
         fs.writeFileSync(`${fileName}`, hslToRgbData)
      }
      return hslToRgbData
   }

   if (direction === 'allToHex') {
      const rgbToHexData = fileContent.replace(rgbMatch, (rgb) => {
         return rgbToHex(rgb)
      })

      const hslToRgbData = rgbToHexData.replace(hslMatch, (hsl) => {
         return hslToRgb(hsl)
      })

      const rgbToHexData2 = hslToRgbData.replace(rgbMatch, (rgb) => {
         return rgbToHex(rgb)
      })

      if (writeFile) {
         fs.writeFileSync(`${fileName}`, rgbToHexData2)
      }
      return rgbToHexData2
   }

   if (direction === 'allToHsl') {
      const hexToRgbData = fileContent.replace(hexMatch, (hex) => {
         return hexToRgb(hex)
      })

      const rgbToHslData = hexToRgbData.replace(rgbMatch, (rgb) => {
         return rgbToHsl(rgb)
      })

      const hexToRgbData2 = rgbToHslData.replace(hexMatch, (hex) => {
         return hexToRgb(hex)
      })

      if (writeFile) {
         fs.writeFileSync(`${fileName}`, hexToRgbData2)
      }
      return hexToRgbData2
   }
}
