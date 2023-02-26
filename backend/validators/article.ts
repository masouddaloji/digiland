import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  title: { type: "string", trim: true, min: 3 },
  image: { type: "string", min: 10 },
  description: { type: "string", trim: true, min: 10 },
  writer: { type: "string", min: 3 },
  category: { type: "string", trim: true, min: 3 },
  $$strict: true, // no additional properties allowed
};

const check = v.compile(schema);

export default check;
