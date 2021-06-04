'use strict ';
const user = require('../models/schema.js');

// check if room exists
// assure creating rooms by the configured /createId path

async function checkId (req,res,next){
 let id = req.params.id;
 await user.find( {routeId : id} , function (err, docs) {
    if (docs.length){
        next();
    }else{
    next(`fail to connect to room:${req.params.id} does not exist`);
    
    }
});


    
 
}

module.exports= checkId;