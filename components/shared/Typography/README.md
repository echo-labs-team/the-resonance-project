# Typography

🔥 Use these typography components **instead** of the `<Text>` component from `react-native` 🔥

🛑 I repeat. Don't use the `<Text>` component from `react-native` directly. 🛑

## Hierarchy & overview

`<Title>` for main screen titles

👇

`<Subtitle>` for subtitles

👇

`<Heading>` for any headings for sections on a screen

👇

`<Text>` for regular body text, but can be used for anything

## `<Text>`

This is the base of all text usage in the app. Use `<Text>` for most body text.

### Basic

```js
import { Text } from './components/shared/Typography

function MyComponent(props) {
  return (
    <Text>Some text</Text>
  )
}
```

### Pass any props as you normally would

```html
<Text adjustsFontSizeToFit numberOfLines="{2}" style="{styles.title}">
  Some text
</Text>
```

### Font size

Use the `L` prop for large text

```html
<Text L>Some text</Text>
```

Use the `S` prop for small text

```html
<Text S>Some text</Text>
```

You get the picture 📸

### Font weight

Use the `bold` prop for bold text

```html
<Text bold>Some text</Text>
```

### Centering

Use the `center` prop for centering text

```html
<Text center>Some text</Text>
```

## `<Title>`

Use for main titles of screens

```js
import { Title } from './components/shared/Typography

function MyComponent(props) {
  return (
    <Title>Some Title</Title>
  )
}
```

## `<Subtitle>`

Use for subtitles of screens

```js
import { Subtitle } from './components/shared/Typography

function MyComponent(props) {
  return (
    <Subtitle>Some Subtitle</Subtitle>
  )
}
```

## `<Heading>`

Use for headings

```js
import { Heading } from './components/shared/Typography

function MyComponent(props) {
  return (
    <Heading>Some Heading</Heading>
  )
}
```
