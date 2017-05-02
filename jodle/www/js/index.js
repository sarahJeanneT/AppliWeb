//LAISSER CETTE LIGNE DE CODE!!!!!!!
document.addEventListener('deviceready', this.onDeviceReady, false);



function onDeviceReady ()
{

  $('#connect_form').submit(function(e){
    $('#nomUtil_definitif').val(document.getElementById('nomUtil').value);
    $.get("http://129.88.241.140:8080/jodle/connect", {nomUtil : document.getElementById('nomUtil').value, motPasse : document.getElementById('motPasse').value }, changePage, "html");;
    e.preventDefault();
  })


  function changePage(data){
    var idTimer = setInterval(gps_message, 5000);

    console.log(data);
    $('#body').html(data);
    //window.location = "page1.html"

    $('#message_form').submit(function(e){
    clearInterval(idtimer);
    $.get("http://129.88.241.140:8080/jodle/message", {Message : document.getElementById('Message').value, nomUtil : document.getElementById('nomUtil_definitif').value }, changePage, "html");
    e.preventDefault();
    })

    $('#connect_form').submit(function(e){
      clearInterval(idTimer);
      $('#nomUtil_definitif').val(document.getElementById('nomUtil').value);
      $.get("http://129.88.241.140:8080/jodle/connect", {nomUtil : document.getElementById('nomUtil').value, motPasse : document.getElementById('motPasse').value }, changePage, "html");
      e.preventDefault();
    })

    function gps_message() {
      //gps
      var options = {
         enableHighAccuracy: true,
         maximumAge: 3600000
      }

     var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

     function onSuccess(position) {
        alert('Latitude: '+ position.coords.latitude + '\n' +
               'Longitude: '+ position.coords.longitude + '\n' );
        clearInterval(idTimer);
        $.get("http://129.88.241.140:8080/jodle/GPS_Message",
          {nomUtil : document.getElementById('nomUtil_definitif').value,
            longitude : position.coords.longitude,
            latitude : position.coords.latitude },
          changePage, "html");
     }
     function onError(error) {
        alert('Impossible de récupérer les coordonées GPS \n' +
        'code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        clearInterval(idTimer);
        $.get("http://129.88.241.140:8080/jodle/GPS_Message",
          {nomUtil : document.getElementById('nomUtil_definitif').value,
            longitude : 0,
            latitude : 0},
          changePage, "html");
        }
     }

  }


/**
document.getElementById("cameraTakePicture").addEventListener ("click", cameraTakePicture);

function cameraTakePicture() {
   navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
   });

   function onSuccess(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }
}
function cameraTakePicture() {
   navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
   });

   function onSuccess(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }
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
}
