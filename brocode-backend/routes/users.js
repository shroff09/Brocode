var {User, validate} = require('../model/user');
const {auth} = require("../middleware/auth");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const async = require('async');

//===================================
//               user
//===================================


router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});


//router.post('/',async (req,res,next) => {
  //  try{
    //const {error} =  validate(req.body);
//    if (error) return res.status(400).send(error.details[0].message);
//
  //  let user = await User.findOne({email: req.body.email},function (err,user) {
    //    if (err) {
   //         throw err ;
    //} else {
      //   return user;
  //  }
    
//});
  //  if (user) return res.status(400).send('user already registered.');

//    user = new User({
  //      name : req.body.name,
    //    email: req.body.email,
      //  password: req.body.password,
  //  });
  //  await user.save();

//    res.send('user');
//} catch (err) {
  //  next(err);
//}
//});

module.exports = router;