#!/usr/bin/env node
import fs from "fs";
import { hexToRGB3, hexToRGB6, RGBToHex, HSLToRGB, RGBToHSL } from "./utils";
import config from "../unhex.config";
import { cli } from "./cli";
import { join } from "path";
import type { Config, Direction } from "./types";

async function main() {
  const conf = await cli();
  readDir(process.cwd(), true, conf);
}

main();

export function readDir(
  dir: string,
  writeFile: boolean = true,
  conf = config as Config
) {
  return fs.readdirSync(dir).map((file) => {
    if (conf.ignoredFilesAndPaths?.split(", ").includes(file)) return;
    const path = join(dir, file);
    const isDir = fs.existsSync(path) && fs.lstatSync(path).isDirectory();
    if (isDir) {
      readDir(path, writeFile, conf);
    } else {
      const extension = path.split(".").pop();
      if (
        conf.extensionsAllowed?.includes("*") ||
        conf.extensionsAllowed?.includes(`.${extension}`)
      ) {
        return parseFile(path, writeFile, conf.direction);
      }
    }
  });
}

export function parseFile(
  fileName: string,
  writeFile: boolean = true,
  direction: Direction
) {
  console.log("Parsing file: ", fileName);
  const data = fs.readFileSync(`${fileName}`, "utf8");
  if (direction === "hexToRgb") {
    const newData = data.replace(/#[0-9a-fA-F]{3,6}/g, (hex) => {
      return hex.length === 4 ? hexToRGB3(hex) : hexToRGB6(hex);
    });
    writeFile && fs.writeFileSync(`${fileName}`, newData);
    return newData;
  }
  if (direction === "rgbToHex") {
    const newData = data.replace(/rgb\([0-9, ]+\)/g, (rgb) => {
      return RGBToHex(rgb);
    });
    writeFile && fs.writeFileSync(`${fileName}`, newData);
    return newData;
  }
  if (direction === "rgbToHsl") {
    const newData = data.replace(/rgb\([0-9, ]+\)/g, (rgb) => {
      return RGBToHSL(rgb);
    });
    writeFile && fs.writeFileSync(`${fileName}`, newData);
    return newData;
  }
  if (direction === "hslToRgb") {
    const newData = data.replace(/hsl\([0-9%, ]+\)/g, (hsl) => {
      return HSLToRGB(hsl);
    });
    writeFile && fs.writeFileSync(`${fileName}`, newData);
    return newData;
  }

  if (direction === "hexToHsl") {
    const newData = data.replace(/#[0-9a-fA-F]{3,6}/g, (hex) => {
      return hex.length === 4 ? hexToRGB3(hex) : hexToRGB6(hex);
    });
    const newData2 = newData.replace(/rgb\([0-9, ]+\)/g, (rgb) => {
      return RGBToHSL(rgb);
    });
    writeFile && fs.writeFileSync(`${fileName}`, newData2);
    return newData2;
  }

  if (direction === "hslToHex") {
    const newData = data.replace(/hsl\([0-9%, ]+\)/g, (hsl) => {
      return HSLToRGB(hsl);
    });
    const newData2 = newData.replace(/rgb\([0-9, ]+\)/g, (rgb) => {
      return RGBToHex(rgb);
    });
    writeFile && fs.writeFileSync(`${fileName}`, newData2);
    return newData2;
  }
}
