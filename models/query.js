var mongoose = require("mongoose");

// Inventory schema
var querySchema = mongoose.Schema({
    createdAt:{
        type: Date,
        default: Date.now
        // Math.floor( Date.now() / 1000)
       },
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        department : String,
        username : String
      },
    area : String,  
    problem_nature : String,
    description : String
});

module.exports = mongoose.model("Query", querySchema);

