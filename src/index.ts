import fs from "fs";
import { hexToRGB3, hexToRGB6 } from "./utils";

function readDir() {
  fs.readdirSync("./test/").forEach((file) => {
    parseFile(file);
  });
}

readDir();

function parseFile(fileName: string) {
  const data = fs.readFileSync(`./test/${fileName}`, "utf8");
  const newData = data.replace(/#[0-9a-fA-F]{3,6}/g, (hex) => {
    return hex.length === 4 ? hexToRGB3(hex) : hexToRGB6(hex);
  });
  fs.writeFileSync(`./test/${fileName}`, newData);
}
