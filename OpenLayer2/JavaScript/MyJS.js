//var map;
//function init() {
//    // allow testing of specific renderers via "?renderer=Canvas", etc
//    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
//    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

//    //Defining projections
//    var geographic = new OpenLayers.Projection("EPSG:4326");
//    var mercator = new OpenLayers.Projection("EPSG:900913");
//    var center = new OpenLayers.LonLat(105.843031, 21.005080).transform(
//            geographic, mercator
//        );
//    //map = new OpenLayers.Map({
//    //    div: "map",
//    //    center: center,
//    //    zoom: 11
//    //});

//    var options = {
//        projection: mercator,
//        displayProjection: geographic,
//        units: "m"
//    };
//    //Defining main variables
//    var map = new OpenLayers.Map({div:"map", options, center:center,zoom:11});

//    var Layer1 = new OpenLayers.Layer.Google("Google Streets");
//    var Layer2 = new OpenLayers.Layer.WMS("MyMap",
//                "http://localhost:8080/geoserver/BachKhoa/wms",
//                { layers: "BachKhoa:BachKhoa", format: "image/png", transparent: true }
//            );

//    map.addLayers([Layer1, Layer2]);
//}


var map;

function init() {
    var BachKhoa = new OpenLayers.Layer.WMS("Bách Khoa",
                "http://localhost:8080/geoserver/BachKhoa/wms",
                { layers: "BachKhoa:BachKhoa", format: "image/png", transparent: true }
            );

    map = new OpenLayers.Map('map', {
        projection: 'EPSG:3857',
        layers: [
            new OpenLayers.Layer.Google(
                "Google Streets", // the default
                { numZoomLevels: 20 }
            ),
            new OpenLayers.Layer.Google(
                "Google Hybrid",
                { type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20 }
            ),
            new OpenLayers.Layer.Google(
                "Google Satellite",
                { type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22 }
            ),
            BachKhoa
        ],
        center: new OpenLayers.LonLat(105.844858, 21.004709)
            // Google.v3 uses web mercator as projection, so we have to
            // transform our coordinates
            .transform('EPSG:4326', 'EPSG:3857'),
        zoom: 17
    });
    

    info = new OpenLayers.Control.WMSGetFeatureInfo({
        url: 'http://localhost:8080/geoserver/BachKhoa/wms',
        title: 'Identify features by clicking',
        queryVisible: true,
        eventListeners: {
            getfeatureinfo: function (event) {
                $("#info").html(event.text);
            }
        }
    });

    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);

    var size = new OpenLayers.Size(21, 25);
    var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
    var icon = new OpenLayers.Icon('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png', size, offset);
    //markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(105.844858, 21.003709).transform('EPSG:4326', 'EPSG:3857'), icon));


    //var halfIcon = icon.clone();
    //markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(105.844858, 21.003709).transform('EPSG:4326', 'EPSG:3857'), halfIcon));

    //marker = new OpenLayers.Marker(new OpenLayers.LonLat(105.844858, 21.004709).transform('EPSG:4326', 'EPSG:3857'), icon.clone());
    //markers.events.register('mousedown', marker, function (evt) { alert(this.icon.url); OpenLayers.Event.stop(evt); });
    //markers.addMarker(marker);


    
    map.addControl(info);
    info.activate();

    map.addControl(new OpenLayers.Control.LayerSwitcher());
}

function addMarker(name, lat, lon, intro, url) {
    markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lon, lat).transform('EPSG:4326', 'EPSG:3857'), icon));
    markers.events.register('mousedown', marker, function (evt) {
        var popup = new OpenLayers.Popup.FramedCloud("tempId", new OpenLayers.LonLat(lon, lat).transform('EPSG:4326', 'EPSG:3857'),
               null,
               "Name: " + name + "<br/>Latitude: " + lat + "<br/>Longitude: " + lon + "<br/>Giới thiệu: " + intro,
               null, true);
        map.addPopup(popup);
        OpenLayers.Event.stop(evt);
    });
    
}