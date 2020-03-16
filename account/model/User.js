const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },
  password: {
    type: String,
    required: true
  },
  NumTasksAssigned: {
    type: Number,
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("User", userSchema);
