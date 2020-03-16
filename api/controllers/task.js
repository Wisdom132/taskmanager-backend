const Task = require("../models/Task");
const User = require("../../account/model/User");
const mongoose = require("mongoose")
// import monent from 'moment'

exports.listAllTask = async (req, res) => {
  try {
    let task = await Task.find().populate("user role priority");
    res.status(200).json(task);
  } catch (err) {}
};

exports.createNewTask = async (req, res) => {
  try {
    let task = new Task({
      title: req.body.title,
      description: req.body.description,
      role: req.body.role,
      priority:req.body.priority,
      startDate:null,
      completeDate:null
    });
    //get users and thier task
    var numTasks = 1;
     let roleid = req.body.role;
    let userTask = await User.aggregate([
     { $match : { "role" : mongoose.Types.ObjectId(roleid) } },
      {$lookup:{

      from: 'tasks',
        localField: '_id',
        foreignField: 'user',
        as: 'tasks'
      }},
     
      {
         $addFields: {
            tasks: { $size: "$tasks" }
        }
    },
    {
        $sort: { tasks: 1 }
    },
    {
        $limit: numTasks
    }
    ])
  let assignedUser = userTask[0]._id;
  task.user = assignedUser;
  let assignedTask = await task.save()
    res.status(200).json({ assignedTask });
  

  // old code for random user assinging====> this isnt efficient

  //   let role = req.body.role;
  //   let user = await User.find({ role: role });
    
  //   if(user.length == 0) {
  //      res.status(500).json({message:"Please Create a User With this role" });
  //   }
    // let random = Math.floor(Math.random() * user.length);
    // let assignedUser = user[random]._id;
    // task.user = assignedUser;
    // let assignedTask = await task.save()
    // res.status(200).json({ assignedTask });

    
  } catch (err) {
    res.status(500).json({ error: err });
    
  }
};

exports.deleteTask = async (req,res) => {
  let id = req.params.taskId;
  try {
    let request = await Task.remove({_id:id});
     res.status(200).json({  message:'Task Deleted',request });
  }catch(err) {
    
    res.status(500).json({error: err });
  }
}

exports.updateTask = async (req,res) => {
  let id = req.params.taskId
  try {
    let updateStatus = await Task.findByIdAndUpdate(id,req.body.data)
    let update = await updateStatus.save();
    res.status(200).json(update)
  }catch(err) {
    res.status(500).json({ error: err });
  }
}
