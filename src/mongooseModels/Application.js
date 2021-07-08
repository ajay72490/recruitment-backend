var schema = new Mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    resumeLink: {
      type: String,
      required: true,
    },
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Application", schema);
