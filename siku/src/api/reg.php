<?php
    include 'conn.php';
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $psw = isset($_POST['psw']) ? $_POST['psw'] : '';

    $sql = "INSERT INTO user_inf(usname,uspsw) VALUES('$name','$psw');";
    $res = $conn->query($sql);

    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }
?>