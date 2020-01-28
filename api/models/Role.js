const mongoose = require("mongoose");
const roleschema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Role", roleschema);
