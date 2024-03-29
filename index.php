<?php

define('PS', '/');
define('DS', DIRECTORY_SEPARATOR);
define('APP_FILE', 'fgz.html');
define('ROOT_PATH', __DIR__ );
define('SRC_PATH', ROOT_PATH.DS.'src'.DS);
define('APP_PATH', SRC_PATH.'Fgz'.DS);

require_once __DIR__.DS.'vendor'.DS.'autoload.php';

$app = new Silex\Application();

require APP_PATH.'Config'.DS.'dev.php';
require SRC_PATH.'app.php';

$app->run();