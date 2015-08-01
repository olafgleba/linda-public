*Linda* is a frontend development environment to build Processwire + Gulp driven project.

## Setting up the environment

* `$ git clone https://github.com/olafgleba/linda.git`
* Delete `.git` folder
* `$ npm install`, `$ bower install`
* `$ cd app/`
* Delete any hidden file (e.g. `.*`)
* `$ git clone https://github.com/ryancramerdesign/ProcessWire ./`
* Delete Processwire `.git` folder
* Delete Processwire `.gitignore` file
* Goto root level folder `processwire-profiles`:
  * Unzip desired site profile, shove it to folder `app/`
  * Shove `gitignore.txt` to folder `app/`, rename it to `.gitignore`
* Launch path in browser to install processwire
* Choose your site profile and go ahead with the installation (chmod 775, 666)
* Init new local repo (`$ git init`)


## Development

* `$ gulp build`

## Production

* `$ gulp build --production`

## Info

The Processwire CMS is not part of the environment. Place a fresh installation copy within the `app/` folder.
