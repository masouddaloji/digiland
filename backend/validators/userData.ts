import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  name: { type: "string", trim: true, min: 3, max: 255, optional: true },
  image: { type: "string", trim: true, min: 10, optional: true },
  phone: { type: "string", trim: true, min: 10, optional: true },
  addresses: {
    type: "array",
    optional: true,
    max: 6,
    items: {
      type: "string",
      trim: true,
      min: 10,
    },
  },
  $$strict: true, // no additional properties allowed
};

const check = v.compile(schema);

export default check;
