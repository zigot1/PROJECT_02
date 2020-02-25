const token = pm.environment.get('FORGE_TOKEN');
const expires = pm.environment.get('TOKEN_EXPIRES_AT');
const client_ID = 'ckmfsfg13rECvVslG6ynkxMYJirFzgiN';
const client_Secret = 'tMhT8f69e2gja8RV'


function getHubs(tokenSession, res) {
    // # stands for ROOT
    var hubs = new forgeSDK.HubsApi();
  
    hubs.getHubs({}, tokenSession.getInternalOAuth(), tokenSession.getInternalCredentials())
     .then(function (data) {
     var hubsForTree = [];
     data.body.data.forEach(function (hub) {
      var hubType;
  
      switch (hub.attributes.extension.type) {
       case "hubs:autodesk.core:Hub":
        hubType = "hubs";
        break;
       case "hubs:autodesk.a360:PersonalHub":
        hubType = "personalHub";
        break;
       case "hubs:autodesk.bim360:Account":
        hubType = "bim360Hubs";
        break;
      }
  
      hubsForTree.push(prepareItemForTree(
       hub.links.self.href,
       hub.attributes.name,
       hubType,
       true
      ));
     });
     res.json(hubsForTree);
    })
    .catch(function (error) {
     console.log(error);
     res.status(500).end();
    });
  }

  ////Get Project Call
  function getProjects(hubId, oauthClient, credentials, res) {
    var projects = new forgeSDK.ProjectsApi();
   
    projects.getHubProjects(hubId, {}, oauthClient, credentials)
     .then(function (projects) {
      var projectsForTree = [];
      projects.body.data.forEach(function (project) {
       var projectType = 'projects';
       switch (project.attributes.extension.type) {
        case 'projects:autodesk.core:Project':
         projectType = 'a360projects';
         break;
        case 'projects:autodesk.bim360:Project':
         projectType = 'bim360projects';
         break;
       }
   
       projectsForTree.push(prepareItemForTree(
        project.links.self.href,
        project.attributes.name,
        projectType,
        true
       ));
      });
      res.json(projectsForTree);
     })
     .catch(function (error) {
      console.log(error);
      res.status(500).end();
     });
   }

///Forge Authenticate
apiInstance.authenticate().then(function (oauth) {
    s.tokenpublic = oauth;
    callback(s.tokenpublic);
   });
////Get Forge Token


function connectForge() {
if (token && expires > (new Date()).getTime()) {
    console.log('Found valid token.');
} else {
    const options = {
        url: pm.environment.get('https://developer.api.autodesk.com') + '/authentication/v1/authenticate',
        method: 'POST',
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
            mode: 'urlencoded',
            urlencoded: [
                {
                    key: "grant_type",
                    value: "client_credentials",
                    disabled: false
                },
                {
                    key: "client_id",
                    value: pm.environment.get("ClientID"),
                    disabled: false
                },
                {
                    key: "client_secret",
                    value: pm.environment.get("ClientSecret"),
                    disabled: false
                },
                {
                    key: "scope",
                    value: pm.environment.get("HUB_SCOPE"),
                    disabled: false
                }
            ]
        }
    };
    pm.sendRequest(options, function(err, res) {
        if (err) {
            console.error(err);
        } else {
            console.log('Updating token and expiration time.');
            const resp = res.json();
            console.log('Response', resp);
            pm.environment.set('FORGE_TOKEN', resp.access_token);
            const expiry = new Date();
            expiry.setSeconds(expiry.getSeconds() + resp.expires_in);
            pm.environment.set('TOKEN_EXPIRES_AT', expiry.getTime());
        }
    });
}
}

connectForge()

//......

//pop out oAuth log in dialog
function startoAuth()
{   

  var url =
    "https://developer.api.autodesk.com" +
    '/authentication/v1/authorize?response_type=code' +
    '&client_id=' + config.credentials.client_id +
    '&redirect_uri=' + config.callbackURL +
    '&scope=' + config.scope.join(" ");
  
  //pop out the dialog of use login and authorization 
    opn(url, function (err) {
      if (err) throw err;
      console.log('The user closed the browser');
  }); 
}

//callback endpoint
router.get('/forgeoauth',function(req,res){

  //Authorization Code
  var code = req.query.code;

  var forge3legged = new forgeSDK.AuthClientThreeLegged(
    config.credentials.client_id,
    config.credentials.client_secret,
    config.callbackURL,
    config.scope);

  forge3legged.getToken(code).then(function (tokenInfo) { 
    //write token and refresh token to a file 
    writeTokenFile(tokenInfo);    
    res.redirect('/')
  }).catch(function (err) {
    console.log(err);
    res.redirect('/')
  });
  
}); 


module.exports = {
  router:router,
  startoAuth:startoAuth 
};
