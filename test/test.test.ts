import { it, describe, expect } from "vitest";
import { readDir, parseFile } from "../src/index";

describe("test hex to rgb", () => {
  it("read dir test", () => {
    const config = {
      extensionsAllowed: "*",
      direction: "hexToRgb",
      ignoredFilesAndPaths: "node_modules, .git",
    };
    const res = readDir("./test", false, config, "hexToRgb")[0];
    const match1 = `color: "rgb(0, 0, 0)`;
    const match2 = `background-color: "rgb(0, 0, 0)`;
    expect(res).include(match1);
    expect(res).include(match2);
  });

  it("read dir test fails", () => {
    const config = {
      extensionsAllowed: "*",
      direction: "hexToRgb",
      ignoredFilesAndPaths: "node_modules, .git",
    };
    const res = readDir("./test", false, config, "hexToRgb")[0];
    expect(res).toBe(undefined);
  });

  it("parse file test", () => {
    const res = parseFile("./test/example.css", false, "hexToRgb");
    const match1 = `color: "rgb(0, 0, 0)`;
    const match2 = `background-color: "rgb(0, 0, 0)`;
    expect(res).include(match1);
    expect(res).include(match2);
  });
});

describe("test rgb to hex", () => {
  it("read dir test", () => {
    const config = {
      extensionsAllowed: "*",
      direction: "hexToRgb",
      ignoredFilesAndPaths: "node_modules, .git",
    };
    const res = readDir("./test", false, config, "rgbToHex")[0];
    console.log(1, res);
    const match1 = `color: "rgb(0, 0, 0)"`;
    expect(res).include(match1);
  });
});
