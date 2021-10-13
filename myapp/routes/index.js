var express = require('express');
var router = express.Router();
var SignupModel=require("../schema/signup_table");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function (req, res, next) {

  var email = req.body.Login_email;
  var password = req.body.Login_password;

  console.log(req.body);
  SignupModel.findOne({ "email": email }, function (err, db_admin_array) {

    console.log("Find One " + db_admin_array);

    if (db_admin_array) {
      var db_email = db_admin_array.email;
      var db_password = db_admin_array.password;

    }

    console.log("db_admin_array.email " + db_email);
    console.log("db_admin_array.password " + db_password);

    if (db_email == null ) {
      console.log("If");
      res.end("Email not Found");
    }
    else if ( db_email == email && db_password == password ) {
      // console.log("db_admin_array.email " + email);
      req.session.email = db_email;
      res.render('admin/account/home');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
  });
});

module.exports = router;
