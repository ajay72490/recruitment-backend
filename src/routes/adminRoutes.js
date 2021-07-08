const User = require("../mongooseModels/User");

const router = new express.Router();

router.post("/fetchUsers", async (req, res) => {
  try {
    var matchObj = {};

    var page = req.body && req.body.page >= 1 ? req.body.page : 1;
    var limit = req.body && req.body.limit >= 1 ? req.body.limit : 10;

    if (req.body && req.body.searchText) {
      matchObj = {
        $or: [
          {
            name: {
              $regex: req.body.searchText,
              $options: "i",
            },
          },
          {
            email: {
              $regex: req.body.searchText,
              $options: "i",
            },
          },
          {
            mobileNo: {
              $regex: req.body.searchText,
              $options: "i",
            },
          },
        ],
      };
    }
    const users = await User.aggregate([
      {
        $match: matchObj,
      },
      {
        $facet: {
          paginatedresults: [
            { $sort: { createdAt: -1 } },
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
            {
              $project: { name: 1, email: 1, mobileNo: 1, address: 1 },
            },
          ],
          count: [{ $count: "count" }],
        },
      },
    ]);
    res.status(200).json(users);
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
