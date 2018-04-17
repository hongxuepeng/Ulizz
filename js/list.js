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
    init:function () {
        this.BindHighlight();
        this.ShowSearch();
        this.HideSearch();
        this.pageLoad();
        this.sliderLoad();
        this.checkboxLoad();
        this.MapRoom();
    }
}