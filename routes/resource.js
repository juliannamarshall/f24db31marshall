var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var animal_controller = require('../controllers/animal');

router.get('/', api_controller.api);
router.post('/animal', animal_controller.animal_create_post);
router.delete('/animal/:species', animal_controller.animal_delete);
router.put('/animal/:species', animal_controller.animal_update_put);

router.get('/animal/detail', animal_controller.animal_view_one_Page);
router.get('/animal/:species', animal_controller.animal_detail);
router.get('/animal', animal_controller.animal_view_all_Page);

module.exports = router;
