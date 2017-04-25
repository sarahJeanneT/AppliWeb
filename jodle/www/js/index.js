var appState = {
    takingPicture: true,
    imageUri: ""
};

var app = {
    initialize: function() {
        this.bindEvents();
    }
    bindEvents: function() {
      
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);
    }

function onDeviceReady ()
{

  $('#temporaire').click(function(){
    alert('temporaire')
    window.location = "page2.html"
  })

  $('#connect_form').submit(function(e){
    window.location = "page1.html"
    $.get("jodle/messages", "", connect, "html");
    e.preventDefault();
  })

 document.getElementById("take-picture-button").addEventListener("click", function() {
  
  appState.takingPicture = true;

    navigator.camera.getPicture(cameraSuccessCallback, cameraFailureCallback,
        {
          sourceType: Camera.PictureSourceType.CAMERA,
          destinationType: Camera.DestinationType.FILE_URI,
          targetWidth: 250,
          targetHeight: 250
        }
}
onPause: function() {

        if(appState.takingPicture || appState.imageUri) {
            window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(appState));
        }
       } 
onResume: function(event) {
      
        var storedState = window.localStorage.getItem(APP_STORAGE_KEY);

        if(storedState) {
            appState = JSON.parse(storedState);
        }
 if(!appState.takingPicture && appState.imageUri) {
            document.getElementById("get-picture-result").src = appState.imageUri;
        }
        
        else if(appState.takingPicture && event.pendingResult) {
            
            if(event.pendingResult.pluginStatus === "OK") {
                
                cameraSuccessCallback(event.pendingResult.result);
            } else {
                cameraFailureCallback(event.pendingResult.result);
            }
        }
    }
function cameraSuccessCallback(imageUri) {
    appState.takingPicture = false;
    appState.imageUri = imageUri;
    document.getElementById("get-picture-result").src = imageUri;
}

function cameraFailureCallback(error) {
    appState.takingPicture = false;
    console.log(error);
}


function connect(){

}

    onOnline: function() {
       
       var pConectionType = document.getElementById('conectionType');
       pConectionType.innerHTML = '<p>Online</p>';
    }
    onOffline: function() {
     
      var pConectionType = document.getElementById('conectionType');
      pConectionType.innerHTML = '<p>Offline</p>';    	
    }

    document.addEventListener('online', this.onOnline, false);
    document.addEventListener('offline', this.onOffline, false);

app.initialize();