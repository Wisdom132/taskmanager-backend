const mongoose = require("mongoose");
const taskschema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },
  status: {
    type: String,
    default: "Active"
  },
  priority:{
     type: mongoose.Schema.Types.ObjectId,
    ref: "Priority"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Task", taskschema);
