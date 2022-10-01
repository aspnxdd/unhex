# Getting started

This section will help you build a basic Unhex configuration from ground up.

## Go to your project directory

Go to your prject directory in which you want to standarize all colors format.

```sh
cd my-app
```

Then run:

```sh
npx unhex@latest
```

In your CLI, you will get prompted to select which file extensions you want to parse:

> **Note**: All these configurations can be later modified manually.

#### Extensions allowed

```sh
  *
  .css
  .jsx
  .tsx
  .scss
  .svelte
  .vue
```

#### Color conversion desired

```sh
  hexToRgb
  rgbToHex
  rgbToHsl
  hslToRgb
  hexToHsl
  hslToHex
  allToRgb
```

#### Paths and files to ignore

```sh
Ignore files/paths (node_modules, .git, .vscode, dist, build, .next, .gitignore)
```

This will create a `unhex.config.js` file in your project directory.

Example:

```js
// unhex.config.js

module.exports = {
   extensionsAllowed: '*',
   direction: 'hexToRgb',
   ignoredFilesAndPaths: 'node_modules, .git, .vscode, dist, build, .next, .gitignore',
}
```

## What's next?

If you want to run Unhex again, you will get asked if you want to replace your current configuration, just skip it if you want to preserve your current settings.
