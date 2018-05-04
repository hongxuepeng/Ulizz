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
        $(document).on('click','.cancel-collet,.cancel-information',function () {
            Showbo.Msg.confirm('您确定要取消该收藏吗？', function(flag) {
                if (flag == 'yes') {
                    console.log('你点击了确定!');
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
            data:{currPage:page,pageSize:10,type:1},
            success:function(data){
                if(data.code=="0"){
                    console.log(data);
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
            data:{currPage:page,pageSize:10,type:2},
            success:function(data){
                if(data.code=="0"){
                    console.log(data);
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
                            var HouseHTML = template('InformationHtml', data.page);
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
    init:function () {
        //this.InformationPageLoad();
        this.TabSwitch();
        this.CancelCollect();
        this.GetHousing("1");
        this.GetInformation("1");
    }
}