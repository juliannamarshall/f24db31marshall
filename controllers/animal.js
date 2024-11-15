var Animal = require('../models/animal');

exports.animal_view_all_Page = async function(req, res){
    try{
        theAnimal = await Animal.find();
        res.render('animal', {title: 'Animal Search Results', results: theAnimal});
    } catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.animal_detail = async function(req, res){
    console.log("detail" + req.params.id);
    try{
        const result = await Animal.findById(req.params.id);
        if(result){
            res.send(result);
        }
        else{
            res.status(404);
            res.send(`{"error": "Animal with id ${req.params.id} not found"}`);
        }
    } catch(err){
        res.status(500);
        res.send(`{"error": "Document for id ${req.params.id} not found"}`);
    }
};

exports.animal_create_post = async function(req, res){
    console.log(req.body);
    let document = new Animal();
    document.species = req.body.species;
    document.habitat = req.body.habitat;
    document.lifespan = req.body.lifespan;
    try{
        let result = await document.save();
        res.send(result);
    } catch (err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.animal_delete = function(req, res){
    res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};

exports.animal_update_put = function(req, res){
    res.send('NOT IMPLEMENTED: Animal update PUT ' + req.params.id);
};
