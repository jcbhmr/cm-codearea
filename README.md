# `<cm-codearea>` custom element

## Usage

This element is designed to behave like a `<textarea>`, but for _code_.

<table><td>

```html
<cm-codearea>
console.log("Hello world!")
</cm-codearea>
```

<td>

![]()

</table>

<table><td>

```html
<cm-codearea codelang="js" lang="fr">
console.log("Bonjour le monde!")
</cm-codearea>
```

<td>

![]()

</table>

```html
<form action="/api/run-go">
  <cm-codearea name="mycode" required codelang="go" autocomplete="yes" autofocus>
package main
import "fmt"
func main() {
  fmt.Println("hello world")
}
  </cm-codearea>
  <button>Run</button>
</form>
```

```js
myButton.addEventListener("click", () => {
  const codearea = document.querySelector("cm-codearea[codelang=css]")
  codearea.value = prettier.format(codearea.value, { parser: "css" })
})
```

### Definition

**Content model:** Text.

**Content attributes:**
- _Global attributes_
- **`autocomplete`:** Hint for intellisense features
- **`cols`:** Maximum number of characters per line
- **`dirname`:** Name of form control to use for sending the element's directionality in form submission
- **`disabled`:** Whether the form control is disabled
- **`form`:** Associates the element with a form element
- **`maxlength`:** Maximum length of value
- **`minlength`:** Minimum length of value
- **`name`:** Name of the element to use for form submission and in the form.elements API
- **`placeholder`:** User-visible label to be placed within the form control
- **`readonly`:** Whether to allow the value to be edited by the user
- **`required`:** Whether the control is required for form submission
- **`rows`:** Number of lines to show
- **`wrap`:** How the value of the form control is to be wrapped for form submission

**Accessibility considerations:**
- **Implicit ARIA semantics:** `role=textbox`
- **ARIA role, state and property allowances:**
    No role other than textbox. Global `aria-*` attributes and any `aria-* `attributes applicable to the `textbox` role.

### DOM interface

```webidl
interface CMCodeAreaElement : HTMLElement {
  [HTMLConstructor] constructor();

  [CEReactions] attribute DOMString autocomplete;
  [CEReactions] attribute unsigned long cols;
  [CEReactions] attribute DOMString dirName;
  [CEReactions] attribute boolean disabled;
  readonly attribute HTMLFormElement? form;
  [CEReactions] attribute long maxLength;
  [CEReactions] attribute long minLength;
  [CEReactions] attribute DOMString name;
  [CEReactions] attribute DOMString placeholder;
  [CEReactions] attribute boolean readOnly;
  [CEReactions] attribute boolean required;
  [CEReactions] attribute unsigned long rows;
  [CEReactions] attribute DOMString wrap;

  readonly attribute DOMString type;
  [CEReactions] attribute DOMString defaultValue;
  attribute [LegacyNullToEmptyString] DOMString value;
  readonly attribute unsigned long textLength;

  readonly attribute boolean willValidate;
  readonly attribute ValidityState validity;
  readonly attribute DOMString validationMessage;
  boolean checkValidity();
  boolean reportValidity();
  undefined setCustomValidity(DOMString error);

  readonly attribute NodeList labels;

  undefined select();
  attribute unsigned long selectionStart;
  attribute unsigned long selectionEnd;
  attribute DOMString selectionDirection;
  undefined setRangeText(DOMString replacement);
  undefined setRangeText(DOMString replacement, unsigned long start, unsigned long end, optional SelectionMode selectionMode = "preserve");
  undefined setSelectionRange(unsigned long start, unsigned long end, optional DOMString direction);
};
```

`<cm-textarea>` is a replaced element — it has intrinsic dimensions, like a raster image. By default, its display value is `inline-block`. Compared to other form elements it is relatively easy to style, with its box model, fonts, color scheme, etc. being easily manipulable using regular CSS.

**Available CSS `::part()`s:**

Use the `--resize: none` instead of `resize: none` to customize the resizability of this element. 

## How it works

- The underlying implementation is a CodeMirror `EditorView`
- When the CodeMirror `dispatch()` callback is triggered, dispatch those things as DOM events
- When the `codelang` attribute or `codeLang` property change, change the language mode of the editor
- Don't need to worry about multiple documents since this is a **single text box**