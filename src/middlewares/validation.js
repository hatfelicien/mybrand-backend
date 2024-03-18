const Joi = require("joi");

// Registration validation
const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

// Login validation
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

// blog validations
const blogValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
  });

  // Validate request body
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  /* Image validation
  if (!req.file) {
    return res.status(400).send("Image is required");
  }
*/
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  blogValidation,
};
