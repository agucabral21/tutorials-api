const router = require('express').Router();
const TutorialController = require('../../controllers/v1/TutorialController');
const { tokenValidation, tutorialTokenValidation } = require('../../middlewares/tokenValidation');
const schemaValidate = require('../../middlewares/schemaValidate');
const tutorialSchema = require('../../validation/tutorialSchema');

router.get('/token', tokenValidation, TutorialController.getToken);
router.post('/', tutorialTokenValidation, schemaValidate(tutorialSchema), TutorialController.add);

module.exports = router;
