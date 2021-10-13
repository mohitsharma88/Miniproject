var express = require('express');
var router = express.Router();

//Call User Datab

var CityModel = require('../schema/city');
var StateModel = require('../schema/state');
// var SubCategoryModel = require('../schema/subcategory')
//  var CategoryModel = require('../schema/category');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addcity', function(req, res, next) {

    StateModel.find(function(err, db_state_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_state_array);
            //Render User Array in HTML Table
            res.render('city/addcity', { mydata : db_state_array });
            
          }
      }).lean();
  //res.render('add-category');
});


//Add Form Processing using Post Method 
router.post('/addcity', function(req, res, next) {
  console.log(req.body);
 
  //Create an Array 
  const mybodydata = {
    c_name: req.body.addcity,
    _state: req.body._state
   
    }
 
    console.log("Name is "  + req.body.c_name);
    console.log("ID is "  + req.body._state);
 
var data = CityModel(mybodydata);
 
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
        res.render('city/addcity')
        //res.redirect('addsubcategory');
    }
})

});


 


  router.get('/displaycity', function(req, res, next) {

    CityModel.find(function(err, db_city_array){
        
        console.log(db_city_array);

        if (err) res.json({message: 'There are no posts here.'});

        CityModel.find({})
        .populate('_state')
      
          .exec(function(err, db_city_array) {

            console.log(db_city_array);
         
            res.render("city/displaycity", { mydata: db_city_array });
          })
      });
   
  });


// //Get Single User By ID
// router.get('/show/:id', function(req, res) {
//   console.log(req.params.id);

//   SubCategoryModel.findById(req.params.id, function(err, db_subcategory_array) {


//       if (err) {
//           console.log("Error in Single Record Fetch" + err);
//       } else {

        
//           console.log(db_subcategory_array);

//           res.render('subcategory/single-subcategory-record', { subcategory_array: db_subcategory_array });
//       }
//   });
// });



//Delete User By ID
router.get('/delete/:id', function(req, res) {
  CityModel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {
        console.log("Error in Record Delete " + err);
          res.redirect('/admin/city/displaycity');
      } else {
        console.log(" Record Deleted ");
          res.redirect('/admin/city/displaycity');
      }
  });
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {

  console.log(req.params.id);
  
  CityModel.findById(req.params.id, function(err, db_city_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_city_array);

          res.render('city/edit', { mydata: db_city_array });
      }
  });
});








//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {

  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    c_name: req.body.addcity,
    _state: req.body._state
  }

  CityModel.findByIdAndUpdate(req.params.id, mybodydata, function(err,data) {
      if (err) {
          console.log("Error in Record Update");
        //   res.redirect('/subcategory/display');
      } else {
        console.log("Successfully edit"+data)
          res.redirect('/admin/city/displaycity');
      }
  });
});


module.exports = router;