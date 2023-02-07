const router = require('express').Router();

router.use('/status', require('./status'));
router.use('/auth', require('./auth'));

module.exports = router;
