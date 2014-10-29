# Building from source

> This article outlines how to build and compile the program from the source. It is partially included in the [new-install article](./new-install.md).

This article will automatically assume you have a working space with NPM, NodeJS, and Coffeescript (global) already installed.

### Clone repository
This will clone the latest master branch with the latest code.
```bash
$ git clone https://github.com/brendanashworth/watcher.js
```

### Resolve dependencies
Easy peasy.
```bash
$ npm install
```

### Start with Coffeescript
Starting with Coffeescript, our work flow is to compile all `src/*.coffee` files into respective `dist/*.js` files. This command allows us to do it easily.
```bash
$ coffee --compile --output dist/ src/
```

With this done, we'll have a nice little hierarchy of `dist/*.js` files that we can run. Just to keep it easy on us, we have a single .js launcher right in the home directory, named `watcher.js`. Running this file with `node` will then call the respective `dist/` files and will never, ever touch `src/`.

There you have it, watcher.js is now compiled from source.
