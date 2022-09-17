import fs from "fs";
const inquirer = require("inquirer");
const chalk = require("chalk");

const CONFIG_FILENAME = "./unhex.config.js";

export async function cli() {
  try {
    const actualConfig = fs.readFileSync(CONFIG_FILENAME, "utf8");
    if (!actualConfig) return;
    const actualExtensionsAllowed = actualConfig
      .split("extensionsAllowed: [")[1]
      .split("],")[0]
      .replaceAll(`"`, ``);
    const actualDirection = actualConfig
      .split("direction: ")[1]
      .split(",")[0]
      .split('"')[1];
    const actualIgnoredFilesAndPaths = actualConfig
      .split("ignoredFilesAndPaths: [")[1]
      .split("]")[0]
      .replaceAll(`"`, ``);
    console.log({ actualIgnoredFilesAndPaths });
    const replaceConfig = await askReplaceConfig({
      actualExtensionsAllowed: `[${actualExtensionsAllowed}]`,
      actualDirection,
      actualIgnoredFilesAndPaths: `[${actualIgnoredFilesAndPaths}]`,
    });
    if (!replaceConfig) return;
    await ask();
  } catch {
    await ask();
  }
}

async function ask() {
  const extensionsAllowed = await askExtensions();
  const direction = await askDirection();
  const ignoredFilesAndPaths = await askIgnoredFilesAndPaths();

  console.log(chalk.blue("Configuration:"));
  console.log(chalk.blue("-------------------------"));
  console.log(chalk.blue("Direction selected: ", direction));
  console.log(chalk.blue("Extensions selected: ", extensionsAllowed));
  console.log(chalk.blue("Ignored files selected: ", ignoredFilesAndPaths));

  fs.writeFileSync(
    CONFIG_FILENAME,
    `export const config = {
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
  actualExtensionsAllowed: string;
  actualDirection: string;
  actualIgnoredFilesAndPaths: string;
}) {
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
