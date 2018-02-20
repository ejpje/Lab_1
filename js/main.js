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

//function to convert markers to circle markers
function pointToLayer(feature, latlng){
  //determine attribute to visualize with proportional symbols
  var attribute = "wildFires_2017";

  //create marker options
  var options = {
    radius: 8,
    fillColor: "#ff3300",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  //determine each feature's value for the selected attribute
  var attValue = Number(feature.properties[attribute]);

  //give each feature's circle marker a radius based on its attribute
  options.radius = calcPropRadius(attValue);

  //create circle marker layer
  var layer = L.circleMarker(latlng, options);

  //build popup content string
  var popupContent = "<p><b>State:</b> " + feature.properties.State + "</p>";

  //add formatted attribute to popup content string
  var year = attribute.split("_")[1];
  popupContent += "<p><b>Burned in " + year + ":</b> " + feature.properties[attribute] + " acres</p>";

  //bind the popup to the circle marker
  layer.bindPopup(popupContent, {
    offset: new L.Point(0, -options.radius)
  });

  //event listeners to open popup on mouse hover
  layer.on({
    mouseover: function(){
      this.openPopup();
    },
    mouseout: function(){
      this.closePopup();
    },
    click: function(){
      $("#panel").html(popupContent);
    }
  });

  //return the circle marker to the L.geoJson pointToLayer option
  return layer;
};

//add circle markers for point features to the map
function createPropSymbols(data, map){
  //create a Leaflet GeoJSON layer and add it to the map
  L.geoJson(data, {
    pointToLayer: pointToLayer
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

//create sequence controls
function createSequenceControls(map){
  //create slider
  $('#panel').append('<input class="range-slider" type="range">');

  //set slider attributes
  $('.range-slider').attr({
    max: 7,
    min: 0,
    value: 0,
    step: 1
  });

  $("#panel").append("<button class='skip' id='reverse'>Reverse</button>");
  $("#panel").append("<button class='skip' id='forward'>Skip</button>");

  $("#reverse").html("<img src='img/reversearrow.svg'>");
  //icon courtesy of Wikimedia Commons and Font Awesome (fortawesome.github.com/Font-Awesome/Font-Awesome)
  $("#forward").html("<img src='img/forwardarrow.svg'>");
  //icon courtesy of Wikimedia Commons and Font Awesome (fortawesome.github.com/Font-Awesome/Font-Awesome)
};

//import GeoJSON data
function getData(map){
  //load data
  $.ajax("data/Fires.geojson", {
    dataType: "json",
    success: function(response){

      createPropSymbols(response, map);
      createSequenceControls(map);

    }
  });
};
