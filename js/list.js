var Load  = function () {
    this.init();
};
Load.prototype = {
    data:{
        url:'http://47.106.83.149:8081/api',
        cityCode:'USNY002',
        minInterval:0,
        maxInterval:1000,
        MessageTotal:'',
        houseType:'',
        houseConfig:'',
        aroundConfig:'',
        rankIsAsc:'',
        schoolId:'',
        likeSearch:'',
        currPage:1,
        pageSize:10,
        minPrice:0,
        maxPrice:1000,
        minPriceDefault:0,
        maxPriceDefault:1000,
    },
    BindHighlight:function () {
        $('#text-search').bind('keyup change',function(ev) {
            var searchTerm = $(this).val();
            $('.search-section').removeHighlight();
            if ( searchTerm ) {
                $('.search-section').highlight( searchTerm );
            }
        });
    },
    ShowSearch:function () {
        $(".search-val").focus(function(){
            $(".search-content").show();
        });
    },
    HideSearch:function () {
        $(document).bind("click", function (e) {
            if (!$(".search-content").is(":hidden")) {
                if ($(e.target).closest("#SearchBox").length == 0) {
                    $(".search-content").hide();
                }
            }
        });
    },
    pageLoad:function (totalCount) {
        var that=this;
        var GG = {
            "kk":function(mm){
                that.data.currPage=mm;
                that.BindList();
            }
        }
        $("#page").initPage(totalCount,1,GG.kk);
    },
    sliderLoad:function () {
        var that=this;
        $("#scale-slider")
            .slider({
                min: that.data.minPrice,
                max: that.data.maxPrice,
                range: true,
                values: [that.data.minPriceDefault, that.data.maxPriceDefault]
            }).slider("pips", {
            rest: "label"
        }).slider("float");
        $("#scale-slider").slider({ stop: function(event, val) {
                that.data.minInterval=val.values[0];
                that.data.maxInterval=val.values[1];
                that.data.MessageTotal='';
                that.data.currPage=1;
                that.BindList();
        } });
    },
    checkboxLoad:function () {
        var that=this;
        $('.screen-list input').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            increaseArea: '20%'
        });
        $('.screen-list input').on('ifChanged', function(){
            var houseTypeArray=[],houseConfigArray=[],aroundConfigArray=[];
            $("#houseType input[type='checkbox']:checked").each(function () {
                houseTypeArray.push($(this).attr("myid"));
            });
            $("#config input[type='checkbox']:checked").each(function () {
                houseConfigArray.push($(this).attr("myid"));
            });
            $("#aroundConfig input[type='checkbox']:checked").each(function () {
                aroundConfigArray.push($(this).attr("myid"));
            });
            that.data.houseType=houseTypeArray.join();
            that.data.houseConfig=houseConfigArray.join();
            that.data.aroundConfig=aroundConfigArray.join();
            that.data.MessageTotal='';
            that.data.currPage=1;
            that.BindList();
        });
    },
    MapRoom:function () {
        $(".search-right").click(function () {
            location.href="map-room.html";
        });
    },
    SortTab:function () {
        var that=this;
        $(".list-sort-tab>span").click(function () {
            var sec=$(this).attr("sec");
            if(sec=="default"){
                $(".list-sort-price").removeClass("list-sort-desc").removeClass("list-sort-asc");
                $(".list-sort-price").attr("status","0");
                $(".list-sort-price").attr("sec","desc");
                that.data.rankIsAsc="";
                that.data.MessageTotal='';
                that.data.currPage=1;
                that.BindList();
            }else{
                $(".list-sort-price").addClass("list-sort-desc");
                that.data.rankIsAsc=false
            }
            $(this).addClass("list-sort-active").siblings().removeClass("list-sort-active");
        });
        $(".list-sort-price").click(function () {
            var sec=$(this).attr("sec");
            var status=$(this).attr("status");
            if(status=="0"){
                $(this).attr("status","1");
            }else{
                if(sec=="desc"){
                    that.data.rankIsAsc=true;
                    $(this).attr("sec","asc");
                    $(this).removeClass("list-sort-desc");
                    $(this).addClass("list-sort-asc");
                }else{
                    that.data.rankIsAsc=false
                    $(this).attr("sec","desc");
                    $(this).removeClass("list-sort-asc");
                    $(this).addClass("list-sort-desc");
                }
            }
            that.data.MessageTotal='';
            that.data.currPage=1;
            that.BindList();
        })
    },
    eqSearch:function () {
        var that=this;
        $.ajax({
            url:this.data.url+'/house/eqSearch',
            type:'GET',//GET
            async:false,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            success:function(data){
                if(data.code=="0"){
                    var houseTypeHtml = template('houseTypeHtml', data.list);
                    $("#houseType").html(houseTypeHtml);
                    var configHtml = template('configHtml', data.list);
                    $("#config").html(configHtml);
                    var aroundHtml = template('aroundHtml', data.list);
                    $("#aroundConfig").html(aroundHtml);
                    that.checkboxLoad();
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    listByCity:function () {
        $.ajax({
            url:this.data.url+'/school/listByCity',
            type:'GET',//GET
            async:false,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            data:{cityCode:this.data.cityCode},
            success:function(data){
                if(data.code=="0"){
                    var universityHtml = template('universityHtml', data);
                    $("#university").html(universityHtml);
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    BindList:function () {
        var that=this;
        var dataObj={
            houseType:that.data.houseType,//房源类型
            houseConfig:that.data.houseConfig,//公寓配套
            aroundConfig:that.data.aroundConfig,//周边配套
            minInterval:that.data.minInterval,//最低值
            maxInterval:that.data.maxInterval,//最高值
            intervalColumn:'price',//区间类型
            rankColumn:'price',//排序类型
            rankIsAsc:that.data.rankIsAsc,//升序-true,降序-false
            cityCode:that.data.cityCode,//城市
            schoolId:that.data.schoolId,//学校ID
            likeSearch:that.data.likeSearch,//模糊查询
            currPage:that.data.currPage,//当前页码
            pageSize:that.data.pageSize
        }
        $.ajax({
            url:this.data.url+'/house/list',
            type:'GET',//GET
            async:false,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            data:dataObj,
            success:function(data){
                if(data.code=="0"){
                    var total = data.page.totalCount;
                    that.data.minPrice = data.minPrice;
                    that.data.maxPrice = data.maxPrice;
                    that.data.minPriceDefault = data.minPriceDefault;
                    that.data.maxPriceDefault = data.maxPriceDefault;
                    that.sliderLoad();
                    $(".list-apartment-num").text(total);
                    $(".unit").html(data.currencySymbol);
                    if(total < 10){
                        $(".page-parent").hide();
                    }else{
                        $(".page-parent").show();
                    }
                    if(total < 1){
                        $(".no-find").show();
                        $(".list-section").html("");
                    }else{
                        $(".no-find").hide();
                        if(that.data.MessageTotal==""){
                            that.data.MessageTotal = total;
                            that.pageLoad(total);
                            var listHtml = template('listHtml', data.page);
                            $(".list-section").html(listHtml);
                        }else{
                            var listHtml = template('listHtml', data.page);
                            $(".list-section").html(listHtml);
                        }
                    }
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    ChangeUniversity:function(){
        var that=this;
      $("#university").on('change',function () {
          that.data.schoolId=$(this).val();
          that.data.MessageTotal='';
          that.data.currPage=1;
          that.BindList();
      });
    },
    BindSearch:function(){
        var that=this;
      $(".search-btn").click(function () {
         var content=$(".search-val").val();
          that.data.likeSearch=content;
          that.data.MessageTotal='';
          that.data.currPage=1;
          that.BindList();
      });
    },
    CacheOption:function(){
      $(".no-find-cache").click(function () {
          location.reload();
      });
    },
    init:function () {
        this.listByCity();
        this.ChangeUniversity();
        this.eqSearch();
        this.BindHighlight();
        this.ShowSearch();
        this.HideSearch();
        this.sliderLoad();
        this.MapRoom();
        this.SortTab();
        this.BindSearch();
        this.CacheOption();
        var dataObj={
            houseType:this.houseType,//房源类型
            houseConfig:this.houseConfig,//公寓配套
            aroundConfig:this.aroundConfig,//周边配套
            minInterval:this.minInterval,//最低值
            maxInterval:this.maxInterval,//最高值
            intervalColumn:'price',//区间类型
            rankColumn:'price',//排序类型
            rankIsAsc:this.rankIsAsc,//升序-true,降序-false
            cityCode:this.cityCode,//城市
            schoolId:this.schoolId,//学校ID
            likeSearch:this.likeSearch,//模糊查询
            currPage:this.currPage,//当前页码
            pageSize:this.pageSize
        }
        this.BindList(dataObj);
    }
}