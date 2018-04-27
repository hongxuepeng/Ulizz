var Load  = function () {
    this.init();
};
Load.prototype = {
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
    init:function () {
        this.BindHighlight();
        this.ShowSearch();
        this.HideSearch();
        this.pageLoad();
        this.sliderLoad();
        this.checkboxLoad();
        this.MapRoom();
        this.SortTab();
    }
}