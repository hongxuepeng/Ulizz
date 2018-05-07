var Load  = function () {
    this.init();
};
Load.prototype = {
    url:'http://47.106.83.149:8081/api',
    ServiceLoad:function(type){
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
            url:this.url+'/server/type',
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            success:function(data){
                if(data.code=="0"){
                    console.log(data);
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
    init:function () {
        this.ServiceLoad("1");
        this.TabSwitch();
    }
}