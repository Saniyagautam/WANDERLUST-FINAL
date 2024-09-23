const User=require("../models/user.js");

module.exports.signupform=(req,res)=>{
    res.render("users/signup.ejs"); 
};

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);//passport fn to automatically check all the condns
        req.login(registeredUser,(err)=>{//to automatically login the user if signedup
            if(err){
                return next(err);
            }
            req.flash("success","Successfully Registered !")
            res.redirect("/listings");
        })
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.loginform=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","Successfully logged in ! ");
    let redirectUrl=res.locals.redirectUrl || "/listings";//for direct login there is no prev page (thus check condn)
    if (redirectUrl.startsWith("/listings/") && redirectUrl.includes("/reviews/")) {
        redirectUrl = "/listings";//for deleting reviews when not logged in(after login go /listings)
    }
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })
};