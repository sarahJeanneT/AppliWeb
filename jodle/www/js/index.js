document.addEventListener('deviceready', onDeviceReady ,false)

function onDeviceReady ()
{

  $('#temporaire').click(function(){
    alert('temporaire')
    window.location = "page2.html"
  })

  $('#connect_form').submit(function(e){

    $.get("jodle/messages", "", connect, "html");
    e.preventDefault();
  })

}

function connect(){
 window.location = "page1.html"
}
