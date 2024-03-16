const mongoose = require("mongoose")

const toDoSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toDo:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("toDo", toDoSchema);