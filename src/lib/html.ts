import htm from "htm";
import { createElement, Fragment } from "jsx-dom";

function htm2(strings: TemplateStringsArray, ...inserts: any[]): any {
  const returnValue = (htm as Function).apply(this, arguments);
  if (Array.isArray(returnValue)) {
    return Fragment({ children: returnValue });
  } else {
    return returnValue;
  }
}

function createElement2(type: any, props: any, ...children: any) {
  this[0] = 3;
  return createElement.apply(this, arguments);
}

const html: (
  strings: TemplateStringsArray,
  ...inserts: any[]
) => HTMLElement | DocumentFragment | Text = htm2.bind(createElement2);
export default html;
