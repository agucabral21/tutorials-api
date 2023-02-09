const router = require('express').Router();
const errorHandler = require('../../middlewares/errorHandler');

router.use('/status', require('./status'));
router.use('/auth', require('./auth'));
router.use('/tutorials', require('./tutorials'));
router.use('/prep', require('./dbPrepare'));

router.use(errorHandler);

module.exports = router;
