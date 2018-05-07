var Load  = function () {
    this.init();
};
Load.prototype = {
    url:'http://47.106.83.149:8081/api',
    getUrlParam:function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },
    checkTime:function (i) {
        if (i<10) {
            i = "0" +i;
        }
        return i;
    },
    GetDetail:function () {
        var that=this;
        $.ajax({
            url:this.url+'/news/info/'+this.getUrlParam("newsID"),
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            success:function(data){
                if(data.code=="0"){
                    var info = data.info;
                    that.BindArticle(info.type);
                    $(".article-title").html(info.title);
                    $(".article-html").html(info.content);
                    var createTime = info.createTime;
                    var myDate = new Date(createTime);
                    var month = that.checkTime(myDate.getMonth()+1);
                    var date = that.checkTime(myDate.getDate());
                    $(".article-year").html(myDate.getFullYear());
                    $(".article-month").html(month+"月");
                    $(".article-day").html(date);
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    BindArticle:function(type){
        $.ajax({
            url:this.url+'/news/correlation',
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            data:{newsId:this.getUrlParam("newsID"),newsType:type},
            success:function(data){
                if(data.code=="0"){
                    var ArticleHtml = template('ArticleHtml',data);
                    $(".article-list").html(ArticleHtml);
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    init:function () {
        this.GetDetail();
    }
}