<?php

require_once '../../database/assets/config.php';
require_once '../../database/assets/function.php';
require_once '../../database/classes/database.php';

    $data = $_POST;
    $my_list = explode(" ", $data["my_list"]);
    $enemy_list = explode(" ", $data["enemy_list"]);
    
    $unique_list = array_unique(array_merge($my_list, $enemy_list));

    $query_string = "\"".implode("\",\"", $unique_list)."\"";

try{
    $database = new Database($dbname, $host, $user, $psword);
    
    $result = $database->SqlSearchByEnglishName($query_string);
    
    echo(json_encode($result));
    
}catch (PDOException $e){
    exit($e->getMessage());
}
?>
