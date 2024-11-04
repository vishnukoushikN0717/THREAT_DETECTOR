<?php

// Cross-Site Scripting (XSS)
$name = $_GET['name'];
echo('Hello ' . $name);

// Command Injection
$cmd = $_COOKIE['cmd'];
exec("cat /var/log/apache2/access.log | grep " . $cmd);



