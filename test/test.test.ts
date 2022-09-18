import { it, describe, expect } from "vitest";
import { readDir, parseFile } from "../src/index";
import type { Config } from "./../src/types";
import {
  HSLToRGB,
  RGBToHSL,
  RGBToHex,
  hexToRGB3,
  hexToRGB6,
} from "./../src/utils";

describe("test parsing files", () => {
  it("read dir test", () => {
    const config: Config = {
      extensionsAllowed: "*",
      direction: "hexToRgb",
      ignoredFilesAndPaths: "node_modules, .git, test.test.ts",
    };
    const res = readDir("test", false, config)[0];
    const match1 = `color: "rgb(0, 0, 0)";`;
    const match2 = `background-color: "rgb(0, 0, 0)";`;
    expect(res).include(match1);
    expect(res).include(match2);
  });

  it("parse file test hexToRgb", () => {
    const res = parseFile("./test/example.css", false, "hexToRgb");
    const match1 = `color: "rgb(0, 0, 0)";`;
    const match2 = `background-color: "rgb(0, 0, 0)";`;
    expect(res).include(match1);
    expect(res).include(match2);
  });

  it("parse file test rgbToHsl", () => {
    const res = parseFile("./test/example3.css", false, "rgbToHsl");
    const match1 = `color: "hsl(0, 0%, 0%)";`;
    expect(res).include(match1);
  });

  it("parse file test hslToRgb", () => {
    const res = parseFile("./test/example4.css", false, "hslToRgb");
    console.log({ res });
    const match1 = `color: "rgb(0, 0, 0)";`;
    expect(res).include(match1);
  });
});

describe("test rgb to hex", () => {
  it("read dir test", () => {
    const config: Config = {
      extensionsAllowed: "*",
      direction: "rgbToHex",
      ignoredFilesAndPaths: "node_modules, .git, test.test.ts",
    };
    const res = readDir("test", false, config)[0];
    const match1 = `color: "#000"`;
    expect(res).include(match1);
  });
});

describe("text conversion functions", () => {
  it("hex to rgb", () => {
    const res = hexToRGB3("#000");
    expect(res).toBe("rgb(0, 0, 0)");
  });

  it("hex to rgb", () => {
    const res = hexToRGB6("#000000");
    expect(res).toBe("rgb(0, 0, 0)");
  });

  it("rgb to hex", () => {
    const res = RGBToHex("rgb(0, 0, 0)");
    expect(res).toBe("#000000");
  });

  it("rgb to hsl", () => {
    const res = RGBToHSL("rgb(255, 0, 0)");
    expect(res).toBe("hsl(0, 100%, 50%)");
  });

  it("hsl to rgb", () => {
    const res = HSLToRGB("hsl(0, 0%, 0%)");
    expect(res).toBe("rgb(0, 0, 0)");
  });
});
