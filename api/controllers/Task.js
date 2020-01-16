const Task = require("../models/Task");

exports.listAllTask = async (req, res) => {
  try {
    let task = await Task.find();
    res.status(200).json(task);
  } catch (err) {
    req.status(500).json(err);
  }
};
