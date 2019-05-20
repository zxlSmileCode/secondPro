<?php
    include 'conn.php';

    $page = isset($_POST['page']) ? $_POST['page'] : '';
    $num = isset($_POST['num']) ? $_POST['num'] : '';
    $order = isset($_POST['odwhat']) ? $_POST['odwhat'] : '';
    $upordown = isset($_POST['upordown']) ? $_POST['upordown'] : '';
    $min = isset($_POST['min']) ? $_POST['min'] : '';
    $max = isset($_POST['max']) ? $_POST['max'] : '';
    $detail = isset($_POST['detail']) ? $_POST['detail'] : '';

    $index = ($page - 1) * $num;//下标算法

    if($order&&$upordown){//如果需要以什么排序
        $sql = "SELECT * FROM goodlist ORDER BY $order $upordown";
        $sql2 = "SELECT * FROM goodlist ORDER BY $order $upordown LIMIT $index,$num;";
    }else{
        $sql = "SELECT * FROM goodlist";
        $sql2 = "SELECT * FROM goodlist LIMIT $index,$num;";
    }

    if($min&&$max&&$upordown){//如果需要以价格大小排序
        $sql = "SELECT * FROM goodlist WHERE price BETWEEN $min AND $max ORDER BY price $upordown";
        $sql2 = "SELECT * FROM goodlist WHERE price BETWEEN $min AND $max ORDER BY price $upordown LIMIT $index,$num;";
    }
    if($detail){//如果需要以商品名搜索
        $sql = "SELECT * FROM goodlist WHERE goodname LIKE '%$detail%'";
        $sql2 = "SELECT * FROM goodlist WHERE goodname LIKE '%$detail%' LIMIT $index,$num;";
    }

    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);//表的全部信息

    $res2 = $conn->query($sql2);
    $content2 = $res2->fetch_all(MYSQLI_ASSOC);

        $data = array(
            'len' => $res->num_rows,//总长度
            'len2' => $res2->num_rows,//以什么查询每页条数
            'goodlist' => $content,//总信息
            'goodlist2' => $content2,//每页信息
            'page' => $page,//页数
            'num' => $num//每页显示的数量
        );
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>