 /* 
* @Author: Marte
* @Date:   2019-05-07 19:12:45
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-18 15:09:50
*/

$(function(){

    //二级导航
    $('.nav').on('mouseover','.nav2',function(){
        $(this).css('background-image', 'url(images/hovarrow.png)').siblings().css('background-image', '');
        $(this).children('div').addClass('active');
        $(this).siblings().children('div').removeClass('active');
    });
    $('.nav').on('mouseout','.nav2',function(){
        $('.nav2 .nav-list').removeClass('active');
        $('.nav .nav2').css('background-image', '');
    });

    // video点击播放
    $('.banner-video').click(function(){
        $('.banner-video .mask').css('display','none');
        $('.banner-video .video-play').css('display','none');
        $('.banner-video video').attr('controls',true);
        $('.banner-video video')[0].play();
    });

    // foot 划过显示二维码
    $('.foot-logo>div').hover(function(){
        console.log(111);
        $(this).children('.ewm-hide').addClass('active');
    },function() {
        $(this).children('.ewm-hide').removeClass('active');
    });

    $('.ourapp li').hover(function() {
        $(this).children('.app-ewm').addClass('active');
    }, function() {
        $(this).children('.app-ewm').removeClass('active');
    });


    $('longbox li').click(function() {
        window.open("html/detail.html?"+$(this).data('id'));
    });


    //轮播图切换  
    var timer=null;
    timer = setInterval(next, 3000);

    var iw = $('.longbox li').eq(1).outerWidth();//每个li的宽度
    function next(){
        $('.longbox').animate({left: -iw * 5},500,'linear',function(){
            $('.longbox li').slice(0, 5).insertAfter($('.longbox li').eq(14));
            $('.longbox').css('left',0);
        });
    }
    function prev(){
        $('.longbox li').slice(10, 15).insertBefore($('.longbox li').eq(0));
        $('.longbox').css('left',-iw * 5);
        $('.longbox').animate({'left':0},500,'linear');
    }
    //上下点击
    $('.next').click(function(){
        next();
    });
    $('.prev').click(function(){
        prev();
    });

    //划过停止轮播
    $('.mid-goods').hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(function(){
            next();
        }, 3000);
    });

    //给商品设置dataid
    $('.longbox li').each(function(i){
        $(this).attr('data-id', i);
    });
    //点击商品传id跳转到详情页
    $('.longbox li').click(function() {
        window.open("html/detail.html?" + $(this).data('id'));
    });

    //用户名显示
    if(getCookie('name')){
        $('#showname').html('欢迎您：'+getCookie('name')).addClass('active').css('color','orangered');
        $('#lbtn').html('退出').css('color', 'red').attr('href', 'javascript:;');
        $('#lbtn').click(function() {
            var goout = confirm('您确定要退出账号吗？');
            if(goout){
                removeCookie('name');
                location.href="index.html";
            }
        });
    }
});