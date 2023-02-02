function showStatus(req, res) {
  const response = {
    status: 'ok',
  };
  return res.status(200).send(response);
}

module.exports = { showStatus };
