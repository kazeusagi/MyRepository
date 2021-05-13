<?php

require_once '../../database/assets/config.php';
require_once '../../database/assets/function.php';
require_once '../../database/classes/database.php';

try{
    $database = new Database($dbname, $host, $user, $psword);
    
    $result = $database->SqlSelectAll();
    
    echo(json_encode($result));
    
}catch (PDOException $e){
    exit($e->getMessage());
}

?>