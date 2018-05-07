var Load  = function () {
    this.init();
};
Load.prototype = {
    url:'http://47.106.83.149:8081/api',
    MessageTotal:'',
    PageLoad:function(total){
        var GG = {
            "kk":function(mm){
                MessageLoad(mm);
            }
        }
        $("#page").initPage(total,1,GG.kk);
    },
    MessageLoad:function(page){
        var that=this;
        $.ajax({
            url:this.url+'/msg/list',
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            data:{currPage:page,pageSize:10},
            success:function(data){
                if(data.code=="0"){
                    console.log(data);
                    var total = data.page.totalCount;
                    if(total < 10){
                        $(".page-parent").hide();
                    }else{
                        $(".page-parent").show();
                    }
                    if(total < 1){
                        var NoHTML = template('NoData');
                        $(".message-list").html(NoHTML);
                    }else{
                        if(that.MessageTotal==""){
                            that.MessageTotal = total;
                            that.PageLoad(total);
                            var MessageHtml = template('MessageHtml', data.page);
                            $(".message-list").html(MessageHtml);
                        }else{
                            var MessageHtml = template('MessageHtml', data.page);
                            $(".message-list").html(MessageHtml);
                        }
                    }
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    ViewDetail:function(){
        var that = this;
        $(document).on('click','.message-title',function () {
            var status = $(this).parents(".message-item").attr("status");
            status = that.ChangeStatus(status);
            var orderId = $(this).parents(".message-item").attr("order-id");
            location.href = "order-detail.html?status=" + status +"&orderId=" + orderId;
        });
    },
    ChangeStatus:function(data){
        var code= "1";
        switch (data){
            case "10":
                code = 1;
                break;
            case "20":
                code = 2;
                break;
            case "50":
                code = 3;
                break;
            case "40":
                code = 4;
                break;
            case "0":
                code = 5;
                break;
            case "-20":
                code = 6;
                break;
            case "-21":
                code = 7;
                break;
            case "-10":
                code = 8;
                break;
            case "-11":
                code = 8;
                break;
            case "-13":
                code = 9;
                break;
            case "-14":
                code = 10;
                break;
            case "31":
                code = 11;
                break;
            case "61":
                code = 12;
                break;
            case "30":
                code = 13;
                break;
            case "60":
                code = 14;
                break;
        }
        return code
    },
    init:function () {
        this.MessageLoad('1');
        this.ViewDetail();
    }
}