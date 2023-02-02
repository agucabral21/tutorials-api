const router = require('express').Router();
const StatusController = require('../../controllers/StatusController');

router.get('/', StatusController.showStatus);

module.exports = router;
