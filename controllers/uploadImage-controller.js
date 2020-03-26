// // Requiring our models and passport as we've configured it
// const db = require("../models");
// let passport = require("../config/passport");
// const express = require('express');
// const router = express.Router();


//  router.post('/api/images', parser.single("image"), (req, res, next) => {
//     console.log("mesaaaaaay = " , req.file) // to see what is returned to you
//     const image = {};
//     image.url = req.file.url;
//     image.id = req.file.public_id;
//     image.userId = req.params.id;
  
//     db.Image.create(image) // save image information in database
//     .then(newImage =>
//        res.json(newImage)
//        )
//     .catch(err => 
//       console.log(err)
//       );
  
//   });
  
//   router.get("/api/images/:id", (req, res) => {
  
//     db.Image.findOne({
//         where: {
//           id: req.params.id
//         }
//       }).then(function (image) {
//         res.json(image);
//         // res.redirect(307, "/api/login");
//       })
//       .catch(err => {
//         res.status(401).json(err);
//       });
//   });
  

//   module.exports ={
//      router
//   }