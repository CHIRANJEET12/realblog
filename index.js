const express = require("express");
const path = require("path");
const userroute = require("./routes/user");
// const User = require('./models/user'); 
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;


mongoose.connect('mongodb://localhost:27017/bloging')
.then(() => {
    console.log("MongoDB connected");
})


// Set view engine to EJS
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

// Set up middleware
app.use(express.urlencoded({extended:false}))

// Define routes
app.get("/", (req, res) => {
    res.render("home");
});
app.use("/user", userroute);

// Start the server
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
