/* 
* @Author: Marte
* @Date:   2019-05-13 15:42:33
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-17 14:57:39
*/

$(function(){
    var pages=0;//获取页数
    //渲染列表
    simshow(1);
    var ojbk=false;
    function create(str){
        var arr = JSON.parse(str);
            console.log(arr);
            var res = arr.goodlist2.map(function(item) {
                    return `<li data-id="${item.gid}">
                                <a href="javascript:;">
                                    <img src="../images/${item.img}" alt="" class="push" />
                                    <div style="padding-left:5px;height:40px;border-bottom:1px solid #ccc" class="clearfix">
                                        <span>欧洲</span><span>自营</span>
                                    </div>
                                    <p>${item.goodname}</p>
                                    <h4>￥${item.price}</h4>
                                    <p style="height:20px;display:none;" class="hide">
                                        <em class="fl">仅剩<span class="gdnum">${item.goodnum}</span>件</em>
                                        <span class="fr"><i></i>收藏<b>人气:${item.love}</b></span>
                                    </p>
                                </a>
                                <div class="posi">
                                    <a href="javascript:;">S</a><a href="javascript:;">M</a><a href="javascript:;">L</a>
                                </div>
                                <div class="cimsrc">
                                    <i><img src="../images/dt1.jpg"/></i>
                                    <i><img src="../images/dt2.jpg"/></i>
                                </div>   
                            </li>`;
            });
            $('.commodity-list ul').html(res);
            if(ojbk){
                pages = Math.ceil(arr.len2 / arr.num);
            }else{
                pages = Math.ceil(arr.len / arr.num);
            }
            $('.product_control_page span').html('<b>'+arr.page+'</b> / '+pages);
    }

    function simshow(ipage,orders,updown){
        $.post('../api/list.php',{
            num:8,
            page:ipage,
            odwhat:orders,
            upordown:updown
        },function(str) {
            create(str);
        });//默认排序
    }

    function minmaxshow(pages,minp,maxp,updown){
        $.post('../api/list.php', {
            num:8,
            page:pages,
            min: minp,
            max: maxp,
            upordown:updown
        }, function(str) {
                var arr = JSON.parse(str);
                var res = arr.goodlist2.map(function(item) {
                    return `<li data-id="${item.gid}">
                                <a href="javascript:;">
                                    <img src="../images/${item.img}" alt="" class="push" />
                                    <div style="padding-left:5px;height:40px;border-bottom:1px solid #ccc" class="clearfix">
                                        <span>欧洲</span><span>自营</span>
                                    </div>
                                    <p>${item.goodname}</p>
                                    <h4>￥${item.price}</h4>
                                    <p style="height:20px;display:none;" class="hide">
                                        <em class="fl">仅剩<span class="gdnum">${item.goodnum}</span>件</em>
                                        <span class="fr"><i></i>收藏<b>人气:${item.love}</b></span>
                                    </p>
                                </a>
                                <div class="posi">
                                    <a href="javascript:;">S</a><a href="javascript:;">M</a><a href="javascript:;">L</a>
                                </div>
                                <div class="cimsrc">
                                    <i><img src="../images/dt1.jpg"/></i>
                                    <i><img src="../images/dt2.jpg"/></i>
                                </div>   
                            </li>`;
                });
            create(str);
        });
    }

    function detailshow(pages,details){
        $.post('../api/list.php', {
            num:8,
            page:pages,
            detail:details,
        }, function(str) {
            create(str);
        });
    }

  

    //输入价格特效
    $('.product_control_price').hover(function() {
        $(this).css('overflow', 'inherit');
        $(this).children('div').addClass('on');
    }, function() {
        $(this).css('overflow', '');
        $(this).children('div').removeClass();
    });

    //列表商品移入移出
    $('.commodity-list ul').on('mouseover','li',function() {
        $(this).css('z-index', '99');
        $(this).children().find('p.hide').css('display', 'block');
        $(this).children('.posi').css('display', 'block');
        $(this).children('.cimsrc').css('display', 'block');
    });
    $('.commodity-list ul').on('mouseout','li',function() {
        $(this).css('z-index', '1');
        $(this).children().find('p.hide').css('display', 'none');
        $(this).children('.posi').css('display', 'none');
        $(this).children('.cimsrc').css('display', 'none');
    });

    //列表移入小图切换大图
    $('.commodity-list ul').on('mouseover','.cimsrc i',function() {
        var grand = $(this).parent().parent();
        var id = grand.data('id');
        if($(this).index()==1){
            grand.find('.push').attr('src', '../images/ed2.jpg');
        }else{
            grand.find('.push').attr('src', '../images/ed'+id+'.jpg');
        }
    });

    //列表点击后跳转详情
    $('.commodity-list ul').on('click', 'li', function() {
        window.open("detail.html?"+$(this).data('id'));
    });

    //排序按钮.ctrllist li
    var priceuad = false;//判断价格升序降序
    $('.ctrllist li.order').on('click', function() {
        $(this).children('a').addClass('on');
        $(this).siblings().children('a').removeClass('on');
        if($(this).index()==5){
            priceuad = !priceuad;//置反升降序
            $(this).children('a').toggleClass('down');
        }
    });

    var love = false;
    var priceod = false;
     var down = false;
    $('.ctrllist li').on('click',function() {
        if($(this).index()==0){//综合升序排序
            ojbk=false;
            priceod=false;
            love=false;
            simshow(1);
        }
        if($(this).index()==1){//人气升序排序
            objk=true;
            love=true;
            priceod=false;
            simshow(1,'love','ASC');
        }
       
        if($(this).index()==5){//价格升序降序排序
            objk=true;
            priceod = true;
            var min = $('#customSPr').val();
            var max = $('#customEPr').val();
            if(priceuad){
                if(textprice){//如果已经用价格查找区间
                    minmaxshow(1,min,max,'ASC');
                }else{
                    simshow(1,'price','ASC');
                }
            }else{
                if(textprice){//如果已经用价格查找区间
                    minmaxshow(1,min,max,'DESC');
                }else{
                    simshow(1,'price','DESC');
                    down=true;
                }
            }
        }
    });

    //确认输入价格框排序
    var textprice = false;//判断是否输入价格用于再排升降序
    $('.enter').on('click',function() {
        var min = $('#customSPr').val();
        var max = $('#customEPr').val();
        if(min&&max){//输入两边都不为空
            textprice = true;
            minmaxshow(1,min,max,'ASC');
        }else{
            alert('请输入最大值跟最小值');
        }
    });

    var detailok = false;
    $('.goBtn').on('click',function() {
        if($('#expKey1').val()){
            ojbk=true;
            detailok=true;
            detailshow(1,$('#expKey1').val());
        }
    });

    function perfect(num){
        if(detailok){
            detailshow(num,$('#expKey1').val());
        }
        if(textprice){
            minmaxshow(num,min,max,'ASC');
        }
        if(love){
            simshow(num,'love','ASC');
        }
        if(priceod){ 
            if(down){
                simshow(num,'price','DESC');
            }else{
                simshow(num,'price','ASC');
            }
        }
        if(!ojbk){
            simshow(num);
        }
    }
    $('.page-prev').on('click', function() {
        var minpage = $('.product_control_page span b').text();
        if(minpage>1){
            minpage--;
            perfect(minpage);
        }

    });

    $('.page-next').on('click',function() {
        var minpage = $('.product_control_page span b').text();
        if(minpage<pages){
            minpage++;
            perfect(minpage);
        }
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