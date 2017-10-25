var mongoose = require("mongoose");

// Inventory schema
var InventorySchema = mongoose.Schema({
    createdAt:{
        type: Date,
        default: Date.now
       },
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        department : String,
        username : String
      },
    report : String,
    // livestock: {
    selected_livestock : String,
    available_livestock : Number,
    //   },
    // health : {
    health_selected_livestock : String,
    death : Number,
    birth : Number,
    vaccinated : Number,
    sick : Number,
    //   },
    // feed : {
    fed_livestock : String,
    tons_of_feed : Number,
    number_livestock_fed : Number,
    amount : Number
    // }  
});

module.exports = mongoose.model("Inventory", InventorySchema);



// [
//     livestock: {
//         selected_livestock : String,
//         available_livestock : Number,
//       },
//     health : {
       
//         health_livestock : String,
//         death : Number,
//         birth : Number,
//         vaccinated : Number,
//         sick : Number,
//     });
    
// ]
// feedSchema : {
//     fed_livestock : String,
//     tons_of_feed : Number,
//     fed : Number,
//     amount : {
//        type: Number,
//        total: function(){
//             return this.fed * 20;
//         }
//     },
// });

// module.exports = mongoose.model("Feed", feedSchema);

