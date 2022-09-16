import fs from "fs";
const inquirer = require("inquirer");
const chalk = require("chalk");

const CONFIG_FILENAME = "./hex.config.js";

(async () => {
  try {
    const actualConfig = fs.readFileSync(CONFIG_FILENAME, "utf8");
    if (actualConfig) {
      const actualExtensionsAllowed = actualConfig
        .split("extensionsAllowed: [")[1]
        .split("],")[0]
        .replaceAll(`"`, ``);
      const actualDirection = actualConfig
        .split("direction: ")[1]
        .split(",")[0]
        .split('"')[1];
      const replaceConfig = await askReplaceConfig({
        actualExtensionsAllowed: `[${actualExtensionsAllowed}]`,
        actualDirection,
      });
      if (replaceConfig) {
        await ask();
      }
    }
  } catch {
    await ask();
  }
})();

async function ask() {
  const extensionsAllowed = await askExtensions();
  const direction = await askDirection();

  console.log(chalk.blue("Configuration:"));
  console.log(chalk.blue("-------------------------"));
  console.log(chalk.blue("Direction selected: ", direction));
  console.log(chalk.blue("Extensions selected: ", extensionsAllowed));

  fs.writeFileSync(
    CONFIG_FILENAME,
    `export const config = {
          extensionsAllowed: ["${extensionsAllowed}"],
          direction: "${direction}",
      };`
  );
}

async function askExtensions() {
  let done = false;
  let extensions = new Set<string>();
  while (!done) {
    const extension = await getExtensions();
    if (extensions.size === 0 || extension !== "--") {
      extensions.add(extension);
    } else {
      extensions.add(extension);
    }
    if (extension === "--" || extension === "*") {
      done = true;
    }
    console.log(
      chalk.blue("Extensions selected: ", [...extensions].join(", "))
    );
  }
  return [...extensions].join(", ");
}

async function askDirection() {
  const { direction } = await inquirer.prompt({
    name: "direction",
    type: "list",
    message: "Direction",
    choices: ["hexToRgb", "rgbToHex"],
  });
  return direction;
}

async function askReplaceConfig({
  actualExtensionsAllowed,
  actualDirection,
}: {
  actualExtensionsAllowed: string;
  actualDirection: string;
}) {
  const actualConfig = {
    actualExtensionsAllowed,
    actualDirection,
  };
  const { replaceConfig } = await inquirer.prompt({
    name: "replaceConfig",
    type: "confirm",
    message: `Config file found.\n ${JSON.stringify(
      actualConfig,
      null,
      2
    )} \n Do you want to replace it?`,
  });
  return replaceConfig;
}

async function getExtensions() {
  const { extension } = await inquirer.prompt({
    name: "extension",
    type: "list",
    message: "File extensions to convert",
    choices: ["*", ".css", ".jsx", ".tsx", ".scss", ".sass", ".less", "--"],
  });
  return extension;
}
