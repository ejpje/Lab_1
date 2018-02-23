/*Script by Emily Pettit, 2018*/

//create the map
function createMap(){
  var map = L.map('map', {
    center: [42.0000, -95.7129],
    zoom: 3,
    minZoom: 2,
    maxZoom: 13,
  });

//add a tileset to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/ejp3/cjdkuejlj014j2solx6e6meqf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWpwMyIsImEiOiJjamRrZ2g2d2EwMGoxMndxejdwd2poMGFhIn0.Ypo-SnygyDT2skpNIEQ60g", {
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'> Streets tileset from Mapbox",
    minZoom: 2,
    maxZoom: 13,
  }) .addTo(map);

  //call getData function
  getData(map);
};


$(document).ready(createMap);
