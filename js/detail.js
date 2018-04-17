var Load  = function() {
    this.init();
};
Load.prototype = {
    featdata:'',
    GetData:function() {
        var that=this;
        $.get("json/data.json",function(res){
            that.featdata=res.features;
            that.loadMap();
        });
    },
    loadSwiper:function() {
        new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            touchRatio: 0.2,
            loop: true,
            loopedSlides: 5, //looped slides should be the same
            slideToClickedSlide: true,
            navigation: {
                nextEl: '.nav-next',
                prevEl: '.nav-prev',
            },
            on: {
                slideChangeTransitionEnd: function () {
                    var thisIndex = $(".swiper-slide-active").attr("data-swiper-slide-index");
                    $(".gallery-item[data-index=" + thisIndex + "]").addClass("gallery-active").siblings().removeClass("gallery-active");
                },
            },
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false
            }
        });
        var galley = document.getElementById('galley');
        var viewer = new Viewer(galley, {
            tooltip: false,
            viewed: function () {
                var alt = $(".viewer-canvas>img").attr("alt");
                if (alt == "1") {
                    $(".viewer-loading").addClass("viewer-none");
                }

            }
        });
        $(".play").click(function () {
            $(this).prev("img").click();
        });
    },
    loadMap:function() {
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
    pageLoad:function() {
        var GG = {
            "kk": function (mm) {
                console.log(mm);
            }
        }
        $("#page").initPage(100, 1, GG.kk);
    },
    score:function() {
        $(".atar_Show p").each(function (index, element) {
            var num = $(this).attr("tip");
            var width = num * 2 * 16;//
            $(this).css("width", width);
        });
        scoreFun($("#startone"));
    },
    navControl:function () {
        var navHeight = $("#navHeight").offset().top;
        var navFix = $("#nav-wrap");
        $(window).scroll(function () {
            if ($(this).scrollTop() > navHeight) {
                navFix.addClass("navFix");
            }
            else {
                navFix.removeClass("navFix");
            }
        });
        new navScroll({
            nav: {                  //导航跳转功能，不需要可以删除此代码块
                id: 'nav-wrap',   //点击跳转到容器的导航ID 请把 ID 设置给 UL
                current: 'current', //默认点击A链接后，默认样式名
                speed: 25,          //动画执行速度，越小则越快。反之，越慢。
                fixPx: 50            //在导航使用绝对定位且在窗口上方，容器与导航的差,默认为0
            }
        });
    },
    tabItem:function () {
        $(".box-tab-item").click(function () {
            $(this).addClass("box-tab-active").siblings().removeClass("box-tab-active");
            var tab = $(this).attr("tabindex");
            $(".box-content>#tab" + tab).show().siblings().hide();
        });
    },
    LoadCheckbox:function () {
        $('.evaluate-form input').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            increaseArea: '20%'
        });
    },
    collet:function () {
        $(".collet").click(function () {
            $(this).addClass("collet-active");
            $(this).find("span").text("已收藏");
        });
    },
    loginModal:function () {
        $(".evaluate-btn").click(function () {
            $("#LoginModal").modal();
        });
    },
    reserve:function () {
        $(".reserve").click(function () {
           location.href="place-order.html";
        });
    },
    init:function() {
        this.loadSwiper();
        this.pageLoad();
        this.score();
        this.navControl();
        this.tabItem();
        this.LoadCheckbox();
        this.collet();
        this.loginModal();
        this.GetData();
        this.reserve();
    }
}