const Subscriber = require("../models/subscriber");

const newSub = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "Bad request",
        Message: "Missing fields",
        email,
      });
    }

    // blog object
    const newSub = {
      email,
    };
    // save data
    // await Blogs.create(newBlog)
    await Subscriber.create(newSub);

    return res.status(201).json({
      Message: "Subscriber is added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      Message: "Fail to add a subscriber :)",
    });
  }
};

const deletesub = async (req, res) => {
  try {
    const { id } = req.params;

    // check if sub exist
    const subscriber = await Subscriber.findByIdAndDelete(id);
    if (!subscriber) {
      return res.status(404).json({
        Message: "Subscriber is not deleted",
      });
    }

    return res.status(200).json({
      Message: "Subscriber deleted",
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Fail to delete subscriber ",
    });
  }
};
const allsubs = async (req, res) => {
  try {
    const mysub = await Subscriber.find();
    if (!mysub) {
      res.status(404).send({
        status: "Not found",
        Message: "No blog found :)",
      });
      return;
    }

    // blog found
    res.status(200).send({
      status: "OK",
      Message: mysub,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Fail to retireve the subscribers :)",
    });
  }
};
module.exports = {
  newSub,
  allsubs,
  deletesub,
};
