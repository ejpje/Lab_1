/*Script by Emily Pettit, 2018*/
var map = L.map('map', {
  center: [41.66, -91.53],
  zoom: 12,
  minZoom: 3,
  maxZoom: 13,
})

var street = L.tileLayer("https://api.mapbox.com/styles/v1/ejp3/cjdku7n67019b2qpdvw0i6xr6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWpwMyIsImEiOiJjamRrZ2g2d2EwMGoxMndxejdwd2poMGFhIn0.Ypo-SnygyDT2skpNIEQ60g", {
  attribution: "Mapbox, 'North Star' style.",
  minZoom: 3,
  maxZoom: 13,
}) .addTo(map);
