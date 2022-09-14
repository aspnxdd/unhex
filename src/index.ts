import fs from "fs";
import { hexToRGB3, hexToRGB6 } from "./utils";
import { config } from "./hexconfig";

export function readDir(dir: string, writeFile: boolean = true) {
  return fs.readdirSync(dir).map((file) => {
    const extension = file.split(".").pop();
    if (
      config.extensionsAllowed.includes(`.${extension}`) ||
      config.extensionsAllowed.includes("*")
    ) {
      return parseFile(`${dir}/${file}`, writeFile);
    }
  });
}

export function parseFile(fileName: string, writeFile: boolean = true) {
  const data = fs.readFileSync(`${fileName}`, "utf8");
  const newData = data.replace(/#[0-9a-fA-F]{3,6}/g, (hex) => {
    return hex.length === 4 ? hexToRGB3(hex) : hexToRGB6(hex);
  });
  writeFile && fs.writeFileSync(`${fileName}`, newData);
  return newData;
}
