import { it, describe, expect } from "vitest";
import { readDir, parseFile } from "../src/index";
import type { Config } from "./../src/types";

describe("test hex to rgb", () => {
  it("read dir test", () => {
    const config: Config = {
      extensionsAllowed: "*",
      direction: "hexToRgb",
      ignoredFilesAndPaths: "node_modules, .git",
    };
    const res = readDir("./test", false, config)[0];
    const match1 = `color: "#000`;
    const match2 = `background-color: "#000`;
    expect(res).include(match1);
    expect(res).include(match2);
  });

  it("read dir test fails", () => {
    const config: Config = {
      extensionsAllowed: "*",
      direction: "hexToRgb",
      ignoredFilesAndPaths: "node_modules, .git",
    };
    const res = readDir("./test", false, config)[0];
    expect(res).toBe(undefined);
  });

  it("parse file test", () => {
    const res = parseFile("./test/example.css", false, "hexToRgb");
    const match1 = `color: "#000`;
    const match2 = `background-color: "#000`;
    expect(res).include(match1);
    expect(res).include(match2);
  });
});

describe("test rgb to hex", () => {
  it("read dir test", () => {
    const config: Config = {
      extensionsAllowed: "*",
      direction: "hexToRgb",
      ignoredFilesAndPaths: "node_modules, .git",
    };
    const res = readDir("./test", false, config)[0];
    console.log(1, res);
    const match1 = `color: "#000"`;
    expect(res).include(match1);
  });
});
