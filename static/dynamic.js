var L_LIST = d3.select("#locations");
//console.log(Location)
L_LIST.on("click", handleChange_01 );
var ProjectList;

function handleChange_01 (d){
    console.log("A button was clicked!");
    console.log(document.getElementById("locations").value);
    var V_List = document.getElementById("locations").value;
    console.log(V_List)
    $.ajax(
        { 
            url: "/ziptomap",
            data: V_List,
            type: 'POST',
            body: JSON.stringify({"greeting": "Hello from the browser!"})

        }).then(function (response) {
            //console.log('POST response: ', response);
            //document.getElementById('jsonProject').value = response;
            var i;
           ProjectList = JSON.parse(response);
            
            for (i = 0; i < ProjectList.length; i++) 
                { 
                    console.log(ProjectList[i]);
                    placeMarker(ProjectList[i])
                }; 
            // yyy(response);
            //return response;
        });
        // .then (yyy(response))
  }

  
function populateLocations(inArray){
    //console.log(dateArray);
    //console.log(inArray)
    
    for (var i=1; i < inArray.length;++i){
       console.log(inArray[i]);
       addOption("locations", inArray[i].postal_code, inArray[i].postal_code);
    }
}

function addOption(selectElement,text,value )
    {var optn = document.createElement("OPTION");
        var xxx = document.getElementById(selectElement)
        optn.text = text;
        optn.value = value;
        xxx.options.add(optn);
        
    }

function getUniqueValues (inArray, inValue){
        var ArrLength = inArray.length;
        var dataReturn = [];
        var ReturnResult = [];
        dataReturn.length = ArrLength;
        //console.log(dataReturn.length);
        //console.log(inValue);
            for (var j = 0; j < ArrLength; j++) {
              var newArrayEntry = inArray[j][inValue];
              //console.log(newArrayEntry);
              dataReturn.push(newArrayEntry);
              ReturnResult = Array.from(new Set(dataReturn));
            }  
        //console.log(ReturnResult);
        return ReturnResult 
      
    }

    /////////////////////////////
function yyy(inValue) {
        //var B_call = document.getElementById('jsonProject').value;
        var B_call = inValue;
        console.log ('This is the location  ',JSON.parse(B_call));   
        var JsonLoc = JSON.parse(B_call); 
        var location = JsonLoc[0];
        console.log(location.latitude, location.longitude );
        L.marker([location.latitude, location.longitude]).bindPopup("<h6>Project Name: " + 
        location.name + "<hr>" +
        location.value + "<br/>" +
        location.city + "<br/>" +
        location.county +", " + location.state  +       
        "</h6>")
        .addTo(myMap);
        
        
    }
//   );
    /////////////////////////////
    function placeMarker(inValue) {
        //var B_call = document.getElementById('jsonProject').value;
        //var B_call = inValue;
        //console.log ('This is the location  ',JSON.parse(B_call));   
        //var JsonLoc = JSON.parse(B_call); 
        var location = inValue;
        console.log(location.latitude, location.longitude );
        L.marker([location.latitude, location.longitude]).bindPopup("<h6>Project Name: " + 
        location.name + "<hr>" +
        location.value + "<br/>" +
        location.city + "<br/>" +
        location.county +", " + location.state  +       
        "</h6>")
        .addTo(myMap);
        
        
    }

    
//   );  
// }
//populateDate(getUniqueValues(tableData,"postal_code"));
//populateLocations(inArray)
function issues_chart() {
    d3.json("issues_data.json").then(function(data){
        console.log(data)
        
    });
}