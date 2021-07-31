const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    blogImage: {
        type: String,
    },
    category: {
        type: String,
    },
    blogContent: [
        {
          type: Schema.Types.Mixed,
        },
      ],
    },
    { 
        timestamps:  {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        }
        
    }
    )


module.exports = mongoose.model("Blog", BlogSchema);

