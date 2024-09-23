const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");//to handle err
const expressError=require("../utils/expressError.js");//to handle err
const {isLoggedIn}=require("../middlewares.js");
const {isOwner,validateListing}=require("../middlewares.js");
const listingController = require("../controllers/listing.js");



//1) INDEX ROUTE
router.get("/",wrapAsync(listingController.index));

//3) CREATE ROUTE
router.get("/new",isLoggedIn,listingController.rendernewform);

//3.1)CREATE ROUTE (add a new listing)
router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.addlisting));

//2) SHOW ROUTE
router.get("/:id",wrapAsync(listingController.showlistings));

//4)Create Update ROUTE
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.rendereditform));

//4.1)Update route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updatelisting));

//5)DELETE ROUTE
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deletelisting));

module.exports= router;