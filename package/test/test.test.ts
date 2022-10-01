import type { Config } from './../src/types'

import { it, describe, expect } from 'vitest'
import { readDir, parseFile } from './../src/index'
import { hexToRgb, rgbToHex, hslToRgb, rgbToHsl } from './../src/utils'

describe('test parsing files', () => {
   it('read dir test', () => {
      const config: Config = {
         extensionsAllowed: '*',
         direction: 'hexToRgb',
         ignoredFilesAndPaths: 'node_modules, .git, test.test.ts',
      }
      const res = readDir('test', false, config)[0]
      const match1 = `color: "rgb(0, 0, 0)";`
      const match2 = `background-color: "rgb(0, 0, 0)";`
      expect(res).include(match1)
      expect(res).include(match2)
   })

   it('parse file test hexToRgb', () => {
      const res = parseFile('./test/hex.css', false, 'hexToRgb')
      const match1 = `color: "rgb(0, 0, 0)";`
      const match2 = `background-color: "rgb(0, 0, 0)";`
      expect(res).include(match1)
      expect(res).include(match2)
   })

   it('parse file test rgbToHsl', () => {
      const res = parseFile('./test/rgb.css', false, 'rgbToHsl')
      const match1 = `color: "hsl(0, 0%, 0%)";`
      expect(res).include(match1)
   })

   it('parse file test hslToRgb', () => {
      const res = parseFile('./test/hsl.css', false, 'hslToRgb')
      const match1 = `color: "rgb(0, 0, 0)";`
      expect(res).include(match1)
   })

   it('parse file test hslToHex', () => {
      const res = parseFile('./test/hsl.css', false, 'hslToHex')
      const match1 = `color: "#000000";`
      expect(res).include(match1)
   })

   it('parse file test hexToHsl', () => {
      const res = parseFile('./test/hex.css', false, 'hexToHsl')
      const match1 = `color: "hsl(0, 0%, 0%)";`
      expect(res).include(match1)
   })

   it('parse file test allToRgb', () => {
      const res = parseFile('./test/hexAndHsl.css', false, 'allToRgb')
      const match1 = `color: "rgb(0, 0, 0)";`
      const match2 = `background-color: "rgb(0, 0, 0)";`
      expect(res).include(match1)
      expect(res).include(match2)
   })

   it('parse file test allToHsl', () => {
      const res = parseFile('./test/hexAndRgb.css', false, 'allToHsl')
      const match1 = `color: "hsl(0, 0%, 0%)";`
      const match2 = `background-color: "hsl(0, 0%, 0%)";`
      expect(res).include(match1)
      expect(res).include(match2)
   })

   it('parse file test allToHex', () => {
      const res = parseFile('./test/rgbAndHsl.css', false, 'allToHex')
      const match1 = `color: "#000000";`
      const match2 = `background-color: "#000000";`
      expect(res).include(match1)
      expect(res).include(match2)
   })
})

describe('test rgb to hex with readDir', () => {
   it('read dir test', () => {
      const config: Config = {
         extensionsAllowed: '*',
         direction: 'rgbToHex',
         ignoredFilesAndPaths: 'node_modules, .git, test.test.ts',
      }
      const res = readDir('test', false, config)[0]
      const match1 = `color: "#000"`
      expect(res).include(match1)
   })
})

describe('text conversion functions', () => {
   it('hex to rgb', () => {
      const rgb = hexToRgb('#000')
      expect(rgb).toBe('rgb(0, 0, 0)')
   })

   it('hex to rgb', () => {
      const rgb = hexToRgb('#000000')
      expect(rgb).toBe('rgb(0, 0, 0)')
   })

   it('hex to rgb', () => {
      const rgb = hexToRgb('#ffffff')
      expect(rgb).toBe('rgb(255, 255, 255)')
   })

   it('hex to rgb', () => {
      const rgb = hexToRgb('#fff')
      expect(rgb).toBe('rgb(255, 255, 255)')
   })

   it('rgb to hex', () => {
      const hex = rgbToHex('rgb(0, 0, 0)')
      expect(hex).toBe('#000000')
   })

   it('rgb to hsl', () => {
      const hsl = rgbToHsl('rgb(255, 0, 0)')
      expect(hsl).toBe('hsl(0, 100%, 50%)')
   })

   it('hsl to rgb', () => {
      const rgb = hslToRgb('hsl(0, 0%, 0%)')
      expect(rgb).toBe('rgb(0, 0, 0)')
   })

   it('hsl to hex', () => {
      const rgb = hslToRgb('hsl(0, 0%, 0%)')
      const hex = rgbToHex(rgb)
      expect(hex).toBe('#000000')
   })

   it('hex to hsl', () => {
      const rgb = hexToRgb('#000')
      const hsl = rgbToHsl(rgb)
      expect(hsl).toBe('hsl(0, 0%, 0%)')
   })
})
