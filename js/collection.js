var Load  = function () {
    this.init();
};
Load.prototype = {
    url:'http://47.106.83.149:8081/api',
    HousingTotal:"",
    InformationTotal:"",
    TabSwitch:function () {
        $(".collection-tab>span").click(function () {
            var tab=$(this).attr("tabindex");
            $(this).addClass("collection-active").siblings().removeClass("collection-active");
            $(".collection-content>.collection-"+tab).show().siblings().hide();
        });
    },
    HousingPageLoad:function (totalCount) {
        var that=this;
        var housing = {
            "kk":function(mm){
                that.GetHousing(mm);
            }
        }
        $("#page-housing").initPage(totalCount,1,housing.kk);
    },
    InformationPageLoad:function (totalCount) {
        var that=this;
        var information = {
            "kk":function(mm){
                that.GetInformation(mm);
            }
        }
        $("#page-information").initPage(totalCount,1,information.kk);
    },
    CancelCollect:function () {
        var that=this;
        $(document).on('click','.cancel-collet,.cancel-information',function () {
            var collectId=$(this).attr("collectId");
            var type=$(this).attr("type");
            Showbo.Msg.confirm('您确定要取消该收藏吗？', function(flag) {
                if (flag == 'yes') {
                    $.ajax({
                        url:that.url+'/collect/delete',
                        type:'POST',//GET
                        async:true,//或false,是否异步,
                        timeout:5000,//超时时间
                        dataType:'json',
                        data:{id:collectId,token:$.cookie('token')},
                        success:function(data){
                            if(data.code=="0"){
                                if(type == '1'){
                                    that.HousingTotal==""
                                    that.GetHousing("1");
                                }else{
                                    that.InformationTotal==""
                                    that.GetInformation("1");
                                }
                            }
                        },
                        error:function(){
                            console.log('错误')
                        }
                    });
                } else if (flag == 'no') {
                    console.log('你点击了取消!');
                }
            });
        });
    },
    GetHousing:function (page) {
        var that=this;
        $.ajax({
            url:this.url+'/collect/list',
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            data:{currPage:page,pageSize:10,type:1,token:$.cookie('token')},
            success:function(data){
                if(data.code=="0"){
                    var total = data.page.totalCount;
                    if(total < 10){
                        $("#page-housing").hide();
                    }else{
                        $("#page-housing").show();
                    }
                    if(total < 1){
                        var NoHTML = template('NoData');
                        $("#collection-housing").html(NoHTML);
                    }else{
                        if(that.HousingTotal==""){
                            that.HousingTotal = total;
                            that.HousingPageLoad(total);
                            var HouseHTML = template('HousingHtml', data.page);
                            $("#collection-housing").html(HouseHTML);
                        }else{
                            var HouseHTML = template('HousingHtml', data.page);
                            $("#collection-housing").html(HouseHTML);
                        }
                    }
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    GetInformation:function (page) {
        var that=this;
        $.ajax({
            url:this.url+'/collect/list',
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            data:{currPage:page,pageSize:10,type:2,token:$.cookie('token')},
            success:function(data){
                if(data.code=="0"){
                    var total = data.page.totalCount;
                    if(total < 10){
                        $("#page-information").hide();
                    }else{
                        $("#page-information").show();
                    }
                    if(total < 1){
                        var NoHTML = template('NoData');
                        $("#collection-information").html(NoHTML);
                    }else{
                        if(that.InformationTotal==""){
                            that.InformationTotal = total;
                            that.InformationPageLoad(total);
                            var InformationHTML = template('InformationHtml', data.page);
                            $("#collection-information").html(InformationHTML);
                        }else{
                            var InformationHTML = template('InformationHtml', data.page);
                            $("#collection-information").html(InformationHTML);
                        }
                    }
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    ViewDetail:function () {
        $(document).on('click','.collection-information-center>h4',function () {
            var newsID = $(this).attr("news-id");
            location.href="news-detail.html?newsID=" + newsID;
        });
    },
    init:function () {
        this.ViewDetail();
        this.TabSwitch();
        this.CancelCollect();
        this.GetHousing("1");
        this.GetInformation("1");
    }
}