# Unit testing

> This article will outline running unit tests and does not outline making unit tests.

This article assumes you already have a working setup as illustrated in [new-install](./new-install.md), along with the following:
* Mocha testing framework: `npm install -g mocha`

### Running unit tests
```bash
$ npm test
```

This will run the following command automatically:
```bash
$ mocha --compilers coffee:coffee-script/register --reporter spec
```

Basically, it runs the mocha testing framework, which will automatically look in the `test` folder for unit tests. It also gives it the following paramaters:
* **--compilers coffee:coffee-script/register**. This allows us to use Coffeescript in our unit tests instead of just Javascript.
* **--reporter spec**. This gives us a more verbose and lovely output from the terminal.

If it succeeds, mocha will tell us, and if it doesn't, mocha will also tell us what went wrong.