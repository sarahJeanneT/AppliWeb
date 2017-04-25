document.addEventListener('deviceready', onDeviceReady ,false)


function onDeviceReady ()
{
  $.support.cors = true

  $('#temporaire').click(function(){
    alert('temporaire')
    window.location = "page2.html"
  })

  $('#connect_form').submit(function(e){

    $.get("http://129.88.240.172:8080/jodle/messages", "", connect, "html");

    window.location = "page1.html"

    e.preventDefault();
  })

}

function connect(){

}
