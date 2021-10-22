var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');//Load Model
var UserModel=require('../schema/userdetails');
var AreaModel=require('../schema/area');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/userdetails', function(req, res, next) {
  AreaModel.find(function(err, db_area_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_area_array);
        //Render User Array in HTML Table
        res.render('admin/account/userdetails', { mydata : db_area_array });
        
      }
  });

  // res.render('admin/account/userdetails');
});

router.post('/userdetails', function(req, res, next) {
  var myfile = req.files.ufile;
    var myfilename = req.files.ufile.name;
    
    myfile.mv('public/userphoto/'+myfilename, function(err) {
    if (err)
    throw err;
    //res.send('File uploaded!');
    });
  const mybodydata = {
    user_name : req.body.u_name,
    user_gender : req.body.gender,
    user_email : req.body.email,
    user_password : req.body.password,
    user_mobile : req.body.u_mo,
    user_address : req.body.u_add,
    user_file : myfilename,
    _area: req.body._area
  }
  
  var data = UserModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Insert");
    }else{
      console.log("Record Added");
      res.redirect('/admin/user/userdetails');
    }
  })

});


router.get('/userdisplay', function(req, res, next) {
  UserModel.find(function (err, db_user_array) {
    
      if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_user_array);
        //Render User Array in HTML Table
        res.render('admin/account/userdisplay', { mydata: db_user_array });
  
      }
    }).lean();
});
//Delete User By ID
router.get('/delete-record/:id', function (req, res, next) {
  UserModel.findByIdAndDelete(req.params.id, function (err, mydata) {
    if (err) {
      console.log("Error in Record Delete " + err);
      res.redirect('/admin/user/userdisplay');
    } else {
      console.log(" Record Deleted "+mydata);
      res.redirect('/admin/user/userdisplay');
    }
  });
});
  

//Get Single User for Edit Record
router.get('/useredit/:id', function (req, res) {

  console.log(req.params.id);

  UserModel.findById(req.params.id, function (err,  db_user_array) {
    if (err) {
      console.log("Edit Fetch Error " + err);
    } else {
      console.log( db_user_array);

      res.render('admin/account/useredit', { user_array: db_user_array });
    }
  });
});

//Update Record Using Post Method
router.post('/useredit/:id', function (req, res) {
  var myfile = req.files.ufile;
  var myfilename = req.files.ufile.name;
  myfile.mv('public/images/'+myfilename, function(err) {
    if (err)
    throw err;
    //res.send('File uploaded!');
    });

  console.log("Edit ID is" + req.params.id);

  const mybodydata = {
    user_name : req.body.u_name,
    user_gender : req.body.gender,
    user_email : req.body.email,
    user_password : req.body.password,
    user_mobile :req.body.u_mo,
    user_address : req.body.u_add,
    user_file : myfilename,
    _area : req.body._area
    // file:myfilename
  }

  UserModel.findByIdAndUpdate(req.params.id, mybodydata, function (err) {
    if (err) {
      console.log("Error in Record Update");
      res.redirect('/admin/account/userdisplay');
    } else {

      res.redirect('/admin/user/userdisplay');
    }
  });
});

  


module.exports = router;
