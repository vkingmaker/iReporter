[![Coverage Status](https://coveralls.io/repos/github/vkingmaker/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/vkingmaker/iReporter?branch=develop)

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

Even though this information can be found inside the project on machine-readable
format like in a .json file, it's good to include a summary of most useful
links to humans using your project. You can include links like:

- Project homepage: https://your.github.com/awesome-project/
- Repository: https://github.com/your/awesome-project/
- Issue tracker: https://github.com/your/awesome-project/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    my@email.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!
- Related projects:
  - Your other project: https://github.com/your/other-project/
  - Someone else's project: https://github.com/someones/awesome-project/


## Licensing

One really important part: Give your project a proper license. Here you should
state what the license is and how to find the text version of the license.
Something like:

"The code in this project is licensed under MIT license."