import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  rating: { type: "number", min: 0, max: 5 },
  description: { type: "string", trim: true, min: 3 },
  $$strict: true, // no additional properties allowed
};

const check = v.compile(schema);

export default check;
