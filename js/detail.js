var Load  = function() {
    this.init();
};
Load.prototype = {
    list:[
        {
            "latitude":"51.4052",
            "longitude":"-0.299754",
            "url":"//cdn.student.com/media/cache/property_preview_mobile/mstr/country/united-kingdom/city/london/property/mansion-waterside/image-p70kst.jpeg",
            "name":"金斯顿大学Knights Park校区",
            "price":"£249"
        },
        {
            "latitude":"51.4035",
            "longitude":"-0.303725",
            "url":"//cdn.student.com/media/cache/property_preview_mobile/mstr/country/united-kingdom/city/london/property/bowden-court/image-p42llr.jpeg",
            "name":"金斯顿大学伦敦校区",
            "price":"£267"
        },
        {
            "latitude":"51.4334",
            "longitude":"-0.26275",
            "url":"//cdn.student.com/media/cache/property_preview_mobile/mstr/country/united-kingdom/city/london/property/studyo-paddington/image-olhz3v.jpeg",
            "name":"金斯顿大学（Kingston Hill校区）",
            "price":"£236"
        },
        {
            "latitude":"51.4373",
            "longitude":"-0.25095",
            "url":"//cdn.student.com/media/cache/property_preview_mobile/mstr/country/united-kingdom/city/london/property/go-native-mayfair/image-o79h10.jpeg",
            "name":"金斯顿大学（Roehampton Vale校区）",
            "price":"£252"
        },
        {
            "latitude":"51.5017",
            "longitude":"0.00575338",
            "url":"//cdn.student.com/media/cache/property_preview_mobile/mstr/country/united-kingdom/city/london/property/paris-gardens/image-p5zivf.jpeg",
            "name":"雷文斯本学院",
            "price":"£362"
        },
        {
            "latitude":"51.5164",
            "longitude":"-0.07302",
            "url":"//cdn.student.com/media/cache/property_preview_mobile/mstr/country/united-kingdom/city/london/property/urbanest-tower-bridge/image-o6i73c.jpeg",
            "name":"霍特国际商学院伦敦校区（本科生）",
            "price":"£215"
        },
        {
            "latitude":"51.5212",
            "longitude":"-0.115201",
            "url":"//cdn.student.com/media/cache/property_preview_mobile/mstr/country/united-kingdom/city/london/property/landale-house/image-p70kqh.jpeg",
            "name":"霍特国际商学院伦敦校区（研究生）",
            "price":"£255"
        },
        {
            "latitude":"51.5184",
            "longitude":"-0.0725624",
            "url":"//cdn.student.com/media/cache/property_preview_mobile/mstr/country/united-kingdom/city/london/property/1-dawes-houe/image-ov4nhk.jpeg",
            "name":"马兰欧尼学院",
            "price":"£245"
        },
        {
            "latitude":"51.5176",
            "longitude":"-0.0779877",
            "url":"//cdn.student.com/media/cache/property_preview_mobile/mstr/country/united-kingdom/city/london/property/urbanest-st-pancras/image-ogm0tx.jpeg",
            "name":"考文垂大学伦敦校区",
            "price":"£375"
        },
        {
            "latitude":"51.4574",
            "longitude":"-0.245021",
            "url":"//cdn.student.com/media/cache/property_preview_mobile/mstr/country/united-kingdom/city/london/property/francis-gardner/image-otdnsh.jpeg",
            "name":"罗汉普顿大学",
            "price":"£275"
        }
    ],
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
        var normalMap = L.tileLayer.chinaProvider('Google.Normal.Map', {
                maxZoom: 18,
                minZoom: 5
            }),
            satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', {
                maxZoom: 18,
                minZoom: 5
            });
        var baseLayers = {
            "地图": normalMap,
            "影像": satelliteMap,
        }
        var overlayLayers = {}
        var map = L.map("map", {
            center: [51.4574, -0.245021],
            zoom: 11,
            layers: [normalMap],
            zoomControl: false
        });
        L.control.layers(baseLayers, overlayLayers).addTo(map);
        var list = this.list;
        for(var i=0;i<list.length;i++){
            var markerHtml="<a class='map-section' href='detail.html'>" +
                "<img src='"+list[i].url+"'/>" +
                "<div class='map-tips'>"+list[i].name+"</div>" +
                "<div class='map-price'>" +
                "<span class='current-price'>"+list[i].price+"</span> 起 每周" +
                "</div>" +
                "</a>"
            L.marker([list[i].latitude, list[i].longitude]).addTo(map).bindPopup(markerHtml);
        }
        L.control.zoom({
            zoomInTitle: '放大',
            zoomOutTitle: '缩小'
        }).addTo(map);
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
        $(".carousel-place>a").click(function () {
           location.href="map-room.html";
        });
    },
    loginModal:function () {
        $(".evaluate-btn").click(function () {
            $("#LoginModal").modal();
        });
        $(document).on('click','.view-matching',function () {
            $("#matching").modal();
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
        this.loadMap();
        this.reserve();
    }
}