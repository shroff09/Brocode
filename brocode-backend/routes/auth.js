const bcrypt = require('bcrypt');
const {User} = require('../model/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


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
        cart: req.user.cart,
        history: req.user.history
    });
});


router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});



//router.post('/', async (req,res) => {
  //  const {error} = validate(req.body);
    //if (error) return res.status(400).send(error.details[0].message);
    
    //let user = await User.findOne({email: req.body.email });
    //if (!user)  return res.status(400).send('invalid email or password.');
    
  //  const validPassword = await bcrypt.compare(req.body.password,user.password);
    // if(!validPassword)  return res.status(400).send('invalid email or password');

//     res.send(true);
//});
//
  //  function validate(req){
    //const schema = {
      //  email: joi.string().min(5).max(30).required().email(),
        //password: joi.string().min(5).max(40).required()
  //  };

//    return joi.validate(req, schema);
//};

module.exports = router;