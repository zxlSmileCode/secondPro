/* 
* @Author: Marte
* @Date:   2019-05-12 15:35:06
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-18 15:30:02
*/

$(function(){
    //接受页面参数进行数据库渲染
    var thisUrl = document.URL;
    var gid = thisUrl.split('?')[1];
    $.get('../api/detail.php',{id:gid},
        function(str) {
            var arr = JSON.parse(str);
            console.log(arr);
            var html1 = `<img src="../images/${arr[0].img}" />
                            <div class="zoomspan"></div>`;
            var html2 = '<h2>'+arr[0].detail +'</h2>';
            var html3 = `<div id="secooNameJs" class="pdt fl" style="line-height: 42px; *line-height: 48px; height:33px;"><span class="colorRed f18">一&nbsp;口&nbsp;价</span></div>
                        <div class="pdd fl" style="min-height: 32px;*height:auto">
                            <strong class="Dprice"><b><span class="rmb">¥</span>
                            </b>
                            </strong><strong class="Dprice" id="secooPriceJs">${parseInt(arr[0].price).toLocaleString()}</strong>
                                <span class="sale" style="display: none;">
                                </span>
                               <span class="mprice" style="display: none;"><span class="rmb">¥</span><span class="rmb" style="font-family: tahoma;"></span></span>
                        </div>`;
            var html4 = `仅剩 <span class="color9d0 goodnums">${arr[0].goodnum}</span> 件，抓紧时间购买哦！`;

            $('.bigimg').html(html1);
            $('.proName').html(html2);
            $('.xrdetail').html(html3);
            $('#lastProductNum').html(html4);
    });
    
    function calculate(type,ele){//封装加减计算函数
        // type:add 加 sub 减
        // ele:传this
        var max = $(ele).parent().parent().find('.goodnums').text();//获取库存量
        var num = $(ele).parent().find('#buyNumVal').val();//获取input购买框的值
        if(type == 'add'){
            num++;
            if(num >= max){
                num = max;
            }
        }else if(type == 'sub'){
            num--;
            if(num<=1){
                num = 1;
            }
        }
        $(ele).parent().find('#buyNumVal').val(num);
    }

    //加减按钮事件
    $('#subProduct').on('click',function() {
        calculate('sub',this);
    });
    $('#addProduct').on('click',function() {
        calculate('add',this);
    });

    //立即购买进入购物车页面
    $('#addBindCar').on('click',function() {
        if(getCookie('name')){
            var buynum = $(this).parent().parent().find('#buyNumVal').val();
            $.post('../api/shopcar.php', {id: gid,name:getCookie('name'),buynum:buynum}, 
                function(str) {
                    if(str == 'yes'){
                        location.href="shopcar.html?"+gid;
                    }else{
                        alert('系统故障，暂时无法购买');
                    }
            });
        }else{
            alert('请先登陆用户！');
        }
    });

    //加入购物车(ajax,蒙版+提示框)
    $('#addCarInfo').on('click', function() {
        if(getCookie('name')){
            $('.maskall').css('height', $('#all').innerHeight());
            $('.shops_tips').css('display', 'block');
            var buynum = $(this).parent().parent().find('#buyNumVal').val();
            $.post('../api/shopcar.php', {id: gid,name:getCookie('name'),buynum:buynum}, 
                function(str) {
                    if(str == 'yes'){
                        $('.shops_tips_title').html('加入购物车成功<a href="javascript:;" class="winboxClose"></a>');
                        $('.shops_tips_text').text('添加成功');
                    }else{
                        $('.shops_tips_title').html('加入购物车失败<a href="javascript:;" class="winboxClose"></a>');
                        $('.shops_tips_text').text('添加失败');
                    }
            });
        }else{
            alert('请先登陆用户！');
        }
    });
    //按继续购物和右上角关闭提示
    $('.shops_tips_title').on('click','.winboxClose',function() {
        $('.shops_tips').css('display', 'none');
        $('.maskall').css('height', 0);
    });
    $('.buy').click(function() {
        $('.shops_tips').css('display', 'none');
        $('.maskall').css('height', 0);
    });

    //按去购物车结算
    $('.toCart').click(function() {
        var buynum = $(this).parent().parent().parent().find('input#buyNumVal').val();
        $.post('../api/shopcar.php', {id: gid,name:getCookie('name'),buynum:buynum}, 
            function(str) {
                if(str == 'yes'){
                    location.href="shopcar.html?"+gid;
                }else{
                    alert('系统故障，暂时无法购买');
                }
        });
    });

    //左边盒子移入 右边图片跟着变
    $('.move_box').on('mouseenter', 'a', function() {
        $('.move_box i').eq($(this).index()).css('display', 'block');
        $(this).siblings().children('i').css('display', 'none');
        if($(this).index()>=1){
            $('.bigimg img').attr('src', '../images/sup'+($(this).index()+1) +'.jpg');
        }else{
            $('.bigimg img').attr('src', '../images/ed'+gid +'.jpg');
        }
        $('.fdjbox img').attr('src', '../images/fdj'+($(this).index()+1) +'.jpg');
    });


    $('.bigimg').on('mousemove',function(ev) {//划入显示放大镜
        $('.zoomspan').css('display','block');
        $('.fdjbox').css('display', 'block');
        var mbwidth = $('.zoomspan').outerWidth();
        var mbheight = $('.zoomspan').outerHeight();
        var bbwidth = $('.bigimg').outerWidth();
        var bbheight = $('.bigimg').outerHeight();
        var left = ev.pageX - $('.bigimg').offset().left - mbwidth/2;
        var top = ev.pageY - $('.bigimg').offset().top - mbheight/2;

        //不能超出边界
        if(left <0){
            left = 0;
        }else if(left >bbwidth - mbwidth){
            left = bbwidth - mbwidth;
        }

        if(top < 0){
            top = 0;
        }else if(top > bbheight - mbheight){
            top = bbheight - mbheight;
        }

        $('.zoomspan').css({
            left: left,
            top: top
        });
        //比例系数
        var scaleX = left / (bbwidth - mbwidth);
        var scaleY = top / (bbheight - mbheight);

        $('.fdjbox img').css({
            left: -$('.fdjbox img').outerWidth()*scaleX/2,
            top: -$('.fdjbox img').outerHeight()*scaleY/2
        });
    });

    $('.bigimg').on('mouseout',function() {
        $('.zoomspan').css('display','none');
        $('.fdjbox').css('display', 'none');
    });

    $(window).scroll(function() {
        var showhi = $('.contents').offset().top+$('.contents').innerHeight();
        if(window.scrollY >= showhi){
            $('.fsFixedTopContent').show(400);
        }else{
            $('.fsFixedTopContent').hide(400);
        }
    });

    $('.fsbacktotop').click(function() {
        $('html').animate({scrollTop:0}, 300);
    });


    //二级导航
    $('.nav').on('mouseover','.nav2',function(){
        $(this).css('background-image', 'url(../images/hovarrow.png)').siblings().css('background-image', '');
        $(this).children('div').addClass('active');
        $(this).siblings().children('div').removeClass('active');
    });
    $('.nav').on('mouseout','.nav2',function(){
        $('.nav2 .nav-list').removeClass('active');
        $('.nav .nav2').css('background-image', '');
    });
});