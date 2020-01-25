const User = require("../model/User");
const Task = require("../../api/models/Task");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userLogin = async (req, res) => {
  let user = await User.findOne({ email: req.body.email })
  if(user.length < 1) {
    return res.status(401).json({ error: "User not found" });
  }
 await bcrypt.compare(req.body.password, user.password, (err, result)=> {
    if (err) {
          return res.status(401).json({
            error: "Authentification error"
          });
        }
         if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              name: user.name,
              id: user._id
            },
            "secret",
            { expiresIn: "240h" }
          );
          return res.status(200).json({
             role:"user",
            message: "Authentification Successful",
            token: token,
            user:user
          });
        }
  }) 
};

exports.getUserAssignedTask = async (req,res) => {
  try {
    let id = req.params.UserId
    let task = await Task.find({user:id})
  if(task.length === 0) {
    res.status(200).json({
          message:"No Task Assigned Yet"
          });
  }else {
res.status(200).json({
           tasks : task
          });
  }
  }catch(err) {
    console.log(err)
  }
}

exports.updateTaskStatus = async (req,res) => {
  let id = req.params.taskId
  try {
    let updateStatus = await Task.findByIdAndUpdate(id,{ $set: { status: req.body.status }})
    let update = await updateStatus.save();
    res.status(200).json(update)
  }catch(err) {
    console.log(err);
  }
}