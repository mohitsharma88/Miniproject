var express = require('express');
var router = express.Router();

//Call User Datab
var AreaModel = require('../schema/area');
var CityModel = require('../schema/city');
// var StateModel = require('../schema/state');
// var SubCategoryModel = require('../schema/subcategory')
//  var CategoryModel = require('../schema/category');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addarea', function(req, res, next) {

    CityModel.find(function(err, db_city_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_city_array);
            //Render User Array in HTML Table
            res.render('area/addarea', { mydata : db_city_array });
            
          }
      }).lean();
  //res.render('add-category');
});


//Add Form Processing using Post Method 
router.post('/addarea', function(req, res, next) {
  console.log(req.body);
 
  //Create an Array 
  const mybodydata = {
    a_name: req.body.addarea,
    _city: req.body._city
   
    }
 
    console.log("Name is "  + req.body.a_name);
    console.log("ID is "  + req.body._city);
 
var data = AreaModel(mybodydata);
 
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
        res.render('area/addarea')
        //res.redirect('addsubcategory');
    }
})

});


 


  router.get('/displayarea', function(req, res, next) {

    AreaModel.find(function(err, db_area_array){
        
        console.log(db_area_array);

        if (err) res.json({message: 'There are no posts here.'});

        AreaModel.find({})
        .populate('_city')
      
          .exec(function(err, db_area_array) {

            console.log(db_area_array);
         
            res.render("area/displayarea", { mydata: db_area_array });
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
  AreaModel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {
        console.log("Error in Record Delete " + err);
          res.redirect('/admin/area/displayarea');
      } else {
        console.log(" Record Deleted ");
          res.redirect('/admin/area/displayarea');
      }
  });
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {

  console.log(req.params.id);
  
  AreaModel.findById(req.params.id, function(err, db_area_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_area_array);

          res.render('area/editarea', { mydata: db_area_array });
      }
  });
});
//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {

  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    a_name: req.body.addarea,
    _city: req.body._city
  }

  AreaModel.findByIdAndUpdate(req.params.id, mybodydata, function(err,data) {
      if (err) {
          console.log("Error in Record Update");
        //   res.redirect('/subcategory/display');
      } else {
        console.log("Successfully edit"+data)
          res.redirect('/admin/area/displayarea');
      }
  });
});


module.exports = router;