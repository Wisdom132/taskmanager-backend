const mongoose = require("mongoose");
const prioritySchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Priority", prioritySchema);
