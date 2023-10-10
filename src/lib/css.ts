export default function css(strings: TemplateStringsArray, ...inserts: any[]) {
  const css = String.raw({ raw: strings }, ...inserts);
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
}
