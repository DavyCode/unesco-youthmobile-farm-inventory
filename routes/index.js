var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');




// =================
//     ROUTES 
// ===============
router.get('/', (req, res) => {
  res.render('user/login');
});


router.get('/home', isLoggedIn, (req, res) => {
    res.render('home')
});

// SHOW REGISTERATION PAGE
router.get('/register', (req, res) => {
  res.render('user/register');
});

// REGISTER USER
router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username, department: req.body.department}), req.body.password, (err, user) => {
      if (err) {
          req.flash('error', err.message);
          return res.render('user/register');
      }
      passport.authenticate('local')(req, res, () => {
          req.flash('success', "Thanks " + " " + user.username + " for choosing Agrotech..a perfect solution for your farm inventories");
          res.redirect('/home')
      });
  })
});


// Login Routes
router.get('/login', (req, res) => {
  res.render('user/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login'
}), (req, res) => {
    //  if(err){
    //   req.flash('error', "Please provide accurate login details");  
    //  }
    //  req.flash('success', "Welcome " + " " + req.user.username);     
});

//ADMIN LOGIN
// router.get('/admin', (req, res) => {
//   res.render('user/admin');
// });


// router.post('/admin', passport.authenticate('local', {
//   successRedirect: '/home',
//   failureRedirect: '/admin'
// }), (req, res) => {

// });





// LOGOUT ROUTE
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', "Goodbye")
  res.redirect('/')
});



// MIDDLEWARE
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
}


module.exports = router;