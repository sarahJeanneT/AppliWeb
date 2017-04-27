var db = require('../db/pg_surfaces.js')

const nbPoints = 40; // nombre de points sur chaque axe
var f ;   // la fonction décrivant la surface
var x_min; 
var y_min;
var x_max; 
var y_max; 

function listAll(req, res) {
     db.getAllFonctions(function(error,data)
     {
         if (error == null)
         {
             res.status(200).render('fonctionsMenu', {fonctions : data});
             console.log(data);
         }
         else
         {
             console.log(error);
             res.status(500).send(error);
         }
    })
}


 function listByCategory(req, res) {
     const trigo = req.params.trigo
     db.getFonctions(trigo, function(error,data)
     {
         if (error == null)
         {
             res.status(200).render('fonctionsMenu', {fonctions : data});
             console.log(data);
         }
         else
         {
             console.log(error);
             res.status(500).send(error);
         }
    })
}

function updateSurface(req, res)
{
    var x_min = req.body.x_min
    var x_max = req.body.x_max
    var y_min = req.body.y_min
    var y_max = req.body.y_max
    var surface = req.body.fonction
    var nom = req.body.nom
    var id = req.body.id
    
    db.updateFonction(id, x_min, x_max, y_min, y_max, surface, nom, function() {
        res.status(200).send("ok");
    })
}

function createSurface(req, res)
{
    var x_min = req.body.x_min
    var x_max = req.body.x_max
    var y_min = req.body.y_min
    var y_max = req.body.y_max
    var surface = req.body.fonction
    var nom = req.body.nom
    
    db.createFonction(x_min, x_max, y_min, y_max, surface, nom, function () {
        res.status(200).send("ok");
    })
}

function getSurfaceInfo(req, res)
{
    const id = req.params.id;

    db.getFonction(id, function(error, data) {
        if (error == null)
        {
            res.status(200).json({
                nom : data.nom,
                equation : data.equation,            
                x_min : data.x_min,            
                x_max : data.x_max,            
                y_min : data.y_min,            
                y_max : data.y_max,            
                id : id
            })
        } 
        else
            res.status(500).send("Erreur : " + error)
    })    
}

function getSurfacePoints(req,res) {
    const id = req.params.id;
        
    db.getFonction(id, function(error, data) {
        if (error == null)
        {
            x_min = parseInt(data.x_min);
            x_max = parseInt(data.x_max);
            y_min = parseInt(data.y_min);
            y_max = parseInt(data.y_max);
            
            var src = "f = function(x,y) { return " + data.equation + "}";
            eval(src);
            
            var result =  getPoints(x_min, x_max, y_min, y_max, 1)

            res.status(200).json({
                equation : data.equation,
                zMax : result.zMax,
                data : result.points

            });            
        } else
        {
            console.log("Erreur : " + error);
            res.status(500).send(error);
        }
    });
}

var timer ;
var alpha=1;

function animationOn(socket)
{
    // setInterval permet de mettre en place un appel cyclique toutes les <x> millisecondes
    timer = setInterval(function(){
        var res = getPoints(x_min, x_max, y_min, y_max, Math.sin(alpha));
        socket.send(res.points); // envoie des données sur la websocket
        alpha += 0.1;
      }, 100)  
}

function animationOff()
{
   // supprimer l'appel cyclique désigné par timer
    clearInterval(timer);
}

function getPoints(x_min, x_max, y_min, y_max, alpha)
{
      var zMax = -10000;
      var step_x = (x_max -x_min) / nbPoints
      var step_y = (y_max - y_min) / nbPoints    
      var points = [] 
      var counter = 0 ;
      for (i=0; i<nbPoints; i++)
      {
          x = x_min + i*step_x;
          for (j=0; j<nbPoints; j++)
          {
              y = y_min + j*step_y;
              z = f(x,y)*alpha;
              if (z > zMax)
                  zMax = z ;
              points.push({id:counter++,x:x,y:y,z:z,style:z});
          }
      }
      
      return { points : points, zMax : zMax} ;
}

module.exports = {
    listAll, 
    listByCategory,
    createSurface,
    getSurfaceInfo,
    getSurfacePoints,    
    updateSurface,
    animationOn,
    animationOff
}