const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirecturl}=require("../middlewares.js");
const userControllers=require("../controllers/users.js");

//signup
router.get("/signup",userControllers.signupform);

router.post("/signup",wrapAsync(userControllers.signup));


//login
router.get("/login",userControllers.loginform);

router.post("/login",    
    saveRedirecturl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
    userControllers.login);

//logout
router.get("/logout",userControllers.logout);

module.exports=router;