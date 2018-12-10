[![Coverage Status](https://coveralls.io/repos/github/vkingmaker/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/vkingmaker/iReporter?branch=develop)
[![Build Status](https://travis-ci.com/vkingmaker/iReporter.svg?branch=develop)](https://travis-ci.com/vkingmaker/iReporter)

# iReporter
> Let's fight against corruption and malpractices in our continent to a great extent.

Corruption is a huge bane to Africa’s development. African countries must develop novel and
localised solutions that will curb this menace, hence the birth of iReporter. iReporter enables
any/every citizen to bring any form of corruption to the notice of appropriate authorities and the
general public. Users can also report on things that needs government intervention. Everybody deserves to be heard and we are counting on you to always give us useful information to consider we will always give you a feed back of our decision after investigating with the details and evidence you gave to us.


## Installing / Getting started
At the minimal you need to have node installed on your machine since it is the back-bone of this project

download and install node
create a javascript file `app.js` in a preffered location
open the file with your favorite text editor and type any valid js code. say `console.log('hello World')`;
using the terminal/console navigate to the directory where you save the file `app.js`
from the directory execute `$node app` using the terminal.

If after following the steps above you got `'hello world'` printed to your terminal/console, it means you have node properly installed so lets dive right in.

## Developing
This repository can actually be forked as contributors will be welcomed and have their worked merged to the main project if it is consider 'useful' as a feature or a bug fix for the application.

```shell
$ git clone https://github.com/vkingmaker/iReporter.git
$ cd iReporter
$ npm install
$ npm start 
```

By running `$ git clone https://github.com/vkingmaker/iReporter.git` in your terminal/console it will fetch the project files from the remote repository and save to your preferred location on your hard drive, then `cd iReporter` will change your current directory to the the location of the cloned project on your computer. Because the dependencies used to build this application was not sent to the remote repository you have to run `npm install` to install the necessary dependencies and finally `npm start` to launch the application using a local server.


### Building
After every significant change to the code base you should rebuild the project to effect the changes for testing.

```shell
./iReporter
$ npm run build
$ npm start
```

When you run `npm run build` in your terminal, first of all the rimraf clears the previous build from the project and `babel` re-builds the newest code base you have in your src directory

## Links

- Project homepage: https://vkingmaker.github.io/iReporter/
- Repository: https://github.com/vkingmaker/iReporter.git
- Pivotal tracker: https://www.pivotaltracker.com/n/projects/2228058
  - In case of sensitive bugs like security vulnerabilities, please contact
    vkingmaker1@gmail.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!


## Licensing

MIT License

Copyright (c) 2018 vkingmaker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
