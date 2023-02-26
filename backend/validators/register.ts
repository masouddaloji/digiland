import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  email: { type: "email", normalize: true },
  pwd: { type: "string", trim: true, min: 8, max: 255 },
  $$strict: true, // no additional properties allowed
};

const check = v.compile(schema);

export default check;
