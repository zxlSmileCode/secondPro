require.config({//配置参数设置
    paths : {//用于配置短路径的，重命名的，一般对不是在基础路径下面的文件，进行重命名,取别名
        'jquery' : 'jquery-1.12.4.min',
        'common' : 'common'
    },
    shim : {//设置依赖关系的：这个shim可以让我们在异步代码中有同步的特性
        'reg' : ['jquery','common'],
        'index' : ['jquery','common'],
        'list' : ['jquery','common'],
        'login' : ['jquery','common'],
        'shopcar' : ['jquery','common'],
        'detail' : ['jquery','common']
    }
});

// require(['reg','index','list','login','shopcar','detail'], function(sayHello) {
// 　　　　console.log(sayHello); 
// })