<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Silex\Application;
use Silex\Provider\MonologServiceProvider;
use Fgz\Controller\ControllerProvider;
use Ruckuus\Silex\ActiveRecordServiceProvider;
use Silex\Provider\FacebookServiceProvider;

date_default_timezone_set('Europe/Warsaw');

$app->register(new Silex\Provider\SessionServiceProvider());

$app->register(new ActiveRecordServiceProvider(), array(
    'ar.model_dir' => APP_PATH . 'Model',
    'ar.connections' =>  array ('development' => 'sqlite://fgz.db'),
    'ar.default_connection' => 'development'
));

$app->register(new MonologServiceProvider(), array(
    "monolog.logfile" => ROOT_PATH . "/storage/logs/" . date("Y-m-d") . ".log",
    "monolog.level" => $app["log.level"],
    "monolog.name" => "application"
));

//$app->error(function (\Exception $e, $code) use ($app) {
//    $app['monolog']->addError($e->getMessage());
//    $app['monolog']->addError($e->getTraceAsString());
//
//    return new JsonResponse(array(
//        "statusCode" => $code,
//        "message" => $e->getMessage(),
//        "stacktrace" => $e->getTraceAsString()
//    ));
//});

$app->register(new Silex\Provider\SecurityServiceProvider(), array(
    'security.firewalls' => array(
        'private' => array(
            'pattern' => '^/',
            'facebook' => array(
                'check_path' => '/'
            ),
            // Users are identified by their Facebook UID
            'users' => array(
                // This is Mark Zuckerberg
                '4' => array('ROLE_USER', null),
            ),
        ),
    )
));

$app->register(new FacebookServiceProvider(), array(
    'facebook.config' => array(
        'appId'      => '272044619652532',
        'secret'     => 'b7477f1d87025cc1d906a2057893eb6c'
    ),
    'facebook.permissions' => array('email, user_groups'),
));

$app->mount('/', new ControllerProvider);