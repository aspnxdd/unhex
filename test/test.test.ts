import { it, describe, expect } from "vitest";
import { readDir, parseFile } from "../src/index";

describe("test", () => {
  it("read dir test", () => {
    const res = readDir("./test", false)[0];
    const match1 = `color: "rgb(0, 0, 0)`;
    const match2 = `background-color: "rgb(0, 0, 0)`;
    expect(res).include(match1);
    expect(res).include(match2);
  });

  it("parse file test", () => {
    const res = parseFile("./test/example.css", false);
    const match1 = `color: "rgb(0, 0, 0)`;
    const match2 = `background-color: "rgb(0, 0, 0)`;
    expect(res).include(match1);
    expect(res).include(match2);
  });
});
