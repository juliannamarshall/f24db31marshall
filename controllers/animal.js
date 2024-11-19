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
    console.log("detail" + req.params.species);
    try{
        const result = await Animal.findOne({ species: req.params.species });
        if(result){
            res.send(result);
        }
        else{
            res.status(404);
            res.send(`{"error": "Animal with id ${req.params.species} not found"}`);
        }
    } catch(err){
        res.status(500);
        res.send(`{"error": "Document for id ${req.params.species} not found"}`);
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

exports.animal_delete = async function(req, res){
    console.log("request params: ", req.params);
    console.log("delete " + req.params.species);
    try{
        result = await Animal.findOneAndDelete({ species: req.params.species });
        console.log("Removed " + result);
        res.send(result);
    } catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.animal_update_put = async function(req, res){
    console.log(`update on id ${req.params.species} with body ${JSON.stringify(req.body)}`);
    try{
        let toUpdate = await Animal.findOne({ species: req.params.species });
        if(req.body.species){
            toUpdate.species = req.body.species;
        }
        if(req.body.habitat){
            toUpdate.habitat = req.body.habitat;
        }
        if(req.body.lifespan){
            toUpdate.lifespan = req.body.lifespan;
        }
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result); 
    } catch(err){
        res.status(500);
        res.send(`{"error": ${err}: Update for id ${req.params.species} failed}`);
    }
};

exports.animal_view_One_Page = async function(req, res){
    console.log("Single view for id" + req.query.species);
    try{
        result = await Animal.findOne({ species: req.query.species });
        res.render('animaldetail', {title: 'Animal Detail', toShow: result});
    } catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
}