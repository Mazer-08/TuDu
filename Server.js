const express  = require("express");
const mongoose  = require("mongoose");
const cors  = require("cors");
require("dotenv").config();

const routes = require("./routes/ToDoRoutes");

const app = express();
const PORT = process.env.PORT || 5000

app.get('/',(req,res) => {
    res.send("Hello from TuDu!!");
})

//middleware
//to handle cross-origin request
app.use(cors())
app.use(express.json())

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{console.log("MongoDB connected...")})
    .catch((err)=>{console.log(err)});

app.use("/api", routes);

app.listen(PORT, ()=>{console.log(`listening at ${PORT}...`)});
