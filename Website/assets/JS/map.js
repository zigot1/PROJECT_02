// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [40.73,-74.0059],
  zoom: 13
});
var WWWW;
// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// var W_call = "http://api.openweathermap.org/data/2.5/find?lat=40.73&lon=-74.0059&cnt=10" +
//          "&APPID=" + WAPI_KEY;

var B_call = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";


         
d3.json(B_call, function(response) {

          //console.log(response);
          //console.log(response.count);
          console.log(response.data.stations.length);
          for (var i = 0; i < response.data.stations.length; i++) {
            //console.log("This is my response ", response.list[i], " ...", i);
            WWWW= response;
            var location = response.data.stations[i];
            console.log(location);
            if (location) {
              console.log(location.lat);
              //console.log(location.coord[0]);
              L.marker([location.lat, location.lon]).addTo(myMap);
            }
          }
});
