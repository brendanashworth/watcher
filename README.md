watcher.js
=====
[![Build Status](https://travis-ci.org/boboman13/watcher.js.svg)](https://travis-ci.org/boboman13/watcher.js)

> Watcher.js is a server management tool, designed to enable a system admin (or anyone that uses multiple servers) to keep a watch on their servers. It keeps track of uptime, network connections, speed, and more.

The software is written in [Node.js](http://nodejs.org "NodeJS"), with a [CoffeeScript](http://coffeescript.org "CoffeeScript") backend. The frontend is composed of an [AngularJS](https://angularjs.org/) application, written in pure JavaScript.

![screenshot of watcher.js](http://upimg.me/c76984b4fe5075899b8738cca4969a4b.png)

### Configuration
A sample configuration file can be found [here](https://github.com/boboman13/watcher.js/blob/master/app.yml). Here is a brief overview of the settings:
* Settings
	* Daemon: The settings for the daemon include the hostname and the port. Change these to change what the socket listens on. These are necessary if you are running a frontend also.
	* Frontend: The settings for the frontend include just the port to listen on. It will listen on all interfaces regardless.
* Servers
	* Server: A server takes four options: name, host, port, and id. It is necessary to put a `localhost` server if you wish to utilize the frontend server as a registered server, it will not list it automatically. The id should be the same as the list key. Putting the servers are *only necessary for the frontend*.

### Installation
```bash
$ git clone https://github.com/boboman13/watcher.js.git
$ cd watcher.js

$ npm install
$ npm run compile # Compiles the app. Scroll down to Compilation for more information.

$ node watcher
```

### Compilation
Compiling watcher.js requires [CoffeeScript](http://coffeescript.org).
```bash
$ npm -g install coffee-script
$ npm run compile
```
Running `npm run compile` runs the following script:
```bash
$ coffee -co dist/ src/
```
This calls the CoffeeScript compiler to compile all .coffee files in `src` into .js files, and place them into their respective `dist` position.

### Contributing
Contributing to watcher.js is easy. Simply fork the repository, commit changes to your own repository, and then pull request the changes. Here is a contributing FAQ.

> Do I need to know CoffeeScript to contribute to watcher.js?

No. CoffeeScript is only used on the backend, and you may contribute to the frontend (Javascript, HTML, CSS) if you know the correct languages.

> Do I need to know how to program to contribute to watcher.js?

No! If you find an issue or want a feature, create a [new issue](https://github.com/boboman13/watcher.js/issues). It'll help us figure out how we can help you.

> Why is watcher.js written in CoffeeScript? Why not just Javascript?

CoffeeScript has an eloquent syntax and favors readability. Not the entire app is written in CoffeeScript, but the language helps cut down on app size and code length by removing trivial characters necessary with Javascript.

> What can I do to contribute?

Besides general code additions, you can write *unit tests*.

### Unit Tests
Unit testing setup:
```bash
$ npm install -g mocha
$ npm run compile
```
Initiating unit test module:
```bash
$ npm test
```
Running `npm test` runs the `mocha` testing library along with the CoffeeScript compiler.

We want to try and get every part of our code as a unit test! Try and contribute a unit test module.

### Writing Unit Tests
Use the `/test/src_stat_retrieve.coffee` unit test as an example.

The file naming structure is after the directory location in `src`, not `dist`. For example: it is located in `/src/stat/retrieve.coffee`, so the file is named `src_stat_retrieve.coffee`.

The unit test contains every single function within the file and runs multiple tests on the function. Running multiple tests on the function *is not necessary*, but it helps debug when a test fails.

It is good to put comments in your unit tests! Though CoffeeScript, Mocha, and Chai are all very verbose, unit tests are for humans, not machines!