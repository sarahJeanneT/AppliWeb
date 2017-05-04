var express = require('express');
var path = require('path');
var app = express(); // creation du serveur
var server = require('http').createServer(app);
var bodyParser = require('body-parser')  // envoie des paramètres en POST
var io = require('socket.io')(server);
var mustacheExpress = require('mustache-express');
var db = require('./db/pg_jodle.js');
//var surface_router = require('./routes/surfaces_ctrl');
//var socket_services = require('./services/socket')

app.use(bodyParser.urlencoded({     // pour gérer les URL-encoded bodies (envoie formulaire en POST)
  extended: true
}));

app.set('views', path.join( 'public/views'));
//app.use(bodyParser.json) // permet de lire le json envoyé en POST depuis le client
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

//app.use('/api/', surface_router);

/**
io.on('connect', function (socket){
    console.log("Start animation");
    socket_services.animationOn(socket)

    socket.on('disconnect', function(){
        console.log("Stop animation")
        socket_services.animationOff(socket)
    })
})
**/

app.get('/jodle/connect', function (req , res) {
  nomUtil = req.query.nomUtil;
  motPasse = req.query.motPasse;
  //console.log(nomUtil);
  //console.log(motPasse);
  //nomUtil = "utili1";
  //motPasse = "motdepasse";
	data = db.connect(nomUtil, motPasse, function(error ,data)
	{
      if (error == null){
          console.log("Connexion réussie");
        db.getMessages(nomUtil, function(error ,data)
        {
            if (error == null){
              console.log("Récup Message réussie");
                  res.status(200).render('page1', {data : nomUtil, messages : data});
            }	else {
            res.status(200).render('error', {message : error});
            console.log(error);
            }
        })
      }	else {
      res.status(200).render('noConnect');
      console.log(error);
      }
	})
})

app.get('/jodle/gps_message', function (req , res) {
  nomUtil = req.query.nomUtil;
	data = db.updateGPS(nomUtil, req.query.longitude, req.query.latitude, function(error ,data)
	{
      if (error == null){
        console.log("Modification de la longitude et la latitude réussie");
        db.getMessages(nomUtil, function(error, data)
        {
            if (error == null){
                  res.status(200).render('page1', {data : nomUtil, messages : data});
            }	else {
            res.status(200).render('error', {message : error});
            console.log(error);
            }
        })
      }	else {
      res.status(200).render('error', {message : error});
      console.log(error);
      }
	})
})

app.get('/jodle/contact', function (req , res) {
  nomUtil = req.query.nomUtil;
	data = db.getContacts(nomUtil, function(error ,data)
	{
      if (error == null){
        console.log("getcontact réussi");
        res.status(200).render('contact', {data : nomUtil, contacts : data, erreur : null});
      }	else {
      res.status(200).render('error', {message : error});
      console.log(error);
      }
	})
})

app.get('/jodle/ajouterContact', function (req , res) {
  nomUtil = req.query.nomUtil;
  contact = req.query.contact;
  strErreur = null;
	data = db.ajouterContact(nomUtil, contact, function(error ,data)
	{
      if (error == null){
        console.log("Ajouter contact réussi");
        //res.status(200).render('contact', {data : nomUtil, contacts : data, erreur : null});
      }	else {
      //res.status(200).render('contact', {data : nomUtil, contacts : data, erreur : "impossible d'ajouter ce contact"});
      strErreur = "impossible d'ajouter ce contact";
      console.log(error);
      }
      data = db.getContacts(nomUtil, function(error ,data)
	     {
         if (error == null){
          console.log("getcontact réussi");
          res.status(200).render('contact', {data : nomUtil, contacts : data, erreur : strErreur});
        }	else {
          res.status(200).render('error', {message : error});
          console.log(error);
        }
	})


	})
})

app.get('/jodle/message', function (req , res) {
  message = req.query.Message;
  nomUtil = req.query.nomUtil;
  db.recupererContacts(nomUtil, function(error ,data){
      if (error == null){
        console.log("récupération des contacts sans erreurs");
        var contact = data;
        db.getIdMax(function(error, data){
          if (error == null){
            console.log("Récupération de l'ID Max sans erreurs");
            var IdMessage = data.maximum + 1;
            db.ajouterMessage(IdMessage, nomUtil, message, function(error ,data){
              if (error == null){
                console.log("Ajout du message dans la base de données");
                for (var id in contact){
                  db.ajouterMessageContact(IdMessage, contact[id].pseudo, function(error ,data)
                  {
                    if (error != null) {
                      res.status(200).render('error', {message : error});
                    console.log(error);
                  }
                })
              }
                console.log("Ajout du message dans la base de données 2");
                res.status(200).render('page1', {data : nomUtil, messages : null});
                console.log(data);
          } else {
            res.status(200).render('error', {message : error});
            console.log(error);
          }
        })
      } else {
        res.status(200).render('error', {message : error});
        console.log(error);
        }
      })
		} else {
      res.status(200).render('error', {message : error});
      console.log(error);
    }
	})

  })

function chargerNouveauxMessage(nomUtil){

}


//
// le repertoire public va contenir les
// fichiers statiques
app.use(express.static('public'));

server.listen(8080); // démarrage du serveur sur le port 8080

console.log("Serveur démarré sur le port 8080");
