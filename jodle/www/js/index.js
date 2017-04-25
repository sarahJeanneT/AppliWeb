document.addEventListener('deviceready', onDeviceReady ,false)

function onDeviceReady ()
{
  alert('Volume Up Button is pressed !');

  $('#temporaire').click(function(){
    alert('Volume Up Button is pressed !')
    window.location = "page2.html"
  })

}
