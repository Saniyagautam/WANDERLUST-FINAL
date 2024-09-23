const Review=require("../models/review.js");
const Listing=require("../models/listing.js");


module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);//query to find listing using id
    let newReview=new Review(req.body.review);//getting review from form
    newReview.author=req.user._id;//author of review curr user
    listing.reviews.push(newReview);//push the newreview into lsitings collections
    await newReview.save();//saving review 
    await listing.save();//saving lisitng
    req.flash("success","New Review Added!");
    res.redirect(`/listings/${req.params.id}`);
};

module.exports.deletereview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});//pulling out the review arr from listing collections
    await Review.findByIdAndDelete(reviewId);//deleting review from review collection
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);

};
