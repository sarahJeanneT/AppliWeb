var express = require('express');
var path = require('path');
var app = express(); // creation du serveur
var server = require('http').createServer(app);
var bodyParser = require('body-parser')  // envoie des paramètres en POST
var io = require('socket.io')(server);
var mustacheExpress = require('mustache-express');
var db = require('./db/pg_jodle.js');
//var surface_router = require('./routes/surfaces_ctrl');
//var surface_services = require('./services/surfaces')

app.use(bodyParser.urlencoded({     // pour gérer les URL-encoded bodies (envoie formulaire en POST)
  extended: true
}));

app.set('views', path.join( 'public/views'));
//app.use(bodyParser.json) // permet de lire le json envoyé en POST depuis le client
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

//app.use('/api/', surface_router);

io.on('connect', function (socket){
    console.log("Start animation");
    surface_services.animationOn(socket)

    socket.on('disconnect', function(){
        console.log("Stop animation")
        surface_services.animationOff(socket)
    })
})

app.get('/jodle/messages', function (req , res) {
	nomUtil = req.query.nomUtil;
  motPasse = req.query.motPasse;
  console.log(nomUtil);
  console.log(motPasse);
	data = db.connect(function(error ,data)
	{
		if (error == null)
      {
      res.status(200).render('page1', {pseudoutilisateur : data});
      console.log(data);
      }
		else
			res.render('error', {message : error});
	})

  //res.render('page1');
})


//
// le repertoire public va contenir les
// fichiers statiques
app.use(express.static('public'));

server.listen(8080); // démarrage du serveur sur le port 8080

console.log("Serveur démarré sur le port 8080");
