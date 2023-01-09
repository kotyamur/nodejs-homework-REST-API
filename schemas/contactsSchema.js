const Joi = require("joi");

const createAndUpdateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .min(4)
    .required(),
  phone: Joi.number().min(7).required(),
});

module.exports = {
  createAndUpdateContactSchema,
};
