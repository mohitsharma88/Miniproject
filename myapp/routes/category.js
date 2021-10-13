var express = require('express');
var router = express.Router();

//Call User Database Model
var CategoryModel = require('../schema/category');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/addcategory', function(req, res, next) {
  // res.send("connection to category")
  res.render('category/addcategory');
});


//Add Form Processing using Post Method 
router.post('/addcategory', function(req, res, next) {
  console.log(req.body);

  //Create an Array 
  const mybodydata = {
    c_name: req.body.addcategory
}
var data = CategoryModel(mybodydata);
 
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
        res.render('category/addcategory');
    }
})

});




router.get('/displaycategory', function(req, res, next) {

    CategoryModel.find(function(err, db_category_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_category_array);
        //Render User Array in HTML Table
        res.render('category/displaycategory', { mydata : db_category_array });
        
      }
  });
 
});

//Delete User By ID
router.get('/delete/:id', function(req, res) {
    CategoryModel.findOneAndDelete(req.params.id, function(err, project) {
      if (err) {
        console.log("Error in Record Delete " + err);
          
      } else {

          console.log(" Record Deleted ");
          res.redirect('/admin/category/displaycategory');
      }
  });
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {

  console.log(req.params.id);
  
  CategoryModel.findById(req.params.id, function(err, db_category_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_category_array);

          res.render('category/edit', { mydata: db_category_array });
      }
  });
});
//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {

  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    c_name: req.body.addcategory ,
  }

  CategoryModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update"+err);
          
      } else {
        console.log("Edit Successfull");
          res.redirect('/admin/category/displaycategory');
      }
  });
});


module.exports = router;