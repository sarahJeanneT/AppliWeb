var idTimer = setInterval(gps_message, 5000);
  clearInterval(idtimer);

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
