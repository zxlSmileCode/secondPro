/* 
* @Author: Marte
* @Date:   2019-05-14 19:34:46
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-18 15:44:48
*/

$(function(){
    //初始化渲染购物车页面
    $.post('../api/showcar.php', {name: getCookie('name')}, function(str) {
        var arr = JSON.parse(str);
        console.log(arr);
        var sum = 0;//买多少种商品
        var goodsums = 0;//每种商品数量之和
        var allprice = 0;//所有商品总价
        //res 渲染table商品数据
        var res = arr.map(function(item,i) {
            sum = i;//拿到最后的下标
            goodsums+=item.buynum*1;//拿到每件商品数量总和
            allprice += item.buynum*item.price;//算出商品总价
            return `<tbody data-id="${item.goodid}">
                        <tr class="addChecked" name="cartRow" productid="">
                            <td>
                                <input class="checkBox" id="choseItem" type="checkbox" checked="">
                            </td>
                            <td width="97" valign="top">
                                <div class="cartPic fl padRight15">
                                    <a href="#" target="_blank"><img src="../images/${item.img}" width="80" height="80"></a>
                                </div>
                            </td>
                            <td valign="top">
                                <div class="cartNames fl">
                                    <p class="namePro"><a href="#" target="_blank">${item.detail}</a></p>
                                </div>
                                <div class="cartNames fl" style="overflow:visible">
                                    <p class="namePro color999 pad45">        
                                    </p>
                                </div>
                            </td>
                            <td valign="top">中国大陆</td>
                            <td valign="top" class="setprice" data-price="${item.price}"><span class="rmb">¥</span>${parseInt(item.price).toLocaleString()}</td>
                            <td valign="top">
                                <div class="countNum clearfix">
                                    <div class="cPlus fl" action="decrease">-</div>
                                    <div class="cInput fl">
                                        <input data-max="${item.goodnum}" class="Num" type="text" value="${item.buynum}">
                                    </div>
                                    <div class="cMinus fl" action="increase">+</div>
                                </div>   
                            </td>
                            <td valign="top">
                                <strong class="colore93">
                                    <span class="rmb colore93">¥</span>
                                        ${parseInt(item.price*item.buynum).toLocaleString()}元
                                </strong>
                            </td>
                            <td valign="top">
                                <a href="###" class="del" name="deleteRow">删除</a>
                            </td>
                        </tr>
                    </tbody>`;
        });
        //res2 渲染下面记数记价框
        var res2 = `<div class="cartAno">
                        <div class="ano01 fl">
                            <input name="choseAll" type="checkbox" id="choseAll" checked=""><label for="choseAll">全选</label>
                        </div>
                        <div class="ano02 fl delSp">
                            <a href="###">删除选中商品</a>
                        </div>
                    </div>
                    <p class="kindsum" data-sum="${sum+1}">商品数量总计：${sum+1}件</p>
                    <p class="allsum" data-sum="${goodsums}">包装数量总计：${goodsums}</p>
                    <p>返利库币：0库币</p>
                    <p class="totalPriceBottom">商品金额总计（不含税金和运费）：<span class="rmb"></span><strong>${parseInt(allprice).toLocaleString()}.00</strong></p>
                    <p class="clearfix">
                        <a href="../index.html" class="fl a01" target="_blank">继续购物</a>
                        <a href="javascript:;" class="fr a02">立即结算</a>
                    </p>`;
        $('.carTable').append(res);//table商品数据插入
        $('.cartPrice').html(res2);//渲染记数记价框
    });

    $('.username').text(getCookie('name'));//显示用户名

    $('main_top a').click(function() {//退出用户按钮
        var getout = confirm("你确定要退出用户吗？");
        if(getout){
            removeCookie('name');
            location.href="list.html";
        }
    });

    $('thead').on('click','#choseAll,lable',function() {//thead全选复选框
        if($(this).prop('checked')){//控制table全选
            $('table').find('.checkBox').prop('checked', true);
            $('.cartPrice').find('#choseAll').prop('checked', true);
        }else{
            $('table').find('.checkBox').prop('checked', false);
            $('.cartPrice').find('#choseAll').prop('checked', false);
        }
        checkcost();

    });
    function calculate(type,ele){//封装加减按钮计算函数
        // type:add 加 sub 减
        // ele:传this
        var max = $(ele).parent().find('.Num').data('max');//获取库存量
        var num = $(ele).parent().find('.Num').val();//获取input购买框的值
        var price = $(ele).parent().parent().parent().find('.setprice').data('price');
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

        $(ele).parent().find('.Num').val(num);//input框改变数量
        $(ele).parent().parent().next().find('strong.colore93').html(`<span class="rmb colore93">¥</span>${parseInt(price*num).toLocaleString()}元`);
        if($(ele).parent().parent().parent().find('.checkBox').is(":checked")){//复选框选中计算时则改变下面总计数根价格
            checkcost();
        }
    }

    function checkcost(){//封装计算所有复选框的事件
        var allmuch = 0;
        var howmuch=0;
        var num=0;
        var arrss = $('table .Num');//所以input数量输入框
        arrss.each(function(i,item) {
            if($(item).parent().parent().parent().parent().find('.checkBox').is(":checked")){
                num ++;
                allmuch += $(item).val()*1;
                howmuch += $(item).val() * $(item).parent().parent().parent().parent().find('.setprice').data('price');
            }
        });
        $('body').find('.cartPrice .kindsum').html('商品数量总计：'+num+'件');
        $('body').find('.cartPrice .allsum').html('包装数量总计：'+allmuch);
        $('body').find('.totalPriceBottom strong').html(parseInt(howmuch).toLocaleString()+'.00');
    }

    //加减按钮
    $('table').on('click','.cPlus',function() {
        calculate('sub',this);
    });
    $('table').on('click','.cMinus',function() {
        calculate('add',this);
    });
    
    $('table').on('click','.checkBox',function() {//点击复选框事件
        if($('body').find('.checkBox').prop('checked')){//下面每个复选框全选控制上面全选按钮选中
            $('table').find('#choseAll').prop('checked', true);
            $('.cartPrice').find('#choseAll').prop('checked', true);
        }else{
            $('table').find('#choseAll').prop('checked', false);
            $('.cartPrice').find('#choseAll').prop('checked', false);
        }
        checkcost();
    });

    $('.cartPrice').on('click','#choseAll',function() {//下方全选
        if($(this).is(":checked")){
            $('body').find('.checkBox').prop('checked',true);
        }else{
            $('body').find('.checkBox').prop('checked',false);
        }

        if($('body').find('.checkBox').prop('checked')){
            $('table').find('#choseAll').prop('checked', true);
            $('.cartPrice').find('#choseAll').prop('checked', true);
        }else{
            $('table').find('#choseAll').prop('checked', false);
            $('.cartPrice').find('#choseAll').prop('checked', false);
        }
        checkcost();
    });

    $('.cartPrice').on('click', '.delSp', function() {//全选选中删除
        $('body').find('.checkBox').each(function(index, item) {
            if($(item).is(":checked")){
                var good =$(item).parent().parent().parent().data('id');
                $(item).parent().parent().parent().remove();

                $.post('../api/delshop.php', {name: getCookie('name'),id:good}, function(str) {
                    if(str=='yes'){
                        location.href="shopcar.html";
                    }else{
                        alert('系统删除失败');
                    }
                });
            }
        });
    });

    $('table').on('click', '.del', function() {//每行的删除按钮
        var good = $(this).parent().parent().parent().data('id');
        var sure = confirm('你确定不要我了么');
        if(sure){
            $(this).parent().parent().remove();
            $.post('../api/delshop.php', {name: getCookie('name'),id:good}, function(str) {
                if(str=='yes'){
                    location.href="shopcar.html";
                }else{
                    alert('系统删除失败');
                }
            });
        }
    });

    $('.cartPrice').on('click','.a02',function() {
        var nums=0;//选中复选框的个数
        var arrs = $('table .checkBox');//所有tr复选框4
        var numarr = $('table .Num');//所有的输入
        var checkmax = false;
        arrs.each(function(index, item) {
            if($(item).is(":checked")){
                nums++;
                var ipNums = $(item).parent().parent().find('.Num');
                if(ipNums.val()>ipNums.data('max')){
                    var checkmax = false;
                }else{
                    checkmax = true;
                }
            }else{
                nums--;
            }
        });

        if(nums>0){
            var paynow = confirm("您不看看其他商品吗？目前您只买了" + $('.cartPrice').find('.totalPriceBottom strong').text()+'元');
            if(paynow){
                $('.lastshow').css('display', 'block');
            }
        }else{
            console.log(222);
        }
    });

    $('table').on('input','.Num', function() {
        if($(this).val()<1){
            $(this).val(1);
        }
        if($(this).val()>$(this).data('max')){
            $(this).val($(this).data('max'));
        }
        checkcost();
    });
});