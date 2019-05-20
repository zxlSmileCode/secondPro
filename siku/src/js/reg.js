/* 
* @Author: Marte
* @Date:   2019-05-09 19:48:04
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-18 15:12:35
*/

$(function(){

    $('#addweb').click(function() {//收藏寺库
        console.log(111);
        alert('您可以尝试通过快捷键CTRL + D 加入到收藏夹~');
    });
    
    $('.inputs').focus(function() {//input框聚焦特效
        $(this).css({
            'border-color':'red',
            'box-shadow': '0 1px 1px rgba(0, 0, 0, .075), 0 0 5px rgba(240, 127, 5, .4)'
        });
    });
    //input框聚焦失焦
    $('.inputs').blur(function() {
        $(this).css({
            'border-color':'#dedede',
            'box-shadow':'none'
        });
    });

    var pswOk = false;
    $('#regpsw').blur(function() {//密码框失焦
        var tips = $('.regName_tips').eq(1);
        if($(this).val().length>5){//密码长度必须大于5
            pswOk = true;
            tips.css('display','none');
        }else{
            pswOk = false;
            tips.css({
                display: 'block',
                color: 'red'
            });
        }
    });

    var cpswOk = false;
    $('#regcpsw').blur(function() {//再次输入密码框
        var tips = $('.regName_tips').eq(2);
        if($(this).val() == $('#regpsw').val()){
            cpswOk = true;
            tips.css('display','none');
        }else{
            cpswOk = false;
            tips.css({
                display: 'block',
                color: 'red'
            });
        }
        if(nameOk&&cpswOk&&pswOk){
            confirm('请不要使用邮箱号注册了，用手机吧！');
            $('.regTips').css('display', 'block');
        }else{
            alert('请确认以上信息无误才能继续');
        }
    });

    var nameOk = false;//用户名通过判断
    $('#regtext').blur(function() {//用户名input
        //先正则判断用户名是否为邮箱或手机
        var regPhone = /^1[3-9]\d{9}$/;
        var regEmain = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if(regPhone.test($(this).val()) || regEmain.test($(this).val())){//再用ajax判断数据库
            $.post('../api/checkname.php',{name:$(this).val()},
                function(str){
                    if(str=='yes'){//用户名没有重复为yes
                        nameOk = true;
                        $('.nametips').html('');
                    }else{
                        nameOk = false;
                        $('.nametips').html('您输入的用户名已重复').css('color','red');
                    }
                }
            );
        }else{
            $('.nametips').html('您输入的用户名不合法').css('color','red');
            nameOk = false;
        }
    });

    $('#regProtA').click(function(){//协议阅读按钮
        $('iframe').css('display','block');
        $('iframe').load("reg-agree.html",function() {//从iframe获取元素方法
            $(this).contents().find('.layer_close').click(function() {
                $('iframe').css('display','none');
            });
        });
    });

    var phonedc = false;
    var phonestr = '';
    $('#getdc').click(function() {
        $('#getdc').attr('disabled', true);
        var times = 30;
        var timer = setInterval(function(){
            if(times>0){
                times--;
            }
            if(times == 0){
                $('#getdc').attr('disabled', false);
                clearInterval(timer);
                $('#getdc').val('免费获取');
            }
            $('#getdc').val('免费获取('+times+'s)');
        }, 1000);
        $.ajax({
            type:'post',
            data:{
                phone:$('#regtext').val()
            },
            url:'../api/phonedc.php',
            async:true,
            success:function(str){
                var arr = JSON.parse(str);
                console.log(arr);
                phonestr = arr.phonecode;
            }
        });
    });
    
    $('#reginv').blur(function() {

        if($('#reginv').val()){
            if($('#reginv').val()==phonestr){
                $('#dctips').css('display', 'block');
                $('#dctips img').css('left', -15);
                phonedc = true;
            }else{
                $('#dctips img').css('left', -43);
                phonedc = false;
            }
        }else{
            $('#dctips').css('display', 'block');
            $('#dctips img').css('left', -43);
            confirm('请输入短信验证码');
        }
    });

    $('#regBtn').click(function() {//注册按钮
        var readOk = $('#readProtocol').prop("checked");//是否阅读协议
        if(nameOk && pswOk && cpswOk && readOk && phonedc){//满足五个Ok才可注册
            $.post('../api/reg.php', {
                name: $('#regtext').val(), 
                psw: $('#regpsw').val()
                },
                function(str) {
                    if(str == 'yes'){
                        var goLogin =confirm('注册成功！您要马上登陆吗？');
                        if(goLogin){
                            location.href="../html/login.html";
                        }
                    }else{
                        alert('注册失败！请重试');
                    }
            });
        }else{
            alert('请检查用户名密码阅读协议');
        }
    });
    

});