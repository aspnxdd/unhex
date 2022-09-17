import fs from "fs";
import { join } from "path";
const inquirer = require("inquirer");
const chalk = require("chalk");
type Direction = "hexToRgb" | "rgbToHex";

interface Config {
  extensionsAllowed?: string;
  direction: Direction;
  ignoredFilesAndPaths?: string;
}

const CONFIG_FILENAME = "unhex.config.js";

export async function cli() {
  try {
    const actualConfig = require(join(
      process.cwd(),
      CONFIG_FILENAME
    )) as Config;
    console.log("actualConfig", actualConfig);
    if (actualConfig) {
      const replaceConfig = await askReplaceConfig({
        actualExtensionsAllowed: actualConfig.extensionsAllowed,
        actualDirection: actualConfig.direction,
        actualIgnoredFilesAndPaths: actualConfig.ignoredFilesAndPaths,
      });
      console.log({ replaceConfig });
      if (!replaceConfig) return actualConfig;
      return await ask();
    } else {
      return await ask();
    }
  } catch (err) {
    console.log(err);
    return await ask();
  }
}

async function ask(): Promise<Config> {
  const extensionsAllowed = await askExtensions();
  const direction = await askDirection();
  const ignoredFilesAndPaths = await askIgnoredFilesAndPaths();

  console.log(chalk.blue("Configuration:"));
  console.log(chalk.blue("-------------------------"));
  console.log(chalk.blue("Direction selected: ", direction));
  console.log(chalk.blue("Extensions selected: ", extensionsAllowed));
  console.log(chalk.blue("Ignored files selected: ", ignoredFilesAndPaths));

  fs.writeFileSync(
    join(process.cwd(), CONFIG_FILENAME),
    `module.exports = {
          extensionsAllowed: "${extensionsAllowed}",
          direction: "${direction}",
          ignoredFilesAndPaths: "${ignoredFilesAndPaths}"
      };`
  );

  console.log(
    chalk.green(
      "Configuration file created! You can edit this file manually as unhex.config.js on this directory"
    )
  );
  return {
    extensionsAllowed,
    direction,
    ignoredFilesAndPaths,
  };
}

async function askExtensions() {
  let done = false;
  let extensions = new Set<string>();
  while (!done) {
    const extension = await getExtensions();
    if (extension !== "--") extensions.add(extension);
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
    default() {
      return "hexToRgb";
    },
  });
  return direction;
}

async function askIgnoredFilesAndPaths() {
  const { ignoredFilesAndPaths } = await inquirer.prompt({
    name: "ignoredFilesAndPaths",
    type: "input",
    message: "Ignore files/paths",
    default() {
      return "node_modules, .git, .vscode, dist, build";
    },
  });
  console.log(chalk.blue("Ignored files selected: ", ignoredFilesAndPaths));
  return ignoredFilesAndPaths.split(", ").join(", ");
}

async function askReplaceConfig({
  actualExtensionsAllowed,
  actualDirection,
  actualIgnoredFilesAndPaths,
}: {
  actualExtensionsAllowed?: string;
  actualDirection?: string;
  actualIgnoredFilesAndPaths?: string;
}) {
  try {
    const actualConfig = {
      actualExtensionsAllowed,
      actualDirection,
      actualIgnoredFilesAndPaths,
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
  } catch (err) {
    console.log(err);
  }
}

async function getExtensions() {
  const { extension } = await inquirer.prompt({
    name: "extension",
    type: "list",
    message: "File extensions to convert",
    choices: ["*", ".css", ".jsx", ".tsx", ".scss", ".sass", ".less", "--"],
    default() {
      return "*";
    },
  });
  return extension;
}
