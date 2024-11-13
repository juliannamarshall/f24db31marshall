var Animal = require('../models/animal');

exports.animal_list = async function(req, res){
    try{
        theAnimal = await Animal.find();
        res.send(theAnimal);
    } catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.animal_detail = function(req, res){
    res.send('NOT IMPLEMENTED: Animal detail: ' + req.params.id);
};

exports.animal_create_post = function(req, res){
    res.send('NOT IMPLEMENTED: Animal create POST');
};

exports.animal_delete = function(req, res){
    res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};

exports.animal_update_put = function(req, res){
    res.send('NOT IMPLEMENTED: Animal update PUT ' + req.params.id);
};