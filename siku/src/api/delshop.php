<?php
    include 'conn.php';

    $gid = isset($_POST['id']) ? $_POST['id'] : '';
    $name = isset($_POST['name']) ? $_POST['name'] : '';

    $sql = "DELETE FROM shopcar WHERE goodid=$gid AND buyer='$name';";
    $res = $conn->query($sql);
    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }
?>