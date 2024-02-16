const ToDoModel = require("../models/ToDoModel");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await UserModel.create({ username, password });
    console.log(user);
    if (user) {
      res.status(200).send({ msg: "User Created" });
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      // Duplicate key error, username already exists
      return res.status(400).json({ error: "Username already exists" });
    }
    console.log("err", error);
  }
};

module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    let isExist = await UserModel.findOne({ username });
    if (!isExist) {
      res.status(400).send({ loginErr: 1, msg: "Not a registered user." });
    } else {
      let match = isExist.password == password;
      if (match) {
        const { _id } = isExist;
        const token = jwt.sign({ _id, username }, process.env.JWT_SECURE_KEY);
        console.log("User Authenticated");
        return res.status(200).send({ msg: "User Authenticated", token });
      } else {
        res.status(400).send({ loginErr: 2, msg: "Wrong Password" });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.getToDos = async (req, res) => {
  try {
    if(req.headers.authorization){
      const token = req.headers.authorization;
      const decodedToken = jwt.decode(token);
      const ownerId = decodedToken._id;
      // console.log(token, decodedToken, ownerId);
      const toDos = await ToDoModel.find({ owner: ownerId });
      res.send(toDos);
    }
  } catch (error) {
    console.log(error);
    res.send(400).send(error);
  }
};

module.exports.saveToDos = async (req, res) => {
  try {
    if(req.headers.authorization){
      const { toDo } = req.body;
      const token = req.headers.authorization;
      const decodedToken = jwt.decode(token);
      const owner = decodedToken._id;
      let task = await ToDoModel.create({ owner, toDo });
      console.log(task);
      res.status(200).json({msg:"Added a Task"});
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

module.exports.updateToDos = (req, res) => {
  const { id } = req.params;
  const { toDo } = req.body;

  ToDoModel.findByIdAndUpdate(id, { toDo })
    .then((data) => {
      console.log("Updated Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log("lg gyw");
      console.log(err);
      res.send({ error: err, msg: "Something went wrong! :(" });
    });
};

module.exports.deleteToDos = (req, res) => {
  const { id } = req.params;
  const data = ToDoModel.findByIdAndDelete(id)
    .then(() => {
      console.log("Deleted Successfully...");
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong! :(" });
    });
};
