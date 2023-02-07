const router = require('express').Router();
const TutorialController = require('../controllers/TutorialController');
const jwtValidation = require('../middlewares/jwtValidation');

router.use(jwtValidation);

router.get('/token', TutorialController.getToken);

module.exports = router;
