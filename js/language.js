function BindLanguage() {
    $('[set-lan]').each(function(){
        var me = $(this);
        var a = me.attr('set-lan').split(':');
        var p = a[0];   //文字放置位置
        var m = a[1];   //文字的标识

        //用户选择语言后保存在cookie中，这里读取cookie中的语言版本
        var lan = $.cookie('lan');
        //选取语言文字
        switch(lan){
            case 'cn':
                var t = cn[m];  //这里cn[m]中的cn是上面定义的json字符串的变量名，m是json中的键，用此方式读取到json中的值
                break;
            case 'en':
                var t = en[m];
                break;
            default:
                var t = en[m];
        }

        //如果所选语言的json中没有此内容就选取其他语言显示
        if(t==undefined) t = cn[m];
        if(t==undefined) t = en[m];

        if(t==undefined) return true;   //如果还是没有就跳出

        //文字放置位置有（html,val等，可以自己添加）
        function placeholder(t) {
            me.attr("placeholder",t);
        }
        function className(t) {
            me.attr("class",t);
        }
        switch(p){
            case 'html':
                me.html(t);
                break;
            case 'placeholder':
                placeholder(t);
                break;
            case 'class':
                className(t);
                break;
            case 'val':
            case 'value':
                me.val(t);
                break;
            default:
                me.html(t);
        }

    });
}
$(function () {
    BindLanguage();
});