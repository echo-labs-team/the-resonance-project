---
id: overview
title: Codebase Overview
---

> This section will give you an overview of the React codebase organization, its conventions, and the implementation.

## `/assets`

See how to use [fonts and images](https://docs.expo.io/versions/latest/guides/assets/).

## `/constants`

`Colors.js` contains all of our color definitions and `Layout.js` contains all the layout related things that we use.

## `/data`

This is where we have all our data fetching utilities. We'll add helpers here for any data fetching and API usage.

## `/utils`

Any other utility functions will live here.

## Co-located Tests

We don’t have a top-level directory for unit tests. Instead, we put them into a directory called `__tests__` relative to the files that they test. We're also using [`react-native-testing-library`](https://callstack.github.io/react-native-testing-library/) to enable easy component testing.

## Environments

Use `__DEV__` when targeting the development environment.

## [Flow](https://flow.org/)

Files marked with the `@flow` annotation in the header comment are being typechecked. Please add flow types wherever possible. We should [use flow types as our prop types](https://flow.org/en/docs/react/components/#toc-stateless-functional-components) as well.

## [React Hooks 🎣](https://reactjs.org/docs/hooks-intro.html)

Learn how to [simplify things with React Hooks](https://egghead.io/courses/simplify-react-apps-with-react-hooks). You can read more about [why Hooks are awesome](https://reactjs.org/docs/hooks-intro.html#motivation). There's [a Hook for anything](https://usehooks.com/) 😬
