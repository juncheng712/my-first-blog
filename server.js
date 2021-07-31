require("dotenv").config({path: "./config.env"});
const express = require("express");
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();


// express middleware
app.use(express.static('public'))
app.use(express.json());
app.use('/blog', require('./routes/blogPage'));
app.use('/user', require('./routes/user'))
app.use(express.urlencoded({ extended: false }));


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// handle error
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}` )
    server.close(() => process.exit(1))
})