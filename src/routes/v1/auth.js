const router = require('express').Router();
const AuthController = require('../../controllers/v1/AuthController');

router.post('/', AuthController.login);

module.exports = router;
