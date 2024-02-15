const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 1001;
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const router = require('./routes/handler')
const connectDB = require('./connect/connect')


// ======== Middlewares ========
app.use(cors({credentials:true, origin: "*"}));
app.use(cookieParser())
app.use("/uploads", express.static(__dirname + '/uploads'))
app.use(express.json())
app.use(bodyParser.json())
app.use("/", router)

// ======== Starting Machine ======
const start = async()=>{
    try {
        await connectDB();
        console.log("Success!!!");
        app.listen(port, ()=>{
            console.log(`TechCorp server started successfully on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()