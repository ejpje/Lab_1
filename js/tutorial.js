/*create the map area to display*/
var map = L.map('map', {
  center: [41.66, -91.53],
  zoom: 12,
  minZoom: 3,
  maxZoom: 13,
})

/*connect to a style tileset layer to display in the map*/
var street = L.tileLayer("https://api.mapbox.com/styles/v1/ejp3/cjdku7n67019b2qpdvw0i6xr6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWpwMyIsImEiOiJjamRrZ2g2d2EwMGoxMndxejdwd2poMGFhIn0.Ypo-SnygyDT2skpNIEQ60g", {
  attribution: "Mapbox, 'North Star' style.",
  minZoom: 3,
  maxZoom: 13,
}) .addTo(map);

/*place a marker on the map*/
var marker = L.marker([41.66, -91.53]).addTo(map);

/*place a circle on the map*/
var circle = L.circle([41.661, -91.55], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

/*place a polygon on the map*/
var polygon = L.polygon([
    [41.65, -91.54],
    [41.65, -91.50],
    [41.67, -91.53]
]).addTo(map);

/*create a popup on the map*/
marker.bindPopup("<b>Hello world!</b><br>Welcome to Iowa City.").openPopup();
circle.bindPopup("Home-ish.");
polygon.bindPopup("Most residents live in here.");

/*set up a separate popup*/
var popup = L.popup()
    .setLatLng([41.68, -91.59])
    .setContent("Coralville is over here.")
    .openOn(map);

/*set up alert on clicking the map*/
function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);

//////////////////////////
/*geoJSON tutorial code*/
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

/*add features*/
L.geoJSON(geojsonFeature).addTo(map);
/*or use the below bit to add feature*/
var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];
/*or to create an empty field for later fill:*/
var myLayer = L.geoJSON().addTo(map);
myLayer.addData(geojsonFeature);

/*style all paths the same way*/
var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

L.geoJSON(myLines, {
    style: myStyle
}).addTo(map);

/*style individual features based on a property*/
var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}];

L.geoJSON(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
}).addTo(map);

/*create a point marker*/
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

L.geoJSON(someGeojsonFeature, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);

/*open a popup when a feature is clicked*/
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(map);

/*filter features on a map using true/false*/
var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": true /*this will show up on the map*/
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": false /*this will not show up on the map*/
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.98404, 39.74621]
    }
}];

L.geoJSON(someFeatures, {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    }
}).addTo(map);
