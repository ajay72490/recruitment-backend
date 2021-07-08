const auth = require("../../middleware/auth");
const ApplicationModel = require("../models/Application");
const router = new express.Router();

router.post("/createApplication", auth, async (req, res) => {
  try {
    req.body.userId = req.user._id;
    res.status(200).json(await ApplicationModel.createApplication(req.body));
  } catch (err) {
    console.log(err);
    if (err.status && err.error) {
      return res.status(err.status).json(err);
    } else {
      res.status(500).send(err);
    }
  }
});

router.post("/editApplication", auth, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.body.ApplicationId)) {
      throw {
        status: 400,
        message: "Bad Request",
        error: "Invalid application ID",
      };
    }
    req.body.userId = req.user._id;
    res.status(200).json(await ApplicationModel.editApplication(req.body));
  } catch (err) {
    console.log(err);
    if (err.status && err.error) {
      return res.status(err.status).json(err);
    } else {
      res.status(500).send(err);
    }
  }
});

router.post("/getApplication", auth, async (req, res) => {
  try {
    req.body.userId = req.user._id;
    if (!ObjectId.isValid(req.body.ApplicationId)) {
      throw {
        status: 400,
        message: "Bad Request",
        error: "Invalid application ID",
      };
    }
    res.status(200).json(await ApplicationModel.getApplication(req.body));
  } catch (err) {
    console.log(err);
    if (err.status && err.error) {
      return res.status(err.status).json(err);
    } else {
      res.status(500).send(err);
    }
  }
});

module.exports = router;
