<?php

    $servername = 'localhost';
    $username = 'root';
    $dbpsw = '';
    $dbname = 'sikudb';

    $conn = new mysqli($servername,$username,$dbpsw,$dbname);
// $conn->mysql_set_charset('utf8');
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }
?>