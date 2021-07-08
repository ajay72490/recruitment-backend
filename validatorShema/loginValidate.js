module.exports = {
  properties: {
    email: {
      type: "string",
      format: "email",
      maxLength: 30,
      minLength: 5,
      required: true,
    },
    password: {
      type: "string",
      required: true,
      maxLength: 50,
      minLength: 6,
    },
  },
};
