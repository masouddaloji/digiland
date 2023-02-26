import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  status: { type: "enum", values: ["pending", "delivered", "cancelled"] },
  $$strict: true, // no additional properties allowed
};

const check = v.compile(schema);

export default check;
