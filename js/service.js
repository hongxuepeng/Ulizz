var Load  = function () {
    this.init();
};
Load.prototype = {
    url:'http://47.106.83.149:8081/api',
    noText:'暂无内容',
    ServiceLoad:function(type){
        var that=this;
        $.ajax({
            url:this.url+'/server/list',
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            data:{type:type},
            success:function(data){
                if(data.code=="0"){
                    if(data.list.length < 1){
                        var NoHTML = template('NoData');
                        $(".service-list").html(NoHTML);
                        $(".no-text").text(that.noText);
                    }else{
                        var ServiceHTML = template('ServiceHtml',data);
                        $(".service-list").html(ServiceHTML);
                    }
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    TypeLoad:function(){
        $.ajax({
            url:this.url+'/dict/list/help_type',
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            success:function(data){
                if(data.code=="0"){
                    var ServiceTab = template('ServiceTab',data);
                    $(".order-aside-list").html(ServiceTab);
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    TabSwitch:function(){
        var that = this;
        $(document).on('click','.order-aside-list>li',function () {
            $(this).addClass("order-aside-active").siblings().removeClass("order-aside-active");
            var type=$(this).attr("type");
            var text=$(this).text();
            $(".service-title").text(text);
            that.ServiceLoad(type);
        });
    },
    NoData:function(){
        var lan = $.cookie('lan');
        switch(lan){
            case 'cn':
                var text = '暂无内容';
                break;
            case 'en':
                var text = 'No content';
                break;
            default:
                var text = 'No content';
        }
        this.noText = text;
    },
    init:function () {
        this.NoData();
        this.TypeLoad();
        this.ServiceLoad("1");
        this.TabSwitch();
    }
}