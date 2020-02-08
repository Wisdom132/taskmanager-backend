const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const Admin = require("../model/Admin");

exports.registerNewAdmin = async (req, res) => {
  try {
    let response = await Admin.find({ email: req.body.email });
    if (response.length >= 1) {
      res.status(400).json({ message: "Email Already Exist" });
    } else {
      const admin = new Admin({
        email: req.body.email,
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10)
      });

      let newAdmin = await admin.save();
      res.status(200).json({ data: newAdmin });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
exports.getAllAdmins = async (req, res) => {
  try {
    let response = await Admin.find();
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
exports.adminLogin = async (req, res) => {
  let admin = await Admin.findOne({ email: req.body.email })
    if (!admin) {
        res.status(401).json({ error: "Account not found" });
      }
      await bcrypt.compare(req.body.password, admin.password, (err, result)=> {
        if (err) {
          return res.status(401).json({
            error: "Authentification error"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: admin.email,
              name: admin.name,
              id: admin._id
            },
            "secret",
            { expiresIn: "240h" }
          );

          return res.status(200).json({
            role:"admin",
            message: "Authentification Successful",
            token: token,
            user:admin
          });
        }

      })
};
exports.registerNewUser = async (req, res) => {
  try {
    let response = await User.find({ email: req.body.email });
    if (response.length >= 1) {
      res.status(400).json({ message: "Email Already Exist" });
    } else {
      const user = new User({
        email: req.body.email,
        name: req.body.name,
        role: req.body.role,
        password: await bcrypt.hash(req.body.password, 10)
      });
      let newuser = await user.save();
      res.status(200).json({ data: newuser });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
exports.listAllUsers = async (req, res) => {
  try {
    let response = await User.find().populate("role");
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.userId;
    let userDetails = await User.findOne({ _id: id }, "_id name email");
    res.status(200).json({
      data: userDetails
    });
  } catch (err) {
    res.status(404).json({ error: err, message: "User Not Found" });
  }
};

exports.removeUser = async (req,res) => {
  try {
     const id = req.params.userId;
     let result = await User.remove({_id:id});
     res.status(200).json({data:result})
  }catch(err) {
    res.status(404).json({ error: err, message: "Soemthing Went Wrong" });
  }
}

exports.updateUserInfo = async (req,res)=> {
  try {
      const id = req.params.userId;
    let result = await User.findByIdAndUpdate(id,req.body);
     res.status(200).json({data:result})
  }catch(err) {
 res.status(404).json({ error: err, message: "Soemthing Went Wrong" });
  }
}