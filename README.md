## Introduction 
This project is intended to challenge your Vue.js skills by building a small app to track your favourite movies. Please spend 1 to 2 hours on the challenges listed below in preparation for your interview. Please do not be concerned if you do not have time to complete all of the challenges: the aim is to use the exercise as a jumping off point for discussion when we meet, and is intended to cover a range of experience levels with Vue.js.

## Challenges
1. Replace the static HTML list of movies with a dynamic list generated from the provided array of object literals (see the console in your browser developer tools) using Vue.js.
2. Add a form to add a new movie to the new dynamic list
3. Add buttons to delete movies from the new dynamic list
4. Add controls to sort the new dynamic list by title, release date or director
5. Add at least one unit test of your additions with Vitest

## Getting Started
### Project Setup
From the aa-code-challenges-vue-spa folder:
```sh
npm install
```

### Compile and Hot-Reload for Development
From the aa-code-challenges-vue-spa folder:
```sh
npm run dev
```

## Miscellaneous
### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).


### Other available scripts (for reference)

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
