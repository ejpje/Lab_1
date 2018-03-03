/*Script by Emily Pettit, 2018*/

//create the map
function createMap(){
  var map = L.map('map', {
    center: [42.0000, -103],
    zoom: 4,
    minZoom: 4,
    maxZoom: 7,
  });

//add a tileset to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWpwMyIsImEiOiJjamRrZ2g2d2EwMGoxMndxejdwd2poMGFhIn0.Ypo-SnygyDT2skpNIEQ60g", {
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'> Mapbox Dark, Fire data &copy; National Interagency Fire Center <a href='http://www.nifc.gov'>",
    minZoom: 4,
    maxZoom: 13,
  }) .addTo(map);

  //call getData function
  getData(map);
};

$(document).ready(createMap);
