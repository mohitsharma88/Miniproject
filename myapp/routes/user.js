var express = require('express');
var router = express.Router();

//Load Model
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
        res.render('admin/user/userdetails', { mydata : db_area_array });
        
      }
  });

  // res.render('admin/account/userdetails');
});

router.post('/userdetails', function(req, res, next) {
  var myfile = req.files.u_file;
    var myfilename = req.files.u_file.name;
    
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

// router.get('/display',function(req,res,next){
//   UserModel.find(function(err,db_user_data){
    
//     if(err){
//       console.log("Error in Fetch Data" + err);
//     }else{
//       console.log("Fetch Data" + db_user_data);
//       res.render('display',{user_array:db_user_data});
//     }
//   }).lean;
// });
router.get('/userdisplay', function(req, res, next) {
  UserModel.find(function (err, db_user_array) {
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
        console.log(db_user_array);
        //Render User Array in HTML Table
        res.render('admin/user/admindisplay', { mydata: db_user_array });
  
      }
    }).lean();
});
// router.get('/delete/:id',function(req,res,next){
//   var deleteid = req.params.id;
//   UserModel.findOneAndDelete(deleteid,function(err,data){
    
//     if(err){
//       console.log("Error in Delete" + err);
//     }else{
//       console.log("Record Deleted");
//       res.redirect('/display');
//     }
//   });
// });

// router.get('/edit/:id',function(req,res,next){
//   var editid = req.params.id;
//   UserModel.findById(editid,function(err,data){
    
//     if(err){
//       console.log("Error in Edit" + err);
//     }else{
//       console.log("Edit Record" + data);
//       res.render('edit',{editdata:data});
//     }
//   }).lean();

// });
// //Update
// router.post('/edit/:id',function(req,res,next){
//   var editid = req.params.id;
  
//   const mybodydata = {
//     user_name : req.body.txt1,
//     user_mobile : req.body.txt2
//   }

//   UserModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    
//     if(err){
//       console.log("Error in Update" + err);
//     }else{
//       console.log("Record Update");
//       res.redirect('/display');
//     }
//   })

// });

module.exports = router;
