var Load  = function () {
    this.init();
};
Load.prototype = {
    url:'http://47.106.83.149:8081/api',
    totalCount:'',
    tabType:'',
    pageLoad:function (total) {
        var that=this;
        var GG = {
            "kk":function(mm){
                that.GetNews(mm,"");
            }
        }
        $("#page").initPage(total,1,GG.kk);
    },
    ViewDetail:function () {
        $(document).on('click','.news-recommend,.news-list>li',function () {
            var newsID = $(this).attr("news-id");
            location.href="news-detail.html?newsID=" + newsID;
        });
    },
    TabSwitch:function () {
        var that=this;
        $(".news-screen>li").click(function () {
           $(this).addClass("news-active").siblings().removeClass("news-active");
           var type=$(this).attr("type");
           that.totalCount="";
           that.tabType=type;
           that.GetNews("1");
        });
    },
    GetNews:function (page) {
        var that=this;
        $.ajax({
            url:this.url+'/news/list',
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            data:{currPage:page,pageSize:"9",type:that.tabType},
            success:function(data){
                if(data.code=="0"){
                    if(data.top == null||data.top == undefined||data.top == ''){
                        $(".news-recommend").hide();
                        var NoData=template('NoData');
                        $(".news-list").html(NoData);
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
                        $(".no-text").text(text);
                        $(".news-page").hide();
                    }else{
                        if(that.totalCount==""){
                            that.totalCount=data.page.totalCount;
                            that.pageLoad(data.page.totalCount);
                            var TopHTML = template('NewsTop', data.top);
                            $(".news-recommend-parent").html(TopHTML);
                        }
                        var NewsHTML = template('NewsList', data.page);
                        $(".news-list").html(NewsHTML);
                        $(".news-page").show();
                    }
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    init:function () {
        this.GetNews("1");
        this.ViewDetail();
        this.TabSwitch();
    }
}