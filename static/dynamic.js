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

//populateDate(getUniqueValues(tableData,"postal_code"));
//populateLocations(inArray)
