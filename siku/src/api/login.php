<?php
    include 'conn.php';

    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $psw = isset($_POST['psw']) ? $_POST['psw'] : '';

    $sql = "SELECT * FROM user_inf WHERE usname='$name' and uspsw='$psw'";

    $res = $conn->query($sql);

    if($res->num_rows) {
        echo 'yes';
    }else{
        echo 'no';
    }
?>