const Review=require("./models/review.js");
const Listing=require("./models/listing.js");

const {listingSchema}=require("./schema.js");//Joi for validation
const {reviewSchema}=require("./schema.js");//Joi for validation

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","User must be logged in!");
        return res.redirect("/login");
    }
    next();
}
module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

//after logged in,to go back to same page from where user came from 
module.exports.saveRedirecturl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;//save in locals
    }
    next();
}


//check if curr user is owner or not
module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    //authorization to edit
    let listing=await Listing.findById(id);
    if( !listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//check if curr user is author or not of the REVIEW
module.exports.isReviewAuthor=async (req,res,next)=>{
    let {id,reviewId}=req.params;
    //authorization to edit
    let review=await Review.findById(reviewId);
    if( !review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//Validate listings using joi
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    console.log(req.body);
    if(error){
        // let errMsg=error.details.map((el)=>el.message).join(",");
        console.log(error);
        throw new expressError(400,error);
    }
    else{
        next();
    }
};

//Validate review using joi
module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    console.log(req.body);
    if(error){
        // let errMsg=error.details.map((el)=>el.message).join(",");
        console.log(error);
        throw new expressError(400,error);
    }
    else{
        next();
    }
};
