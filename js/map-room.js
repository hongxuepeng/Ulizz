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