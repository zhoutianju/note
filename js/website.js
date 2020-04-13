// 重定向
if(location.pathname == "/cdn/static/docs/yunchuang/yunchuang-quick-start/_book/index.html"){
    location.href = "/cdn/static/docs/yunchuang/yunchuang-quick-start/_book/";
}

$.ajaxSetup({ cache: false });


function scrollToActiveNav(event){
    setTimeout(function(){
        var nav = $('.chapter.active');
        var parent = nav.parent();

        var div, offset;
        if(parent.hasClass('articles')){
            div = parent.parent();
            offset = 0;
        }else{
            div = nav;
            offset = -200;
        }

        $('.book-summary').scrollTo(div, {offset: offset});
    }, 50);
}


// 导航栏添加几个按钮
gitbook.events.bind('start', function (e, config) {
    // 变更历史按钮
    var conf = config['diff-page']
    gitbook.toolbar.createButton({
        icon: 'fa fa-history',
        text: conf.label,
        onClick: function() {
            var filepath = gitbook.state.filepath;
            window.open(conf.base + filepath);
        }
    });

    // 编译按钮
    var conf2 = config['build-page']
    gitbook.toolbar.createButton({
        icon: 'fa fa-bug',
        text: conf2.label,
        onClick: function() {
            window.open(conf2.base);
        }
    });
});

gitbook.events.bind('page.change', function(event){
    // 高亮 GET、POST
    var items = ['GET', 'POST', 'HEAD', 'DELETE', 'PUT', 'PATCH'];
    items.forEach( item => {
        return
        var $code = $(`pre code:contains("${item}")`).filter(':contains("/api/")')
        if($code.length > 0) {
            var re = new RegExp(item, 'g')
            var html = $code.html().replace(re, `<span class="http-method">${item}</span>`)
            $code.html(html)
        }
    })
});



$(function(){
    gitbook.events.bind('page.change', function(event){
        scrollToActiveNav(event);
    });

    scrollToActiveNav(event);
});

