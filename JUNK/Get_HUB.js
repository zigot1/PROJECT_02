
let jsondata
var myHeaders = new Headers();
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJ1c2VyaWQiOiIyMDA4MTExODA1MDUzOTgiLCJleHAiOjE1ODIzOTE1NzcsInNjb3BlIjpbImRhdGE6Y3JlYXRlIiwiZGF0YTp3cml0ZSIsImRhdGE6cmVhZCJdLCJjbGllbnRfaWQiOiJja21mc2ZnMTNyRUN2VnNsRzZ5bmt4TVlKaXJGemdpTiIsImdyYW50X2lkIjoiSnB3VTREMFlrdEx3d2tMSm0xcDZnYzR3QnJRendpZXgiLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvand0ZXhwNjAiLCJqdGkiOiJ3Uk5VZW1EM09wZW9iRjlBSXF2VExZQmRiQ3lzZjFCVkU2SGhYNzZZcWFjODI3T0ZVTDk2R1pWRW5XbjdORm0zIn0.RWRrXGigJFl7XPbZQsYlM2ojYxkkPQj8wZ72fKaIKoI");
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://developer.api.autodesk.com/project/v1/hubs", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));



// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJ1c2VyaWQiOiIyMDA4MTExODA1MDUzOTgiLCJleHAiOjE1ODIzNDcyNDAsInNjb3BlIjpbImRhdGE6Y3JlYXRlIiwiZGF0YTp3cml0ZSIsImRhdGE6cmVhZCJdLCJjbGllbnRfaWQiOiJja21mc2ZnMTNyRUN2VnNsRzZ5bmt4TVlKaXJGemdpTiIsImdyYW50X2lkIjoiVmE0RmNFdVlVclhjTFdPMWp3WDVaTlpkZTVNZEZkaUEiLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvand0ZXhwNjAiLCJqdGkiOiI2TnhXTmxLODZ5S2xwNXdVaVZWVGNrcjRwSlFOaDVYMmZVTlo5VFlRdmlINTdwZmVSSGZ5MTY1V3h6RWV3cm82In0.HhXwv_Ejx3yM8RUIiRyIqFUEB00v8189aISbRdx2ng8");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://developer.api.autodesk.com/project/v1/hubs/b.49df69ab-c266-4d49-951c-031b16f7a31f/projects", requestOptions)
  .then(function(u){ return u.json();})
  .then(function(json){jsondata = json;})
  .then(response => response.text())
  .then(result => console.log(result))
  .then(data => obj = data)
  .then(() => console.log(obj))
  .catch(error => console.log('error', error));


  
function parseProjects (response) 
{
    //console.log(response);
    //console.log(response.count);
    console.log(response.data.length);
    for (var i = 0; i < response.data.length; i++) {
      //console.log("This is my response ", response.list[i], " ...", i);
      WWWW= response;
      var ProjectID = response.data[i].id;
      var ProjectName = response.data[i].attributes.name
      var ProjectIssues = response.data[i].relationships.issues.data.id
      console.log(ProjectID, '_____', ProjectName, '____Issues____', ProjectIssues);
      // if (location) {
      //   console.log(location.lat);
      //   //console.log(location.coord[0]);
      //   L.marker([location.lat, location.lon]).addTo(myMap);
      // }
    }
};  