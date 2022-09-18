# Unhex 🎨

A NodeJS package to convert any RGB color to HEX color or viceversa. Also supports HSL conversion.

### Example

```css
div {
  color: #fff;
  background-color: #0070f3;
}
```

After running `npx unhex` with `hexToRgb` direction.

```css
div {
  color: rgb(255, 255, 255);
  background-color: rgb(0, 112, 243);
}
```

### Want to try it? 🤔

```shell
npx unhex
```

### Features ✨

- Parse any file on a given directory and convert any RGB color to HEX color or viceversa.
- Custom configuration to:
  - Ignore certain files, dirs...
  - Define which extensions files to parse (.css, .tsx ...)

## TO-DO 🚧

- [X] Support HSL.
- [ ] Support HWB.

[MIT License](./LICENSE.md)
