<?php
    include 'conn.php';

    $gid = isset($_GET['id']) ? $_GET['id'] : '';

    $sql = "SELECT * FROM goodlist WHERE gid='$gid';";

    $res = $conn->query($sql);

    $content = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>