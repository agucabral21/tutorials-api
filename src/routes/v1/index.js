const router = require('express').Router();

router.use('/status', require('./status'));
router.use('/auth', require('./auth'));
router.use('/tutorials', require('./tutorials'));

module.exports = router;
