const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config()

 

const connectDB = mongoose.connect(process.env.DatabaseURL)
if(connectDB){
    console.log("Datase connected ...")
}
else{
    console.log("dabase not connected")
}

module.exports = connectDB
