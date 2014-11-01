# Building from source

> This article outlines how to build and compile the program from the source. It is partially included in the [new-install article](./new-install.md).

This article will automatically assume you have a working space with NPM, NodeJS, and Coffeescript (global) already installed.

### Clone repository
This will clone the latest master branch with the latest code.
```bash
$ git clone https://github.com/brendanashworth/watcher
```

### Resolve dependencies
Easy peasy.
```bash
$ npm install
```

### Compile
We build with Gulp.
```bash
$ gulp
```