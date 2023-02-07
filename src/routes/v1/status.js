const router = require('express').Router();
const StatusController = require('../../controllers/v1/StatusController');

router.get('/', StatusController.showStatus);

module.exports = router;
