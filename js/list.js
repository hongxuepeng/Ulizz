var Load  = function () {
    this.init();
};
Load.prototype = {
    url:'http://47.106.83.149:8081/api',
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
    pageLoad:function () {
        var GG = {
            "kk":function(mm){
                console.log(mm);
            }
        }
        $("#page").initPage(100,1,GG.kk);
    },
    sliderLoad:function () {
        $("#scale-slider")
            .slider({
                min: 0,
                max: 1000,
                range: true,
                values: [0, 300]
            }).slider("pips", {
            rest: "label"
        }).slider("float");
        $("#scale-slider").slider({ stop: function(event, val) {
                console.log(val.values[0],val.values[1]);
            } });
    },
    checkboxLoad:function () {
        $('.screen-list input').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            increaseArea: '20%'
        });
    },
    MapRoom:function () {
        $(".search-right").click(function () {
            location.href="map-room.html";
        });
    },
    SortTab:function () {
        $(".list-sort-tab>span").click(function () {
            var sec=$(this).attr("sec");
            if(sec=="default"){
                $(".list-sort-price").removeClass("list-sort-desc").removeClass("list-sort-asc");
                $(".list-sort-price").attr("status","0");
                $(".list-sort-price").attr("sec","desc");
            }else{
                $(".list-sort-price").addClass("list-sort-desc");
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
                    $(this).attr("sec","asc");
                    $(this).removeClass("list-sort-desc");
                    $(this).addClass("list-sort-asc");
                }else{
                    $(this).attr("sec","desc");
                    $(this).removeClass("list-sort-asc");
                    $(this).addClass("list-sort-desc");
                }
            }
        })
    },
    eqSearch:function () {
        var that=this;
        $.ajax({
            url:this.url+'/house/eqSearch',
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            success:function(data){
                if(data.code=="0"){
                    var houseTypeHtml = template('houseTypeHtml', data.eqSearchDict);
                    $("#houseType").html(houseTypeHtml);
                    var configHtml = template('configHtml', data.eqSearchDict);
                    $("#config").html(configHtml);
                    var aroundHtml = template('aroundHtml', data.eqSearchDict);
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
            url:this.url+'/school/listByCity',
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            data:{city:"纽约"},
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
    init:function () {
        this.listByCity();
        this.eqSearch();
        this.BindHighlight();
        this.ShowSearch();
        this.HideSearch();
        this.pageLoad();
        this.sliderLoad();
        this.MapRoom();
        this.SortTab();
    }
}