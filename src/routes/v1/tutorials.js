const router = require('express').Router();
const TutorialController = require('../../controllers/v1/TutorialController');
const { tokenValidation, tutorialTokenValidation } = require('../../middlewares/tokenValidation');
const schemaValidation = require('../../middlewares/schemaValidaton');
const { add, put, findById, deleteById, findAll } = require('../../validation/tutorial');
const catchAsync = require('../../errors/catchAsync');

router.get('/token', tokenValidation, catchAsync(TutorialController.getToken));
router.post('/', tutorialTokenValidation, schemaValidation(add), catchAsync(TutorialController.add));
router.put('/:id', tokenValidation, schemaValidation(put), catchAsync(TutorialController.update));
router.get('/', tokenValidation, schemaValidation(findAll), catchAsync(TutorialController.findAll));
router.get('/:id', tokenValidation, schemaValidation(findById), catchAsync(TutorialController.findById));
router.delete('/mass_delete', tokenValidation, catchAsync(TutorialController.massDelete));
router.delete('/:id', tokenValidation, schemaValidation(deleteById), catchAsync(TutorialController.deleteById));

module.exports = router;
