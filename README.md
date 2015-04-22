[![Build Status](https://travis-ci.org/bcejmxjs/blackbelt.svg?branch=master)](https://travis-ci.org/bcejmxjs/blackbelt)
# Blackbelt

Blackbelt is a web app made (read WIP) with love for Melbourne Martial Arts.

## Tell me more
An online purchase-based video course system and web presence for Melbourne Martial Arts in Melbourne, Florida. Built with Angular, Express, Node, and MongoDB.

## Screenshot
![](https://dl.dropboxusercontent.com/u/11061210/Screen%20Shot%202015-02-26%20at%201.39.17%20PM.png)

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
```
$ npm install -g bower
```

Install `grunt` if it's not already installed:
```
$ npm install -g grunt-cli
```

## Run it!
```
$ npm install
```

```
$ grunt
```

## Testing
To load test mongo fixtures:
```
$ grunt mongo:load
```

To run unit tests:
```
$ grunt test
```

To run protractor tests:

Ensure the Selenium Web Driver is up to date with `npm install`.

Run all tests with db populated (recommended) 
```
$ grunt e2e
```

Execute a test:
```
$ grunt protractor:target
```

Where `target` is the desired test target.

Test targets:

Target  | Test Material
------- | ---------------------------------
example | Example testing of angularjs.org
login   | User, Instructor, and Admin login testing

## Default Accounts
These accounts are generated using `grunt mongo:load`

|              | Admin  |  Instructor  | User     |
| ------------ | ------ | ------------ | --------------- |
| **Username** | admin  | instructor | test |
| **Password** | adminuser | instructoruser | testuser |


## Facebook Info
[Melbourne Martial Arts Facebook App](https://developers.facebook.com/apps/632362650241923/dashboard/)

Facebook sign up/in won't work unless you access the functionality from [http://blackbelt.jacobejenkins.com](http://blackbelt.jacobejenkins.com).

There are four test users, one for each combination of authorized/unauthorized and 18+/under 18. These test users can be viewed [here](https://developers.facebook.com/apps/632362650241923/roles/test-users/). Message [@corya14](https://github.com/corya14) for the passwords.
