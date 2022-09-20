# Unhex 🎨

A NodeJS package to convert any RGB color to HEX, HSL color or viceversa.

### Example

```css
div {
  color: #fff;
  background-color: #0070f3;
}
```

After running `npx unhex@latest` with `hexToRgb` direction.

```css
div {
  color: rgb(255, 255, 255);
  background-color: rgb(0, 112, 243);
}
```

### Want to try it? 🤔

```shell
npx unhex@latest
```

### Features ✨

- Parse any file on a given directory and convert any color to among HSL, HEX and RGB combinations.
- Custom configuration to:
  - Ignore certain files, dirs...
  - Define which extensions files to parse (.css, .jsx, .scss, ...)

## TO-DO 🚧

- [X] Support HSL.
- [ ] Support HWB.

[MIT License](./LICENSE.md)
