/*Script by Emily Pettit, 2018*/

function calcPropRadius(attValue) {
  //scale factor to adjust symbol size evenly
  var scaleFactor = 50;
  //area based on attribute value and scale factor
  var area = attValue * scaleFactor;
  //radius calculated based on area
  var radius = (Math.sqrt(area/Math.PI))*(.1);

  return radius;
};

//add circle markers for point features to the map
function createPropSymbols(data, map){
  //determine attribute to visualize with proportional symbols
  var attribute = "wildFires_2017";

  //create marker options
  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff3300",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  //create a Leaflet GeoJSON layer and add it to the map
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      //determine the value for each feature
      var attValue = Number(feature.properties[attribute]);

      //give each feature's circle marker a radius
      geojsonMarkerOptions.radius = calcPropRadius(attValue);

      //create circle markers
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  }).addTo(map);
};

//import GeoJSON data
function getData(map){
  //load the data
  $.ajax("data/Fires.geojson", {
    dataType: "json",
    success: function(response){
      //call function to create proportional symbols
      createPropSymbols(response, map);
    }
  });
};
