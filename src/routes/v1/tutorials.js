const router = require('express').Router();
const TutorialController = require('../../controllers/v1/TutorialController');
const jwtValidation = require('../../middlewares/jwtValidation');
const schemaValidate = require('../../middlewares/schemaValidate');
const tutorialSchema = require('../../validation/tutorialSchema');

router.use(jwtValidation);

router.get('/token', TutorialController.getToken);
router.post('/', schemaValidate(tutorialSchema), TutorialController.add);

module.exports = router;
