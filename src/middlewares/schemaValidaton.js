const { checkSchema, validationResult } = require('express-validator');

const schemaValidation = (schema) => async (req, res, next) => {
  // Run schema validation
  const validations = checkSchema(schema);
  await Promise.all(validations.map((validation) => validation.run(req)));
  // Check errors
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    statusCode: 400,
    error: true,
    errors: errors.array(),
  });
};

module.exports = schemaValidation;
