var geographic = new OpenLayers.Projection("EPSG:4326");
var mercator = new OpenLayers.Projection("EPSG:900913");

var world = new OpenLayers.Bounds(-180, -89, 180, 89).transform(
    geographic, mercator
);
var vienna_center = new OpenLayers.LonLat(105.843031, 21.005080).transform(
    geographic, mercator
);

var options = {
    projection: mercator,
    displayProjection: geographic,
    units: "m",
    maxExtent: world,
    maxResolution: 156543.0399
};

var map = new OpenLayers.Map("map", options);

var osm = new OpenLayers.Layer.Google("Google Streets");

map.addLayer(osm);

var vienna = new OpenLayers.Layer.WMS("MyMap",
                "http://localhost:8080/geoserver/BachKhoa/wms",
                { layers: "BachKhoa:BachKhoa", format: "image/png", transparent: true }
            );
map.addLayer(vienna);
map.setCenter(vienna_center, 8);
map.addControl(new OpenLayers.Control.LayerSwitcher());
//zeigt die Koordinaten der aktuellen Mause-Position an
map.addControl(new OpenLayers.Control.MousePosition());
