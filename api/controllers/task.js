const Task = require("../models/Task");
const User = require("../../account/model/User");
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
    let role = req.body.role;
    let user = await User.find({ role: role });
    if(user.length == 0) {
       res.status(500).json({message:"Please Create a User With this role" });
    }
  
    let random = Math.floor(Math.random() * user.length);
    let assignedUser = user[random]._id;
    task.user = assignedUser;
    let assignedTask = await task.save()
    res.status(200).json({ assignedTask });

    
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
