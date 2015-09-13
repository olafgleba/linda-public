*Linda* is a frontend development environment to build Processwire + Gulp driven projects.

## Setup

* `$ mkdir name-of-project-folder`
* `$ cd name-of-project-folder`
* `$ git clone https://github.com/olafgleba/linda.git ./`
* Delete `.git` folder (`$ rm -rf .git`)
* `$ npm install`, `$ bower install`
* `$ cd app/`
* Delete `.gitignore` file
* `$ git clone https://github.com/ryancramerdesign/ProcessWire ./`
* Delete Processwire `.git` folder and `.gitignore`file
* Goto root level folder `processwire-profiles`
* Unzip desired site profile, shove the extracted folder to folder `app/`
* Launch path in browser to install processwire
* Choose your site profile and go ahead with the installation (chmod 775, 664)
* Init new local repo (`$ git init`)


## Development

* `$ gulp build`

## Production

* `$ gulp build --production`
