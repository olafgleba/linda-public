<?php

/**
 * ProcessWire Configuration File
 *
 * Site-specific configuration for ProcessWire
 *
 * Please see the file /wire/config.php which contains all configuration options you may
 * specify here. Simply copy any of the configuration options from that file and paste
 * them into this file in order to modify them.
 *
 * ProcessWire 2.x
 * Copyright (C) 2014 by Ryan Cramer
 * Licensed under GNU/GPL v2, see LICENSE.TXT
 *
 * http://processwire.com
 *
 */

if(!defined("PROCESSWIRE")) die();

/*** SITE CONFIG *************************************************************************/

/**
 * Enable debug mode?
 *
 * Debug mode causes additional info to appear for use during dev and debugging.
 * This is almost always recommended for sites in development. However, you should
 * always have this disabled for live/production sites.
 *
 * @var bool
 *
 */
$config->debug = false;


/*** INSTALLER CONFIG ********************************************************************/


/**
 * Installer: Database Configuration
 *
 */
$config->dbHost = 'localhost';
$config->dbName = '<datenbank-name>';
$config->dbUser = '';
$config->dbPass = '';
$config->dbPort = '3306';

/**
 * Installer: User Authentication Salt
 *
 * Must be retained if you migrate your site from one server to another
 *
 */
$config->userAuthSalt = 'ec266fdde584017b140ad570d9f31a47';

/**
 * Installer: File Permission Configuration
 *
 */
$config->chmodDir = '0777'; // permission for directories created by ProcessWire
$config->chmodFile = '0666'; // permission for files created by ProcessWire

/**
 * Installer: Time zone setting
 *
 */
$config->timezone = 'Europe/Berlin';
setlocale(LC_ALL, 'de_DE.UTF-8');


/**
 * Installer: HTTP Hosts Whitelist
 *
 */
$config->httpHosts = array('127.0.0.1','localhost', 'dev.olafgleba.de');

/**
 * Prepend template file
 *
 * PHP file in /site/templates/ that will be loaded before each page's template file.
 *
 * #notes Example: _init.php
 * @var string
 *
 */
$config->prependTemplateFile = 'prepend/functions.php';

/**
 * Append template file
 *
 * PHP file in /site/templates/ that will be loaded after each page's template file.
 *
 * #notes Example: _main.php
 * @var string
 *
 */
$config->appendTemplateFile = '';
