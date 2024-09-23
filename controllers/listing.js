//WRITING CALLBACK OF LISTING HERE
const Listing=require("../models/listing.js");

module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});//getting all listing (query)
    res.render("listings/index.ejs",{allListings});//render the listings
};

module.exports.rendernewform=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.addlisting=async (req,res)=>{
    let listing=req.body.listing;//retrieving the data from form
    const newListing=new Listing(listing);
    newListing.owner=req.user._id;//owner will be curr user id
    await newListing.save();//saving the newlisting into DB(query)
    req.flash("success","New Listing Added!");
    res.redirect("/listings");
};

module.exports.showlistings=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing. findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");//getting current listing (query)
    if(!listing){
        req.flash("error","Listing doesn't exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.rendereditform=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);//getting current listing (query)
    if(!listing){
        req.flash("error","Listing doesn't exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
};

module.exports.updatelisting=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});//Query
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deletelisting=async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success"," Listing Deleted!");
    res.redirect("/listings");
};