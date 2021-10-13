var express = require('express');
var router = express.Router();

//Call User Datab
var ProductModel = require('../schema/product');
var SubCategoryModel = require('../schema/subcategory')
//  var CategoryModel = require('../schema/category');
var fileUpload = require('express-fileupload');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addproduct', function(req, res, next) {

    SubCategoryModel.find(function(err, db_subcategory_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_subcategory_array);
            //Render User Array in HTML Table
            res.render('product/addproduct', { mydata : db_subcategory_array });
            
          }
      });
  //res.render('add-category');
});


//Add Form Processing using Post Method 
router.post('/addproduct', function(req, res, next) {
  // console.log(req.body);
 
    var myfile = req.files.productimg;
    var myfilename = req.files.productimg.name;

    myfile.mv('public/productphoto/'+myfilename, function(err) {
        if (err)
        throw err;
        //res.send('File uploaded!');
        });

  //Create an Array 
  const mybodydata = {
    p_name: req.body.addproduct,
    p_details:req.body.productdetails,
    p_price:req.body.productprice,
    p_qty:req.body.productqty,
    p_img:myfilename,
    _subcategory: req.body._subcategory
   
    }
 
    console.log("Name is "  + req.body.s_name);
    console.log("ID is "  + req.body._subcategory);
 
var data = ProductModel(mybodydata);
 
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record"+err);
    } else {
        res.render('product/addproduct')
        //res.redirect('addsubcategory');
    }
})

});


 


  router.get('/displayproduct', function(req, res, next) {

    ProductModel.find(function(err, data){
        ProductModel.find({}).populate('_subcategory').exec(function(err, data) {
            if(err){
              console.log('Error in display'+err);
            }else{
              console.log('Successfully Displayed'+data);
              res.render("product/displayproduct",{ mydata: data });
            }
          })
      }).lean();
   
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



// //Delete User By ID
// router.get('/delete/:id', function(req, res) {
//   SubCategoryModel.findByIdAndDelete(req.params.id, function(err, project) {
//       if (err) {
//         console.log("Error in Record Delete " + err);
//           res.redirect('/admin/subcategory/displaysubcategory');
//       } else {
//         console.log(" Record Deleted ");
//           res.redirect('/admin/subcategory/displaysubcategory');
//       }
//   });
// });



// //Get Single User for Edit Record
// router.get('/edit/:id', function(req, res) {

//   console.log(req.params.id);
  
//   SubCategoryModel.findById(req.params.id, function(err, db_subcategory_array) {
//       if (err) {
//           console.log("Edit Fetch Error " + err);
//       } else {
//           console.log(db_subcategory_array);

//           res.render('subcategory/edit', { subcategory_array: db_subcategory_array });
//       }
//   });
// });








// //Update Record Using Post Method
// router.post('/edit/:id', function(req, res) {

//   console.log("Edit ID is"+ req.params.id);

//   const mybodydata = {
//     s_name: req.body.addsubcategory,
//     _category: req.body._category
//   }

//   SubCategoryModel.findByIdAndUpdate(req.params.id, mybodydata, function(err,data) {
//       if (err) {
//           console.log("Error in Record Update");
//         //   res.redirect('/subcategory/display');
//       } else {
//         console.log("Successfully edit"+data)
//           res.redirect('/admin/subcategory/displaysubcategory');
//       }
//   });
// });


module.exports = router;