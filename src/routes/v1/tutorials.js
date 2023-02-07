const router = require('express').Router();
const TutorialController = require('../../controllers/v1/TutorialController');
const jwtValidation = require('../../middlewares/jwtValidation');

router.use(jwtValidation);

router.get('/token', TutorialController.getToken);

module.exports = router;
