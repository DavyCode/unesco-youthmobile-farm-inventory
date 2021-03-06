var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    // User = require('../models/user');
    Query = require("../models/query");




// =================
//     ROUTES 
// ===============

//GET HELP-DESK
router.get('/', (req, res) => {
  // find and display all query in database
  Query.find({}, (err, allQuery) => {
    if(err){
        console.log(err)
    }
    res.render('help-desk/help-desk',{allQuery: allQuery});
  });
});

//GET EMERGENCY ROUTE
router.get('/emergency', (req, res) => {
 res.render('help-desk/emergency');
});

//GET FILE QUERY ROUTE
router.get('/query', (req, res) => {
  res.render('help-desk/query');
 });



// POST QUERY ROUTE
router.post('/', (req, res) => {
  var new_query ={
      author :{
        id: req.user._id,
        username: req.user.username,
        department : req.user.department        
    },
    area : req.body.area,
    description : req.body.description,
    problem_nature : req.body.problem_nature
  };
  console.log(new_query);

  Query.create(new_query, function(err, newlyCreatedQuery){
    if(err){
       req.flash("error", "Something Went Wrong");
      }
      req.flash("success", "Your Query has been sent. A member of the helpdesk or admin department will get in touch with you immediately");
      res.redirect("/home");
  });
});


// QUERY SHOW PAGE
router.get('/query/:id', (req, res) => {
    Query.findById(req.params.id, (err, foundQuery) => {
      (err)? console.log(err): res.render("help-desk/show", { foundQuery: foundQuery });
  });
});



// MIDDLEWARE
function isLoggedIn(req, res, next) {
if (req.isAuthenticated()) {
  return next();
}
res.redirect('/login');
}


module.exports = router;