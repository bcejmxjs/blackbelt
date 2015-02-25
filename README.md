[![Build Status](https://travis-ci.org/bcejmxjs/blackbelt.svg?branch=master)](https://travis-ci.org/bcejmxjs/blackbelt)
# Blackbelt

Blackbelt is a web app made (read WIP) with love for Melbourne Martial Arts.

## Tell me more
The application is targeted at karate dojos and will be available liberally via the Apache 2.0 or MIT liscense.
We're using the [MEAN](http://meanjs.org/) stack to build the application's foundation.

## Contributors

[![](https://avatars1.githubusercontent.com/u/10470227?v=3&s=200)](https://github.com/bcejmxjs/)

- Brent Lewis [@blewis954](https://github.com/blewis954)
- Cory Anderson [@corya14](https://github.com/corya14)
- Jacob Jenkins [@jacobj](https://github.com/jacobj)
- Max Fresonke [@mfresonke](https://github.com/mfresonke)
- Xixi Ruan [@sissisnothere](https://github.com/sissisnothere)
- Emre Ozgener [@eozgener](https://github.com/eozgener)

## User Stories
User stories are hosted via [Trello.](https://trello.com/b/1REv6LsL/blackbelt)

## Installation
Install `node` and `mongodb` if they are not already installed.
Make sure mongo is configured to use the default port `27017`.

Install `bower` if it's not already installed:
```bash
$ npm install -g bower
```

Install `grunt` if it's not already installed:
```bash
$ npm install -g grunt-cli
```

## Testing
To load test mongo fixtures:
```bash
$ grunt mongo:load
```

To run unit tests:
```bash
$ grunt test
```

## Default Accounts
These accounts are generated using `grunt mongo:load`

|              | Admin  |  Instructor  | User     |
| ------------ | ------ | ------------ | --------------- |
| **Username** | admin  | instructor | test |
| **Password** | adminuser | instructoruser | testuser |
