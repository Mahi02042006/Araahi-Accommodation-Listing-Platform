const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),

    country: Joi.string()
      .pattern(/^[A-Za-z\s]+$/)
      .required(),

    state: Joi.string()
      .pattern(/^[A-Za-z\s]+$/)
      .required(),

    city: Joi.string()
      .pattern(/^[A-Za-z\s]+$/)
      .required(),

    zip: Joi.number().required(),

    price: Joi.number().min(100).required(),

    image: Joi.object({
      url: Joi.string().allow("", null),
    }),

    about: Joi.string().allow("", null),
  }).required(),
});

module.exports = listingSchema;