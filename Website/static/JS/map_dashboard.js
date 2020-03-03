//import data

let clayco_json = "static/JS/new_projects.json";

d3.json(clayco_json, function(data){
    console.log(data);
    Object.entries(data).forEach(([key,value]) => {
        console.log(value.id);
        site_popup(value);
    });
    
});

function site_popup(site_data) {
    console.log(site_data);


    // console.log(site_marker);


    
    // console.log(lat_lng);

    let site_marker = L.marker([site_data.latitude, site_data.longitude]);



    let dark_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    let sat_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    let sites = L.layerGroup(site_marker);

    let base = {
        "Dark Map": dark_map,
        "Street Map": sat_map
    };

    overlay = {
        "Sites": sites
    };

    let boundaries = [
        [85.051129, -200], // East coordinates
        [-85.051129,190] // Northeast coordinates
        ];
    

    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 2,
        layers: [dark_map, sites],
        maxBounds: boundaries
    });

    L.control.layers(base, overlay, {
        collapsed: true
    }).addTo(myMap);



}