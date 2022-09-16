import fs from "fs";
import { hexToRGB3, hexToRGB6, RGBToHex } from "./utils";
import { config } from "./../hex.config";
import { cli } from "./cli";

type Direction = "hexToRgb" | "rgbToHex";

async function main() {
  readDir("./", true, config, "hexToRgb");
}

main();

export function readDir(
  dir: string,
  writeFile: boolean = true,
  conf = config,
  direction: Direction
) {
  return fs.readdirSync(dir).map((file) => {
    const isDir = fs.existsSync(file) && fs.lstatSync(file).isDirectory();
    if (isDir) {
      if (config.ignoredFilesAndPaths.includes(file)) return;
      readDir(file, writeFile, conf, direction);
    } else {
      const extension = file.split(".").pop();
      if (
        conf.extensionsAllowed.includes("*") ||
        conf.extensionsAllowed.includes(`.${extension}`)
      ) {
        return parseFile(`${dir}/${file}`, writeFile, direction);
      }
    }
  });
}

export function parseFile(
  fileName: string,
  writeFile: boolean = true,
  direction: Direction
) {
  const data = fs.readFileSync(`${fileName}`, "utf8");
  console.log("Parsing file: ", fileName);
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
}
