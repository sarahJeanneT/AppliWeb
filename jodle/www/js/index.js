//LAISSER CETTE LIGNE DE CODE!!!!!!!
document.addEventListener('deviceready', this.onDeviceReady, false);



function onDeviceReady ()
{

  $('#connect_form').submit(function(e){
    $('#nomUtil_definitif').val(document.getElementById('nomUtil').value);
    $.get("http://129.88.241.83:8080/jodle/connect", {nomUtil : document.getElementById('nomUtil').value, motPasse : document.getElementById('motPasse').value }, changePage, "html");;
    e.preventDefault();
  })

  $('#creer_uti').click(function(e){
    $.get("http://129.88.241.83:8080/jodle/creeruti", changePage, "html");
    e.preventDefault();
  })






  function changePage(data){
    var reader = new FileReader();
    console.log(data);
    $('#body').html(data);
    //window.location = "page1.html"



    $('#creer_uti_form').submit(function(e){
    $.get("http://129.88.241.83:8080/jodle/enregistrement", {Pseudo : document.getElementById('pseudo').value, Mdp : document.getElementById('mdp').value }, changePage, "html");
    e.preventDefault();
    })

    $('#message_form').submit(function(e){
    $.get("http://129.88.241.83:8080/jodle/message", {Message : document.getElementById('Message').value, nomUtil : document.getElementById('nomUtil_definitif').value }, changePage, "html");
    e.preventDefault();
    })

    $('#connect_form').submit(function(e){
      $('#nomUtil_definitif').val(document.getElementById('nomUtil').value);
      $.get("http://129.88.241.83:8080/jodle/connect", {nomUtil : document.getElementById('nomUtil').value, motPasse : document.getElementById('motPasse').value }, changePage, "html");
      e.preventDefault();
    })


/*
    $('#effacer').click(function(e){
      $.get("http://129.88.241.83:8080/jodle/effacer", {pseudo : document.getElementById('nomUtil').value}, changePage, "html");
      e.preventDefault();
    })

    $('#peffacer').click(function(e){
      $.get("http://129.88.241.83:8080/jodle/peffacer", {pseudo : document.getElementById('nomUtil').value}, changePage, "html");
      e.preventDefault();
    })
*/


    $('#deconnect').click(function(){
    window.location = "index.html";
    })

    $('#imageCapture').click(function(){
    alert("bouton image");
    var options = {limit: 1};
    navigator.device.capture.captureImage(onSuccess, onError, options);
    function onSuccess(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        console.log(mediaFiles[0]);
      }
      var image = window.resolveLocalFileSystemURL(mediaFiles[0].fullPath, fileSuccess, fileFail);
      function fileSuccess(fileEntry){
        fileEntry.file(function(file) {
          var reader = new FileReader();
          reader.onloadend = function(e) {
             console.log("Text is: "+this.result);
             $.get("http://129.88.241.83:8080/jodle/message", {Message : this.result, nomUtil : document.getElementById('nomUtil_definitif').value }, changePage, "html");
             //document.querySelector("#textArea").innerHTML = this.result;
         }
         reader.readAsText(file);
     });
      }
      function fileFail(){
        alert("File fail");
      }
    }
    function onError(error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }
    })

    $('#chargeMessages').click(function(){
      var options = {
         enableHighAccuracy: true,
         maximumAge: 3600000
      }
     var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
     function onSuccess(position) {
        alert('Latitude: '+ position.coords.latitude + '\n' +
               'Longitude: '+ position.coords.longitude + '\n' );
        $.get("http://129.88.241.83:8080/jodle/GPS_Message",
          {nomUtil : document.getElementById('nomUtil_definitif').value,
            longitude : position.coords.longitude,
            latitude : position.coords.latitude },
          changePage, "html");
     }
     function onError(error) {
        alert('Impossible de récupérer les coordonées GPS \n' +
        'code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        $.get("http://129.88.241.83:8080/jodle/GPS_Message",
          {nomUtil : document.getElementById('nomUtil_definitif').value,
            longitude : 0, latitude : 0}, changePage, "html");
        }
     })
  }
}
