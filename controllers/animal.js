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

exports.animal_update_put = async function(req, res) {
    console.log(`Update on species ${req.params.species} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Animal.findOne({ species: req.params.species });
        if (!toUpdate) {
            return res.status(404).send(`Animal with species ${req.params.species} not found`);
        }

        if (req.body.species) toUpdate.species = req.body.species;
        if (req.body.habitat) toUpdate.habitat = req.body.habitat;
        if (req.body.lifespan) toUpdate.lifespan = req.body.lifespan;

        let result = await toUpdate.save();
        console.log("Success", result);
        res.send(result);
    } catch (err) {
        res.status(500).send(`{"error": "${err}: Update for species ${req.params.species} failed"}`);
    }
};



exports.animal_view_one_Page = async function(req, res) {
    console.log("Single view for species: " + req.query.species);
    try {
        const result = await Animal.findOne({ species: req.query.species });
        if (!result) {
            console.log(`No animal found with species: ${req.query.species}`);
            res.status(404).send(`{"error": "Animal with species ${req.query.species} not found"}`);
        } else {
            console.log("Database result:", result);
            res.render('animaldetail', { title: 'Animal Detail', toShow: result });
        }
    } catch (err) {
        console.log("Error fetching animal:", err);
        res.status(500).send(`{"error": ${err}}`);
    }
};

exports.animal_create_Page = function(req, res){
    console.log("create view");
    try{
        res.render('animalcreate', {title: 'Animal Create'});
    } catch(err){
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

exports.animal_update_Page = async function (req, res) {
    console.log("Update view for item " + req.query.species);
    try {
      let result = await Animal.findOne({ species: req.query.species });
      if (result) {
        res.render('animalupdate', { title: 'Update Animal', toShow: result });
      } else {
        res.status(404).send(`Animal with species ${req.query.species} not found`);
      }
    } catch (err) {
      res.status(500).send(`Error: ${err}`);
    }
  };
  