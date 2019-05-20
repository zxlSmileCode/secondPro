<?php
    include 'conn.php';

    $gid = isset($_POST['id']) ? $_POST['id'] : '';
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $buynum = isset($_POST['buynum']) ? $_POST['buynum'] : '';


    $sql1 = "SELECT * FROM shopcar WHERE buyer='$name' AND goodid=$gid";
    $res1 = $conn->query($sql1);
    if($res1->num_rows){
        $sql2 = "UPDATE shopcar SET buynum=buynum+$buynum WHERE buyer='$name' AND goodid=$gid";
        $res2 = $conn->query($sql2);
    }else{
        $sql2 = "INSERT INTO shopcar (buyer,goodid,buynum) VALUES ('$name',$gid,$buynum)";
        $res2 = $conn->query($sql2);
    }
    if($res2){
        echo 'yes';
    }else{
        echo 'no';
    }
?>