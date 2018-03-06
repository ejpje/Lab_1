/*Script by Emily Pettit, 2018*/
//put statesData into a layer group
var choropleth = L.layerGroup(statesData);

//specify basemap layers
var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWpwMyIsImEiOiJjamRrZ2g2d2EwMGoxMndxejdwd2poMGFhIn0.Ypo-SnygyDT2skpNIEQ60g", {attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'> Mapbox Light"}),
    streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWpwMyIsImEiOiJjamRrZ2g2d2EwMGoxMndxejdwd2poMGFhIn0.Ypo-SnygyDT2skpNIEQ60g", {attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'> Mapbox Streets"});

//create the map
function createMap(){
  var map = L.map('map', {
    center: [42.0000, -103],
    zoom: 4,
    minZoom: 4,
    maxZoom: 7,
    layers: [light, choropleth]
  });

  //add a tileset to the map
  var baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWpwMyIsImEiOiJjamRrZ2g2d2EwMGoxMndxejdwd2poMGFhIn0.Ypo-SnygyDT2skpNIEQ60g", {
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'> Mapbox Dark, Fire data &copy; National Interagency Fire Center <a href='http://www.nifc.gov'>",
    minZoom: 4,
    maxZoom: 13,
  }) .addTo(map);

  //add baselayer tilesets to the map
  var baseMaps = {
    "Light": light,
    "Streets": streets,
    "Dark": baseLayer,
  };

  var overlayMaps = {
    "Choropleth": choropleth
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);

//specify choropleth value colors
function getColor(d) {
  return  d > 10000 ? "#a63603" :
          d > 5000 ? "#e6550d" :
          d > 1000 ? "#fd8d3c" :
          d > 500 ? "#fdbe85" :
          d > 100 ? "#feedde" :
                    "#ffffff";
}

//set style based on a properties layer
function style(feature) {
  return {
    fillColor: getColor(feature.properties.wildFires_2010),
    weight: 2,
    opacity: 1,
    color: "grey",
    fillOpacity: 1
  };
}

/*//set style for mouse hover
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#1111",
    fillOpacity: 1
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  info.update(layer.feature.properties);
}

//set style on mouseoff
function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

//enable zoom to clicked feature
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}
/*
//enable highlight styles
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

//create information popups
var info = L.control();

info.onAdd = function(map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

//method to update the control based on feature properties
info.update = function(props) {
  this._div.innerHTML = "<h4>Wildfires</h4>" + (props ? "<b>" + props.name + "</b><br />" + props.wildFires + "in" : "Hover over a state");
};

info.addTo(map);

var legend = L.control({position: "bottomright"});

legend.onAdd = function (map) {

  var div = L.DomUtil.create("div", "info-legend"),
  grades = [100, 500, 1000, 5000, 100000]
  labels = [];

  //loop through fire intervals and generate labels
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
    "<i style='background:" + getColor(grades[i] + 1) + "'></i> " + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }
  return div;
};
legend.addTo(map);

geojson = L.geoJson(statesData, {
}).addTo(map);*/

//call getData function
  getData(map);
};

$(document).ready(createMap);
