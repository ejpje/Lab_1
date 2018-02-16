/*Script by Emily Pettit, 2018*/
/*GeoJSON Map*/

function createMap(){
  var map = L.map('map', {
    center: [37.0902, -95.7129],
    zoom: 4,
    minZoom: 2,
    maxZoom: 13,
  })

  var street = L.tileLayer("https://api.mapbox.com/styles/v1/ejp3/cjdku7n67019b2qpdvw0i6xr6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWpwMyIsImEiOiJjamRrZ2g2d2EwMGoxMndxejdwd2poMGFhIn0.Ypo-SnygyDT2skpNIEQ60g", {
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'> Mapbox, 'North Star' style",
    minZoom: 2,
    maxZoom: 13,
  }) .addTo(map);

    getData(map);
};

  //function to retrieve the data and place it on the map
  function getData(map){
      //load the data
      $.ajax("data/natl_parks.geojson", {
          dataType: "json",
          success: function(response){

            var geojsonMarkerOptions = {
              radius: 8,
              fillColor: "#006600",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8,
            };

              //create a Leaflet GeoJSON layer and add it to the map
              L.geoJson(response, {
                pointToLayer: function (feature, latlng){
                  return L.circleMarker(latlng, geojsonMarkerOptions);
                }
            }).addTo(map);
          }
      });
  };

  $(document).ready(createMap);
