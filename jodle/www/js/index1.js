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

  console.log(FileTransfer);

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
/* Method online/offline

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
*/

/* Upload

var win = function (r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

var fail = function (error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

var options = new FileUploadOptions();
options.fileKey = "file";
options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
options.mimeType = "text/plain";

var params = {};
params.value1 = "test";
params.value2 = "param";

options.params = params;

var ft = new FileTransfer();
ft.upload(fileURL, encodeURI("http://some.server.com/upload.php"), win, fail, options);
*/

/*Download

var fileTransfer = new FileTransfer();
var uri = encodeURI("http://some.server.com/download.php");

fileTransfer.download(
    uri,
    fileURL,
    function(entry) {
        console.log("download complete: " + entry.toURL());
    },
    function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("download error code" + error.code);
    },
    false,
    {
        headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        }
    }
);
*/
/*Abort
var win = function(r) {
    console.log("Should not be called.");
}

var fail = function(error) {
    // error.code == FileTransferError.ABORT_ERR
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

var options = new FileUploadOptions();
options.fileKey="file";
options.fileName="myphoto.jpg";
options.mimeType="image/jpeg";

var ft = new FileTransfer();
ft.upload(fileURL, encodeURI("http://some.server.com/upload.php"), win, fail, options);
ft.abort();
*/
app.initialize();
