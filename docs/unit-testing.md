# Unit testing

> This article will outline running unit tests and does not outline making unit tests.

This article assumes you already have a working setup as illustrated in [new-install](./new-install.md), along with the following:
* Mocha testing framework: `npm install -g mocha`

### Running unit tests
```bash
$ gulp test
```

Basically, it runs the mocha testing framework, which will automatically look in the `test` folder for unit tests.

If it succeeds, mocha will tell us, and if it doesn't, mocha will also tell us what went wrong.