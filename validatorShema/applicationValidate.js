module.exports = {
  properties: {
    address: {
      type: "string",
      required: true,
      maxLength: 100,
      minLength: 10,
    },
    qualification: {
      type: "string",
      maxLength: 30,
      minLength: 2,
      required: true,
    },
    experience: {
      type: "number",
      required: true,
      maximum: 10,
      minimum: 0,
    },
    position: {
      type: "string",
      required: true,
      maxLength: 50,
      minLength: 2,
    },
    resumeLink: {
      type: "string",
      maxLength: 50,
      minLength: 7,
      format: "url",
      required: true,
    },
  },
};
