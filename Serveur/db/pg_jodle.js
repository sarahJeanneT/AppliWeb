var pgp = require('pg-promise')(/*options*/)
var dbconfig = require('../config/settings.js').settings


var db = pgp(dbconfig)


function connect(pseudo, motPasse, callback)
{
    var requete = `select * from public.utilisateur where pseudo = '${pseudo}' AND mdp = '${motPasse}'`
    console.log(requete);

    db.one(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })
}


function getPseudoUtilisateur(callback)
{
    var requete = 'select pseudo from public.utilisateur'
    console.log(requete);

    db.any(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })
}

function recupererContacts(numUtil, callback)
{


    var requete = `select distinct v.pseudo from public.utilisateur u, public.utilisateur v where u.pseudo = '${nomUtil}' and v.pseudo!='${nomUtil}' and (st_distance(u.gps,v.gps)<5000) intersect(select distinct pseudoReceiver from public.contact where pseudoSender='${nomUtil}')`
    console.log(requete);

    db.any(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })
}

function ajouterMessage(sender, Message, callback)
{
  var now = new Date();
  var strDate = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

    var requete = `insert into message values('${Message}',TIMESTAMP '${strDate}','${sender}')`

    console.log(requete);

    db.none(requete, null).
            then(function (data) {
                callback();
    }).catch(function(error) {
        console.log(error) // devrait normalement remonte à la page web
    })
}

function ajouterMessageContact(pseudo, message, callback)
{

    var requete = `insert into recoit values('${message}','${pseudo}', 'en attente')`

    console.log(requete);

    db.none(requete, null).
            then(function (data) {
                callback();
            }).catch(function(error) {
        console.log(error) // devrait normalement remonter à la page web
    })
}

module.exports = {
  connect,
  getPseudoUtilisateur,
  recupererContacts,
  ajouterMessageContact,
  ajouterMessage
};
