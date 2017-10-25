var express = require('express'),
    router = express.Router(),
    Inventory = require("../models/inventory");

//     // middleware = require('../middleware');

// SHOW ALL INVENTORY
router.get("/", function(req, res) {
    Inventory.find({}, (err, allinventory) => {
        if(err){
            console.log(err)
        }
        res.render('inventory/inventory', {allInventory : allinventory} );        
    })
});


//NEW - LIVESTOCK
router.get("/new", 
// isLoggedIn, 
function(req, res) {
    res.render("inventory/new");
});


router.get("/about", 
// isLoggedIn, 
function(req, res) {
    res.render("inventory/about");
});






// CREATE - make new livestock inventory in DB
router.post("/", 
isLoggedIn, 
function(req, res) {

    //function for amount
    function total() {
        if(req.body.number_livestock_fed){
            return req.body.number_livestock_fed * 1000;
        }
        return 0 * 1000;
    };

// get data from form add to inventory page
var new_inventory = { 
    // REPORT
    report: req.body.report, 
    //FEED RECORD
    fed_livestock: req.body.fed_livestock, 
    tons_of_feed : req.body.tons_of_feed,
    number_livestock_fed : req.body.number_livestock_fed,
    // .............................................................
     //LIVESTOCK RECORD
     selected_livestock: req.body.selected_livestock, 
     available_livestock: req.body.available_livestock,
    //   ........................................................  
    //HEALTH RECORD
    health_selected_livestock: req.body.health_selected_livestock, 
    death: req.body.death,
    birth : req.body.birth,
    vaccinated : req.body.vaccinated,
    sick : req.body.sick,
    // ..................................................
    //AUTHOR
    author: {
        id: req.user._id,
        username: req.user.username,
        department : req.user.department        
    },
    amount : total()
    // {
    //     type: Number,
    //     total: function(){
    //          return InventorySchema.number_livestock_fed * 1000;
    //      }
    //  },
};
// console.log( new_inventory.report +" " + new_inventory.fed_livestock+" " + new_inventory.tons_of_feed+" " +new_inventory.number_livestock_fed+" " + new_inventory.selected_livestock +" " +new_inventory.available_livestock+" " + new_inventory.health_selected_livestock+" " + new_inventory.death+" " + new_inventory.birth+" " + new_inventory.vaccinated+" " +new_inventory.sick+" " +new_inventory.author + " " +"from post route NEW INVENTORY!!!!!!!");
// console.log(new_inventory.author.department + " NOW THIS IS THE DEPARTMENT IT EXIST");
// create a new campground and save to db
Inventory.create(new_inventory, function(err, newlyCreated) {
    (err) ? console.log(err): res.redirect("/inventory");
});
});






router.get("/:id", 
// isLoggedIn, 
function(req, res) {
//   console.log("get livestock_new!!!!!!!!!!!!!!!!!");
    res.render("inventory/show");
});




// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
  };
module.exports = router;
