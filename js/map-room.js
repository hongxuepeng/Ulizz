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
    GetData:function() {
        this.loadMap();
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
    init:function () {
        this.GetData();
        this.sliderLoad();
    }
}