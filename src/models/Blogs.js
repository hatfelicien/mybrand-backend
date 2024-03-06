const mongoose = require('mongoose');



const blogsSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    desc : {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    }, 
    likes: {
        type: [String],
        default: []
    }

})

 const Blogs = mongoose.model("Blogs", blogsSchema);

module.exports = Blogs