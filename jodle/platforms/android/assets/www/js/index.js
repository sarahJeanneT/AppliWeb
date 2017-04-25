document.addEventListener('deviceready', onDeviceReady ,false)

function onDeviceReady ()
{

  $('#temporaire').click(function(){
    alert('temporaire')
    window.location = "page2.html"
  })

  $('#connect_form').submit(function(e){
    alert('connecter')
    window.location = "page1.html"
    $.get("jodle/messages", "", connect, "html");
    e.preventDefault();
  })

}

function connect(){

}
