
<div class="app">
{{ #data }}
<h1 id="top"> Bienvenue  {{pseudo}}</h1>
<p> </p>
<form id="message_form">
    <div class="form-group">
        <label for="Message">Message:</label>
        <input type="text" name="Message" id="Message" class="form-control" height="100" required="required"/>
        <input type="hidden" name="nomUtil" id="nomUtil" class="form-control" height="100" required="required" value={{pseudo}} />
    </div>
    <input type="submit" value="Envoyer">
</form>
{{ /data }}
<p> </p>
                <button id = "uploadFile">UPLOAD</button>
                <button id = "downloadFile">DOWNLOAD</button>
                <button id = "getPosition">CURRENT POSITION</button>
                <button id = "watchPosition">WATCH POSITION</button>
                <button id = "audioCapture">AUDIO</button>
                <button id = "imageCapture">IMAGE</button>
                <button id = "videoCapture">VIDEO</button>

        </div>

</button>
