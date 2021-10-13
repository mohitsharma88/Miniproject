var express = require('express');
var router = express.Router();
var SignupModel=require("../schema/signup_table");
/* GET home page. */
// var session=require(express-session);
var fileUpload = require('express-fileupload');


router.get('/', function(req, res, next) {
    console.log("i am inside admin route...")
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.render('admin/account/signup');
});

router.post('/signup', function(req, res, next) {
    var myfile = req.files.file;
    var myfilename = req.files.file.name;
    
    myfile.mv('public/adminphoto/'+myfilename, function(err) {
    if (err)
    throw err;
    //res.send('File uploaded!');
    });
    const mybodydata = {
      email: req.body.email,
      password: req.body.password,
      file:myfilename
    }
    var data = SignupModel(mybodydata);
  
    data.save(function(err){
      if(err){
        console.log("Error in Add Record" + err);
      }else{
        console.log("Record Added");
        res.send("Record Successfully Added")
      }
    })
  
  });



router.get('/login', function(req, res, next) {
  res.render('admin/account/login');
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

router.get('/afterlogin', function(req, res, next) {
  res.render('admin/account/afterlogin');
});

router.get('/Logout',function(req, res, next){
  req.session.destroy();
  res.redirect('/');
})

router.get('/forgot', function(req, res, next) {
  res.render('admin/account/forgot');
});
//Login Process  Method
router.post('/forgot', function (req, res, next) {

  var email = req.body.email; 

  console.log(req.body);
  SignupModel.findOne({ "email": email }, function (err, db_signup_array) {

    console.log("Find One " + db_signup_array);

    if ( db_signup_array) {
      var email =  db_signup_array.email;
      var password =  db_signup_array.password;

    }

    console.log(" db_signup_array.email " + email);
    console.log(" db_signup_array.password " + password);

    if (email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (email == email) {
      "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "demo830870@gmail.com", // generated ethereal user
      pass: "Demo@123" // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "demo830870@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Forgot Password", // Subject line
    text: "Hello your password is "  + password, // plain text body
    html: "Hello your password is "  + password // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.end("Password Sent on your Email");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
// 

main().catch(console.error);


      
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});



router.get('/admindisplay', function(req, res, next) {
    SignupModel.find(function (err, data) {
      // var myfile = req.files.file;
      // var myfilename = req.files.file.name;
  
      // myfile.mv('public/adminphoto/'+myfilename, function(err) {
      //     if (err)
      //     throw err;
      //     //res.send('File uploaded!');
      //     });
        if (err) {
          console.log("Error in Fetch Data " + err);
        } else {
          //Print Data in Console
          console.log(data);
          //Render User Array in HTML Table
          res.render('admin/account/admindisplay', { data: data });
    
        }
      }).lean();
  });

  // router.get('/userdetails', function(req, res, next) {
  //   res.render('admin/account/userdetails');
  // });
  
  // router.post('/userdetails', function(req, res, next) {
  //   const mybodydata = {
  //     user_name : req.body.user_name,
  //     user_email : req.body.email,
  //     user_password : req.body.password,
  //     user_mobile : req.body.u_mo,
  //     user_address : req.body.u_add,
  //     user_file : req.body.u_file
  
  //   }
    
  //   var data = UserModel(mybodydata);
  
  //   data.save(function(err){
  //     if(err){
  //       console.log("Error in Insert");
  //     }else{
  //       console.log("Record Added");
  //       res.redirect('/admin/account/userdetails');
  //     }
  //   })
  
  // });
  

// //Get Single User for Edit Record
// router.get('/edit/:id', function (req, res) {

//   console.log(req.params.id);

//   SignuptModel.findById(req.params.id, function (err,  db_signup_array) {
//     if (err) {
//       console.log("Edit Fetch Error " + err);
//     } else {
//       console.log( db_signup_array);

//       res.render('edit-admin', { product_array: db_products_array });
//     }
//   });
// });

// //Update Record Using Post Method
// router.post('/edit-product/:id', function (req, res) {

//   console.log("Edit ID is" + req.params.id);

//   const mybodydata1 = {
//     p_name : req.body.p_name,
//     p_details : req.body.p_details,
//     p_price : req.body.p_price,
//     p_img : req.body.p_img,
//     p_qty : req.body.p_qty
//   }

//   ProductModel.findByIdAndUpdate(req.params.id, mybodydata1, function (err) {
//     if (err) {
//       console.log("Error in Record Update");
//       res.redirect('/display-product');
//     } else {

//       res.redirect('/display-product');
//     }
//   });
// });

//Get Single User By ID
router.get('/show/:id', function (req, res) {
  console.log(req.params.id);
  SignuptModel.findById(req.params.id, function (err,  db_signup_array) {
    if (err) {
      console.log("Error in Single Record Fetch" + err);
    } else {
      console.log( db_signup_array);

      res.render('admin/account/single-record', { data:  db_signup_array });
    }
  });
});



  //Delete User By ID
  router.get('/delete-record/:id', function (req, res) {
  SignupModel.findOneAndDelete(req.params.id, function (err, project) {
    if (err) {

      console.log("Error in Record Delete " + err);
      res.redirect('/admin/account//admindisplay');
    } else {

      console.log(" Record Deleted ");
      res.redirect('/admin/account//admindisplay');
    }
  });
});

//change password
router.get('/changepass', function(req, res, next) {
  res.render('admin/account/changepass');
});
router.post('/changepass',function(req, res, next){
  if(!req.session.email){
    console.log("Email Session is set")
    res.redirect('/admin/account//login');
  }
  console.log("Home Called" +req.session.email);
    var myemail = req.session.email;
    var opass = req.body.opass;
    var npass = req.body.npass;
    var cpass = req.body.cpass;

SignupModel.findOne({"email" : myemail}, function(err, db_admin_array){

  if(err){
    console.log("Error in old password Fetch"+err)
  }else{
    console.log(db_admin_array);

  if(opass == db_admin_array.password){
    if(opass == npass)
    {
      res.end("New password diffrent from old password");
    }else{
      if(npass == cpass){
        SignupModel.findOneAndUpdate({"email": myemail},{$set: {"password": npass}},function(err){
          if(err){
            res.end("Error in update"+err);
          }else{
            res.end("Password changed")
          }
        });
      }else{
        res.end("new password confirm password not matc");
      }
    }
  }else{
    res.end("old password not match");
  }
  }
});
});

 //Home page
 router.get('/home',function(req, res, next){
  var myemail = req.session.email;
  console.log(myemail);

  //Auth
  if(!req.session.email){
    console.log("Email Session in set");
    res.end("Login required to accrss this page");
  }

  res.render('admin/account/home',{myemail : myemail});
});

//logout page

router.get('/logout',function(req, res, next){

  res.redirect('/admin/account/login');
  req.session.destroy();

})


module.exports = router;
