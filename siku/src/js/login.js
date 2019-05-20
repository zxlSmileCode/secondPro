/* 
* @Author: Marte
* @Date:   2019-05-10 17:49:47
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-17 14:32:57
*/

$(function(){

    $('#loginBtn').click(function() {//登陆按钮
        $.post('../api/login.php',{
                name: $('#logintext').val(),
                psw:$('#loginpsw').val()
            },
            function(str) {
                if(str == 'yes'){
                    if($('#setCookie').prop("checked")){
                        setCookie('name',$('#logintext').val(),1);
                    }
                    location.href="../index.html";
                }else{
                    alert('用户名或密码错误');
                }
        });
    });
});