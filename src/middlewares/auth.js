const { errorResponse } = require('../helpers/responses');

const authMid =
  (roles = []) =>
  (req, res, next) => {
    let authenticated = false;
    if (req.tokenPayload.user?.roles) {
      const { user } = req.tokenPayload;
      authenticated = !user.roles.some((r) => !roles.includes(r));
    }
    if (!authenticated) {
      return res.status(401).json(errorResponse('Unauthorized, user has no needed roles.'));
    }
    return next();
  };

module.exports = authMid;
