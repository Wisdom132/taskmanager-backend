const Priority = require("../models/Priority");

exports.getAllPriority = async (req,res)=> {
    try {
        let response = await Priority.find();
         res.status(200).json({ data: response });

    }catch(err) {
        res.status(500).json({error:err})
    }
}

exports.createNewPriority = async (req,res) => {
    try {
        const priority = new Priority({
            name:req.body.name
        })
            let newpriority = await priority.save();
            res.status(200).json({ data: newpriority });
    }catch(err) {
        res.status(500).json({error:err})
    }
}

exports.deletePriority = async (req,res) => {
     let id = req.params.priorityId
    try {
        let response = await Priority.remove({_id:id});
        res.status(200).json({ data: response,message:"Priority Deleted"});
    }catch(err) {
        res.status(500).json({error:err})
    }
}