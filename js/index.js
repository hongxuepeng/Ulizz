var Load  = function () {
    this.init();
};
Load.prototype = {
    featdata:'',
    GetData:function () {
        var that=this;
        $.get("json/data.json",function(res){
            that.featdata=res.features;
            that.loadMap();
        });
    },
    loadSwiper:function(){
        var swiper = new Swiper('.swiper-container', {
            autoHeight: true, //enable auto height
            loop:true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect : 'fade',
            autoplay:{
                delay:3000,
                stopOnLastSlide: false,
                disableOnInteraction: false
            }
        });
    },
    mouseAnimate:function () {
        $(document).on('mouseenter','.hot-item',function(){
            $(this).addClass('hot-item-active');
        });
        $(document).on('mouseleave','.hot-item',function(){
            $(this).removeClass('hot-item-active');
        });
    },
    loadMap:function () {
        mapboxgl.accessToken = 'pk.eyJ1IjoieHVlcGVuZ2hvbmciLCJhIjoiY2plcWpuMGllMGEzaTJwcDdoZGl3ZjIwYyJ9.1fVEnVymEmu89XLxUkCDSw';
        var geojson = {
            "type": "FeatureCollection",
            "features": this.featdata
        };
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-65.017, -16.457],
            zoom: 5
        });
        // add markers to allData
        geojson.features.forEach(function(marker) {
            var popup = new mapboxgl.Popup()
                .setHTML('<a class="mask-content" href="'+marker.properties.url+'" target="_blank"><img src="'+marker.properties.img+'"><div class="NameTips">纽约大学</div></a>');
            // create a DOM element for the marker
            var el = document.createElement('div');
            el.className = 'marker';
            el.innerHTML =marker.properties.money;
            el.addEventListener('click', function() {
                var chapterName={
                    center: marker.geometry.coordinates,
                    zoom: 8,
                    speed: 1.5
                }
                map.flyTo(chapterName);
            });
            // add marker to allData
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(popup) // sets a popup on this marker
                .addTo(map);
        });
    },
    adviser:function () {
        $(".adviser>li").hover(function(){
            $(this).find(".correct>img").removeClass();
            $(this).find(".opposite>img").removeClass();
            $(this).find(".correct>img").addClass("front");
            $(this).find(".opposite>img").addClass('after');
        },function(){
            $(this).find(".correct>img").removeClass();
            $(this).find(".opposite>img").removeClass();
            $(this).find(".correct>img").addClass("after");
            $(this).find(".opposite>img").addClass('front');
        });
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
    OpneModal:function () {
        $(".apply").click(function(){
            $("#MyModal").modal();
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
    ToDetail:function () {
        $(".hot-item").click(function () {
           location.href = "detail.html"
        });
    },
    MapRoom:function () {
        $(".search-right").click(function () {
           location.href="map-room.html";
        });
    },
    init:function () {
        this.GetData();
        this.loadSwiper();
        this.mouseAnimate();
        this.adviser();
        this.BindHighlight();
        this.OpneModal();
        this.ShowSearch();
        this.HideSearch();
        this.ToDetail();
        this.MapRoom();
    }
}