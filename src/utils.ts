export function hexToRGB3(hex: string) {
  const r = parseInt(hex.slice(1, 2), 16);
  const g = parseInt(hex.slice(2, 3), 16);
  const b = parseInt(hex.slice(3, 4), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

export function hexToRGB6(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

export function RGBToHex(rgb: string) {
  const [r, g, b] = rgb
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((n) => {
      const e = parseInt(n);
      return e.toString().length === 1 ? `${e}${e}` : e;
    });

  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}
