var Load  = function () {
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
    url:'http://47.106.83.149:8081/api',
    loadSwiper:function(){
        var that=this;
        $.ajax({
            url:this.url+'/adv/list',
            type:'GET',//GET
            async:true,//或false,是否异步,
            timeout:5000,//超时时间
            dataType:'json',
            data:{location:'1'},
            success:function(data){
                if(data.code=="0"){
                    var swiperHTML = template('SwiperHtml', data);
                    $("#swiperContent").html(swiperHTML);
                    that.initSwiper();
                }
            },
            error:function(){
                console.log('错误')
            }
        });
    },
    initSwiper:function(){
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
    ModalPhone:function () {
        $(document).bind("click", function (e) {
            if (!$(".phone-modal-menu").is(":hidden")) {
                if ($(e.target).closest(".phone-modal-left,.phone-modal-menu").length == 0) {
                    $(".phone-modal-menu").hide();
                }
            }
        });
        $(".phone-modal-left").click(function () {
            if($(".phone-modal-menu").is(":hidden")){
                $(".phone-modal-menu").show();
            }else{
                $(".phone-modal-menu").hide();
            }
        });
        $(document).on('click','.phone-modal-menu>li',function () {
            var key=$(this).attr("key");
            $(".phone-modal-left").text("（+"+key+"）");
            $(".phone-modal-menu").hide();
        });
    },
    Statistics:function () {
        var that = this;
        $(document).on('click','.swiper-slide',function () {
            var bannerID = $(this).attr("banner-id");
            var url = $(this).attr("data-url");
            $.ajax({
                url:that.url+'/adv/click',
                type:'POST',
                async:false,//或false,是否异步,
                timeout:5000,//超时时间
                dataType:'json',
                data:{id:bannerID},
                success:function(data){
                },
                error:function(){
                    console.log('错误')
                }
            });
            location.href = url;
        });
    },
    init:function () {
        this.loadMap();
        this.loadSwiper();
        this.mouseAnimate();
        this.BindHighlight();
        this.OpneModal();
        this.ShowSearch();
        this.HideSearch();
        this.ToDetail();
        this.ModalPhone();
        this.MapRoom();
        this.Statistics();
    }
}