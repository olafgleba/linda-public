*Linda* is a frontend development environment to build Processwire + Gulp driven project.

## Getting started

* Clone the git repo: `$ git clone https://github.com/olafgleba/linda.git`
* `npm install`, `bower install`

## Development

* `$ gulp build`

## Production

* `$ gulp build --production`

Processwire CMS is not part of the environment. Install a fresh copy in the **app/** folder. When the installation is done replace site folder files (`app/site/`) with their counterparts youl'll find in the **processwire-transfer** folder. At least enter your DB credentials in the `config.php` file.
