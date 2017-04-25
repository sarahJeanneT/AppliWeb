var pgp = require('pg-promise')(/*options*/)
var dbconfig = require('../config/settings.js').settings


var db = pgp(dbconfig)

function getFonctions(trigo, callback)
{
    var requete = `select nom, id from public.fonctions where trigo = ${trigo}`
    console.log(requete);
    
    db.any(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}

function getAllFonctions(callback)
{
    var requete = 'select nom, id from public.fonctions'
    console.log(requete);
    
    db.any(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}

function getFonction(id, callback)
{
    var requete = `select nom, equation, x_min, x_max, y_min, y_max  from public.fonctions where id = ${id}`
    console.log(requete);
    
    db.one(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}

function createFonction(x_min, x_max, y_min, y_max, equation, nom, callback)
{
    var trigo = (equation.search("Math.sin") != -1) || (equation.search("Math.cos") != -1) || (equation.search("Math.tan") != -1)
    var requete = `insert into fonctions (x_min, x_max, y_min, y_max, nom, equation, trigo, id) values (${x_min}, ${x_max}, ${y_min}, ${y_max}, '${nom}', '${equation}', ${trigo}, nextval('fonctions_seq'))`
    console.log(requete);
    
    db.none(requete, null).
            then(function (data) {
                callback();
    }).catch(function(error) {
        console.log(error) // devrait normalement remonte à la page web
    })
}

function updateFonction(id, x_min, x_max, y_min, y_max, equation, nom, callback)
{
    var trigo = (equation.search("Math.sin") != -1) || (equation.search("Math.cos") != -1) || (equation.search("Math.tan") != -1)
    var requete = `update fonctions set x_min=${x_min}, x_max = ${x_max},  y_min = ${y_min} , y_max = ${y_max}, nom = '${nom}', equation = '${equation}', trigo = ${trigo} where id=${id}`
    
    console.log(requete);
    
    db.none(requete, null).
            then(function (data) {
                callback();
            }).catch(function(error) {
        console.log(error) // devrait normalement remonter à la page web
    })
}

module.exports = {
  getFonctions,
  getAllFonctions,
  getFonction,
  updateFonction,
  createFonction
};

