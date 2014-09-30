<?php

namespace Fgz\Controller;

use Silex\Application;
use Fgz\Model\Model;
use Fgz\Model\Breed;

class Breeds extends Controller
{
    protected static $model = 'Fgz\Model\Breed';

    protected static $includes = array(
        Model::TYPE
    );
}