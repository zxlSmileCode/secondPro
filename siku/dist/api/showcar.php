<?php
    include 'conn.php';
    $name = isset($_POST['name']) ? $_POST['name'] : '';

    $sql = "SELECT shopcar.goodid,shopcar.buyer,shopcar.buynum,goodlist.goodnum,goodlist.detail,goodlist.img,goodlist.price FROM shopcar LEFT JOIN goodlist ON shopcar.goodid=goodlist.gid WHERE buyer='$name';";

    $res=$conn->query($sql);

    $content = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>