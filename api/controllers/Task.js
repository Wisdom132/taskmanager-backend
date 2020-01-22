const Task = require("../models/Task");
const User = require("../../account/model/User");

exports.listAllTask = async (req, res) => {
  try {
    let task = await Task.find();
    res.status(200).json(task);
  } catch (err) {}
};

exports.createNewTask = async (req, res) => {
  try {
    let task = new Task({
      title: req.body.title,
      description: req.body.description,
      role: req.body.role
    });
    let role = req.body.role;
    let user = await User.find({ role: role }).exec();
    let random = Math.floor(Math.random() * user.length) + 1;
    let assignedUser = user[random]._id;
    task.user = assignedUser;
    res.json({ task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
