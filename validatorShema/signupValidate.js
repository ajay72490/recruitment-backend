module.exports = {
  properties: {
    name: {
      type: "string",
      required: true,
      maxLength: 100,
      minLength: 2,
    },
    email: {
      type: "string",
      format: "email",
      maxLength: 30,
      minLength: 5,
      required: true,
    },
    address: {
      type: "string",
      required: true,
      maxLength: 100,
      minLength: 10,
    },
    mobileNo: {
      type: "string",
      required: true,
      maxLength: 10,
      minLength: 10,
    },
    password: {
      type: "string",
      required: true,
      maxLength: 50,
      minLength: 6,
    },
  },
};
