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


router.get('/home', 
        isLoggedIn, 
        (req, res) => {
          // console.log(req.user + " this is the current user for home")
          // console.log(req.user.username + " this is the current user username")
          // console.log(req.user.department + " this is the current user department")
          // console.log(res.locals.currentUser + " this is the current locals user for home")
  res.render('home')
  // res.render(req.baseUrl +'/home')
});

// SHOW REGISTERATION PAGE
router.get('/register', (req, res) => {
  res.render('user/register');
});

// REGISTER USER
router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username, department: req.body.department}), req.body.password, (err, user) => {
      if (err) {
          console.log(err);
          return res.render('user/register');
      }
      passport.authenticate('local')(req, res, () => {
        // req.flash('success', "Welcome " + " " + user.username);
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