const router = require('express').Router();
const TutorialController = require('../../controllers/v1/TutorialController');
const { tokenValidation, tutorialTokenValidation } = require('../../middlewares/tokenValidation');
const schemaValidate = require('../../middlewares/schemaValidate');
const { add, put, findById, deleteById, findAll } = require('../../validation/tutorial');
const catchAsync = require('../../errors/catchAsync');

router.get('/token', tokenValidation, catchAsync(TutorialController.getToken));
router.post('/', tutorialTokenValidation, schemaValidate(add), catchAsync(TutorialController.add));
router.put('/:id', tokenValidation, schemaValidate(put), catchAsync(TutorialController.update));
router.get('/', tokenValidation, schemaValidate(findAll), catchAsync(TutorialController.findAll));
router.get('/:id', tokenValidation, schemaValidate(findById), catchAsync(TutorialController.findById));
router.delete('/mass_delete', tokenValidation, catchAsync(TutorialController.massDelete));
router.delete('/:id', tokenValidation, schemaValidate(deleteById), catchAsync(TutorialController.deleteById));

module.exports = router;
