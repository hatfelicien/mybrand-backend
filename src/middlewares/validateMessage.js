const messageValidationSchema = require("../models/message");

const validateMessage = (req, res, next) => {
  const { error } = messageValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "Bad request",
      Message:
        "Validation error: " +
        error.details.map((detail) => detail.message).join(", "),
    });
  } else {
    next();
  }
};

module.exports = validateMessage;
