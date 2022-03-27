const Joi = require('joi');

const bodySchemaLatLng = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});

const bodySchemaFilter = Joi.object({
  specie: Joi.string().required(),
  breed: Joi.string().required(),
  age: Joi.string().required(),
  sex: Joi.string().required(),
  color: Joi.string().required(),
  size: Joi.string().required(),
  fur: Joi.string().required(),
});

const bodySchema = Joi.object({
  username: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string().required(),
  addressNumber: Joi.string().required(),
  addressRoad: Joi.string().required(),
  date: Joi.string().required(),
  latLng: bodySchemaLatLng,
  filter: bodySchemaFilter,
});

module.exports = bodySchema;
