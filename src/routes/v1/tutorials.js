const router = require('express').Router();
const TutorialController = require('../../controllers/v1/TutorialController');
const { tokenValidation, tutorialTokenValidation } = require('../../middlewares/tokenValidation');
const schemaValidation = require('../../middlewares/schemaValidaton');
const { add, put, findById, deleteById, findAll } = require('../../validation/tutorial');
const catchAsync = require('../../errors/catchAsync');
const authMid = require('../../middlewares/auth');

router.get('/token', tokenValidation, authMid(['admin']), catchAsync(TutorialController.getToken));
router.post('/', tutorialTokenValidation, authMid(['admin']), schemaValidation(add), catchAsync(TutorialController.add));
router.put('/:id', tokenValidation, authMid(['admin']), schemaValidation(put), catchAsync(TutorialController.update));
router.get('/', tokenValidation, authMid(['admin', 'user']), schemaValidation(findAll), catchAsync(TutorialController.findAll));
router.get('/:id', tokenValidation, authMid(['admin', 'user']), schemaValidation(findById), catchAsync(TutorialController.findById));
router.delete('/mass_delete', tokenValidation, authMid(['admin']), catchAsync(TutorialController.massDelete));
router.delete('/:id', tokenValidation, authMid(['admin']), schemaValidation(deleteById), catchAsync(TutorialController.deleteById));

module.exports = router;
