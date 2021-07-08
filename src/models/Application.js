const Application = require("../mongooseModels/Application");
const validate = require("jsonschema").validate;
const applicationValidate = require("../../validatorShema/applicationValidate");

module.exports = {
  async createApplication(data) {
    var v = validate(data, applicationValidate);
    if (v && v.errors && v.errors.length > 0) {
      throw {
        status: 400,
        error: v.errors[0].stack.replace("instance.", ""),
        message: "Bad Request",
      };
    }
    const alreadyApplied = await Application.findOne({
      userId: data.userId,
      position: data.position,
    });

    if (alreadyApplied && alreadyApplied._id) {
      throw {
        status: 400,
        message: "Bad Request",
        error: "Already Applied for the position",
      };
    }

    var ApplicationToSave = new Application(data);
    return await ApplicationToSave.save();
  },

  async editApplication(data) {
    var v = validate(data, applicationValidate);
    if (v && v.errors && v.errors.length > 0) {
      throw {
        status: 400,
        error: v.errors[0].stack.replace("instance.", ""),
        message: "Bad Request",
      };
    }
    const updatedApplication = await Application.updateOne(
      {
        _id: ObjectId(data.ApplicationId),
      },
      {
        $set: data,
      }
    );
    if (updatedApplication && updatedApplication.nModified) {
      return "Application Updated";
    } else {
      throw {
        status: 401,
        message: "Not Found",
        error: "Application Not Found",
      };
    }
  },

  async getApplication(data) {
    const appl = await Application.aggregate([
      {
        $match: { _id: ObjectId(data.ApplicationId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $project: {
          address: 1,
          qualification: 1,
          position: 1,
          experience: 1,
          resumeLink: 1,
          createdAt: 1,
          updatedAt: 1,
          "user.name": 1,
          "user.email": 1,
          _id: 0,
        },
      },
    ]);
    return appl;
  },
};
