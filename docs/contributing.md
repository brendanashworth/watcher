# Contributing

> This article is aimed at those who are interested in contributing to the watcher.js source.

### Basic information
In order to contribute, simply clone / fork the repository, make changes on your local repository, then push and pull request. It can then be discussed and a maintainer will decide whether or not to merge.

### Large Contributions/Changes
If you plan on making a large contribution / change (such as an internal structural change, support in another language, etc) please create just an issue first. On the issue, everyone can contribute their idea and opinion towards the idea. This way, we can decide on the *best* way to do something, while still retaining your idea. After this step, then feel free to send in a pull request (like usual) and it should be accepted.

### Project Standards
* Tabs, not spaces.
* Try and use single quotes '' instead of double "". (Doubles are necessary for `#{}` syntax)
	* Use `#{}` instead of ' + x + '
* Use `is`, `and`, `isnt`, `or`, etc instead of their standard equivalent operator.
* In functions, don't use the () for giving paramaters unless it is inside another function. Ex: `doThis getParam('test')` -> `doThis(getParam('test'))`
* If the code is not explicitly readable and/or easy to understand, be respectful to other contributers by adding comments. However, don't overdo them.

### FAQ
> Do I need to know CoffeeScript to contribute to watcher.js?

No. CoffeeScript is only used on the backend, and you may contribute to the frontend (Javascript, HTML, CSS) if you know the respective languages.

> Do I need to know how to program to contribute to watcher.js?

No! If you find an issue or want a new feature, create a [new issue](https://github.com/boboman13/watcher.js/issues). Doing this will contribute to the software, even though you aren't writing code.

> Why is watcher.js written in CoffeeScript? Why not just Javascript?

CoffeeScript has an easy to follow syntax, favors readability, and contains a few fixes for Javascript. Not the entire app is written in CoffeeScript, but the language helps cut down on app size and code length by removing trivial characters necessary with Javascript.

### Contributing unit tests
Anyone can contribute a unit test. Making more and more unit tests helps us keep the program error-free.

Lets use the [`/test/src_stat_retrieve.coffee`](../test/src_stat_retrieve.coffee) unit test as an example.

The file naming structure is after the directory location in `src`, not `dist`. For example: it is located in `/src/stat/retrieve.coffee`, so the file is named `src_stat_retrieve.coffee`.

The unit test contains every single function within the file (or as many as possible) and runs multiple tests on each function. Running multiple tests on the function *is not necessary*, but it helps debug when a test fails.

It is good to put comments in your unit tests! Though CoffeeScript, Mocha, and Chai are all very verbose, unit tests are for humans, not machines!

Just pull request any unit tests you add. Also: we don't unit tests our unit tests. :)