var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var animal_controller = require('../controllers/animal');

const secured = (req, res, next) =>{
    if(req.user){
        return next();
    }
    res.redirect("/login?message=login");
}

router.get('/', api_controller.api);
router.post('/animal', animal_controller.animal_create_post);
router.delete('/animal/:species', animal_controller.animal_delete);
router.put('/animal/:species', animal_controller.animal_update_put);

router.get('/animal/detail', animal_controller.animal_view_one_Page);
router.get('/animal/create', animal_controller.animal_create_Page);
router.get('/animal/update', secured, animal_controller.animal_update_Page);
router.get('/animal/delete', animal_controller.animal_delete_Page);
router.get('/animal/:species', animal_controller.animal_detail);
router.get('/animal', animal_controller.animal_view_all_Page);

module.exports = router;
