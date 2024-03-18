const Joi = require("joi");

const messageSchema = Joi.object({
  username: Joi.string().email().required(),
  email: Joi.string().email().required(),
  content: Joi.string().required(),
});

module.exports = messageSchema;
