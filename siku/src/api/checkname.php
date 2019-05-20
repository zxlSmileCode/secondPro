<?php
    include 'conn.php';

    $name = isset($_POST['name']) ? $_POST['name'] : '';

    $sql = "SELECT * FROM user_inf WHERE usname='$name'";

    $res = $conn->query($sql);

    if($res->num_rows) {
        //真：存在，不给注册
        echo 'no';
    }else{
        //假：不存在，可以注册
        echo 'yes';
    }
?>