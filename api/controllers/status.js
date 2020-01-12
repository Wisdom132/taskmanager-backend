const Status = require("../models/Status");

exports.addStatus = async (req, res) => {
  try {
    const status = new Status({
      name: req.body.status
    });
    let newStatus = await status.save();
    res.status(200).json({ data: newStatus });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getAllStatus = async (req, res) => {
  try {
    let status = await Status.find();
    res.status(200).json({ data: status });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteStatus = async (req, res) => {
  try {
    const id = req.params.statusId;
    let deletedStatus = await Status.remove({ _id: id });
    res.status(200).json({ data: deletedStatus, message: "Status Deleted" });
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
