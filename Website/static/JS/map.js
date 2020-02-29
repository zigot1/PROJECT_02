
//Mapbox characteristics

let boundaries = [
    [85.051129, -200], // East coordinates
    [-85.051129,190] // Northeast coordinates
    ];

let myMap = L.map("map", {
  center: [40.73,-74.0059],
  zoom: 13,
  maxBounds: boundaries
});
let WWWW;
// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(myMap);


function map_drop() {
    //Create universal selection in function
    let selected_value = d3.select("#site-drop").node().value;
    //========================================================================
    //Import json file
    d3.json('static/JS/projects.json', function(err, data) {
        if (err) console.log("Trouble loading data.");
        // console.log(data);
       
        function append_drop(value) {

            let selection = d3.select("#site-drop");
            
            //clears exist values in dropdown list
            selection.html(" ");

            value.forEach((n) => {
                console.log(n.postal_code);
                let options = selection.append("option");
                    options.text(n.postal_code);
            });

            //========================================================================
            //function to populate info box
            function info_box(data) {
                console.log(data);

                let info_selection = d3.select("#list-info");

                info_selection.html(" ");

                Object.entries(data).forEach(([key, info]) => {

                    if (info.postal_code === selected_value) {
                        console.log(info.postal_code);
                        let site_ul = info_selection.append("ul");
                        Object.entries(info).forEach(([key, value]) => {
                            let site_li = site_ul.append("li");
                            site_li.text([key + ": " + value]);
                        });
                    }
                });
            }
            info_box(data);
            //========================================================================

        }
        //append data into list
        append_drop(data);
    });
}

let site_select = d3.select("#site-drop").node().value;

function filter_site(value) {
    // console.log(value);
    map_drop();
}

filter_site(site_select);