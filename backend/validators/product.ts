import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  title: { type: "string", trim: true, min: 3, max: 255 },
  segment: { type: "string", trim: true, min: 3, max: 255 },
  image: { type: "string", trim: true, min: 10 },
  gallery: {
    type: "array",
    optional: true,
    max: 6,
    items: {
      type: "string",
      trim: true,
      min: 10,
    },
  },

  offPrice: { type: "number", min: 0, max: 100, optional: true },
  price: { type: "number", min: 0 },
  rating: { type: "number", min: 0, max: 5, optional: true },
  quantity: { type: "number", min: 0 },
  colors: {
    type: "array",
    optional: true,
    max: 3,
    items: {
      type: "string",
      trim: true,
      min: 3,
    },
  },
  category: { type: "string", trim: true, min: 3 },
  tags: {
    type: "array",
    optional: true,
    max: 3,
    items: {
      type: "string",
      trim: true,
      min: 3,
    },
  },
  shortDescription: { type: "string", trim: true, min: 3 },
  fullDescription: { type: "string", trim: true, min: 3 },
  brand: { type: "string", trim: true, min: 3, optional: true },
  $$strict: true, // no additional properties allowed
};

const check = v.compile(schema);

export default check;
