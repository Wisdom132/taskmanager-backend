const mongoose = require("mongoose");
const statusSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Status", statusSchema);
