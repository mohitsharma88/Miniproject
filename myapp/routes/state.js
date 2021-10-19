var express = require('express');
var router = express.Router();

//Call User Database Model
var StateModel = require('../schema/state');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addstate', function(req, res, next) {
  res.render('state/addstate');
});


//Add Form Processing using Post Method 
router.post('/addstate', function(req, res, next) {
  console.log(req.body);

  //Create an Array 
  const mybodydata = {
    s_name: req.body.addstate
}
var data = StateModel(mybodydata);
 
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
        res.render('state/addstate');
    }
})

});




router.get('/displaystate', function(req, res, next) {

    StateModel.find(function(err, db_state_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_state_array);
        //Render User Array in HTML Table
        res.render('state/displaystate', { state_array : db_state_array });
        
      }
  });
 
});




//Get Single User By ID
// router.get('/show/:id', function(req, res) {
//   console.log(req.params.id);
//   CountryModel.findById(req.params.id, function(err, db_country_array) {
//       if (err) {
//           console.log("Error in Single Record Fetch" + err);
//       } else {
//           console.log(db_country_array);

//           res.render('country/single-country-record', { country_array: db_country_array });
//       }
//   });
// });



//Delete User By ID
router.get('/delete/:id', function(req, res) {
    StateModel.findOneAndDelete(req.params.id, function(err, project) {
      if (err) {

        console.log("Error in Record Delete " + err);
          res.redirect('/state/displaystate');
      } else {

        console.log(" Record Deleted ");
          res.redirect('/admin/state/displaystate');
      }
  });
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {

  console.log(req.params.id);
  
  StateModel.findById(req.params.id, function(err, db_state_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_state_array);

          res.render('state/editstate', { state_array: db_state_array });
      }
  });
});

//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {

  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    s_name: req.body.addstate
  }

  StateModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update"+err);
          // res.redirect('/state/edit');
      } else {
        console.log("Edit Successfull");
          res.redirect('/admin/state/displaystate');
      }
  });
});


module.exports = router;