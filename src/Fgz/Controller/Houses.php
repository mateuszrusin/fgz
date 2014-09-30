<?php

namespace Fgz\Controller;

use Silex\Application;
use Fgz\Model\Model;
use Fgz\Model\House;

class Houses extends Controller
{
    protected static $model = 'Fgz\Model\House';

    protected static $includes = array();
}