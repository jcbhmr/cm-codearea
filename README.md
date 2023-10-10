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

## How it works

- The underlying implementation is a CodeMirror `EditorView`
- Supports the `readonly`