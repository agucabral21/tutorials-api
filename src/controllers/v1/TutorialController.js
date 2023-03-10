const { okResponse } = require('../../helpers/responses');
const { generateTutorialToken } = require('../../helpers/jwt-generator');
const TutorialService = require('../../services/v1/TutorialService');

async function getToken(req, res) {
  const payload = { user: req.tokenPayload.user };
  const token = await generateTutorialToken(payload);
  return res.status(200).send(okResponse({ token }));
}

async function add(req, res) {
  const { title, videoURL, description } = req.body;
  const data = {
    title,
    video_url: videoURL,
    description,
    published_status: 'PUBLISHED',
  };
  const tutorial = await TutorialService.add(data);
  return res.status(200).send(okResponse(tutorial));
}

async function findAll(req, res) {
  const { title, description, sort = false } = req.query;
  const filters = { title, description };

  const tutorials = await TutorialService.findAll(filters, sort);
  if (tutorials.length === 0) return res.status(404).send();
  return res.status(200).send(okResponse({ size: tutorials.length, tutorials }));
}

async function findById(req, res) {
  const { id } = req.params;

  const tutorial = await TutorialService.findById(id);
  if (!tutorial) return res.status(404).send();

  return res.status(200).send(okResponse(tutorial));
}

async function deleteById(req, res) {
  const { id } = req.params;
  const tutorial = await TutorialService.findById(id);
  if (!tutorial) return res.status(404).send();
  if (tutorial.published_status !== 'DELETED') await TutorialService.deleteById(id);
  return res.status(204).send();
}

async function update(req, res) {
  const { id } = req.params;
  const tutorial = await TutorialService.findById(id);
  if (!tutorial) return res.status(404).send();
  const { title, videoURL, description } = req.body;
  const updateData = {
    title,
    video_url: videoURL,
    description,
  };
  await TutorialService.update(id, updateData);
  await tutorial.reload();
  return res.status(200).send(okResponse(tutorial));
}

async function massDelete(req, res) {
  await TutorialService.massDelete();
  return res.status(204).send();
}

module.exports = { getToken, add, update, findAll, findById, deleteById, massDelete };
