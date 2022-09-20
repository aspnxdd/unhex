import fs from "fs";
import { join } from "path";
import type { Config, Direction } from "./types";
import inquirer from "inquirer";
import chalk from "chalk";

const CONFIG_FILENAME = "unhex.config.js";

export async function cli(): Promise<Config> {
  try {
    const actualConfig = require(join(
      process.cwd(),
      CONFIG_FILENAME
    )) as Config;
    if (actualConfig) {
      const shouldReplaceConfig = await askReplaceConfig({
        actualExtensionsAllowed: actualConfig.extensionsAllowed,
        actualDirection: actualConfig.direction,
        actualIgnoredFilesAndPaths: actualConfig.ignoredFilesAndPaths,
      });
      if (!shouldReplaceConfig) return actualConfig;
    }
    return await ask();
  } catch {
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

async function askExtensions(): Promise<string> {
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

async function askDirection(): Promise<Direction> {
  const { direction } = await inquirer.prompt({
    name: "direction",
    type: "list",
    message: "Direction",
    choices: ["hexToRgb", "rgbToHex", "rgbToHsl", "hslToRgb", "hexToHsl", "hslToHex", "allToRgb", "allToHex", "allToHsl"],
    default() {
      return "hexToRgb";
    },
  });
  return direction;
}

async function askIgnoredFilesAndPaths(): Promise<string> {
  const { ignoredFilesAndPaths } = await inquirer.prompt({
    name: "ignoredFilesAndPaths",
    type: "input",
    message: "Ignore files/paths",
    default() {
      return "node_modules, .git, .vscode, dist, build, .next, .gitignore";
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
  actualExtensionsAllowed: string;
  actualDirection: Direction;
  actualIgnoredFilesAndPaths: string;
}): Promise<boolean> {
  try {
    const actualConfig = {
      actualExtensionsAllowed,
      actualDirection,
      actualIgnoredFilesAndPaths,
    };
    const { shouldReplaceConfig } = await inquirer.prompt({
      name: "shouldReplaceConfig",
      type: "confirm",
      message: `Config file found.\n ${JSON.stringify(
        actualConfig,
        null,
        2
      )} \n Do you want to replace it?`,
    });
    return shouldReplaceConfig;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function getExtensions(): Promise<string> {
  const { extension } = await inquirer.prompt({
    name: "extension",
    type: "list",
    message: "File extensions to convert",
    choices: ["*", ".css", ".jsx", ".tsx", ".scss", ".svelte", ".vue", "--"],
    default() {
      return "*";
    },
  });
  return extension;
}
