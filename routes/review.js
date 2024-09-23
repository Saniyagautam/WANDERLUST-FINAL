const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");//to handle err
const expressError=require("../utils/expressError.js");//to handle err
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview}=require("../middlewares.js");
const {isLoggedIn,isReviewAuthor}=require("../middlewares.js");
const reviewCOntroller=require("../controllers/reviews.js");

// 6)Review Post route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewCOntroller.createReview));

//7)Review Delete Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewCOntroller.deletereview))
 
module.exports=router;