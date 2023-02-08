const router = require('express').Router();
const TutorialController = require('../../controllers/v1/TutorialController');
const { tokenValidation, tutorialTokenValidation } = require('../../middlewares/tokenValidation');
const schemaValidate = require('../../middlewares/schemaValidate');
const { add, findAll } = require('../../validation/tutorial');

router.get('/token', tokenValidation, TutorialController.getToken);
router.post('/', tutorialTokenValidation, schemaValidate(add), TutorialController.add);
router.get('/', tokenValidation, schemaValidate(findAll), TutorialController.findAll);

module.exports = router;
