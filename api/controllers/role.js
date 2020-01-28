const Role = require("../models/Role");

exports.createNewRole = async (req, res) => {
  try {
    const role = new Role({
      name: req.body.name
    });
    let newrole = await role.save();
    res.status(200).json({ data: newrole });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.listAllRoles = async (req, res) => {
  try {
    let roles = await Role.find();
    res.status(200).json({ data: roles });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    let id = req.params.roleId;
    let response = await Role.remove({ _id: id });
    res.status(200).json({ message: "Role Deleted", data: response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
