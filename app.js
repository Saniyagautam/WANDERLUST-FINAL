const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");//for ejs
const methodOverride=require("method-override");//for put and post 
const ejsMate=require("ejs-mate")//ejs mate(for styling)
const expressError=require("./utils/expressError.js");//to handle err
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const Listing=require("./models/listing.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
const user=require("./routes/user.js");
const {isLoggedIn}=require("./middlewares.js");


app.set("view engine","ejs");//for ejs
app.set("views",path.join(__dirname,"views"));//for ejs
app.use(express.urlencoded({extended:true}));//extracting data from req
app.use(methodOverride("_METHOD"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));//for static files like css

//connect with db
// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
// require('dotenv').config();
// const dburl=process.env.ATLASDB_URL;
const dburl="mongodb+srv://saniagautam725:iz2YOK87Gxsht8RQ@cluster0.r9szy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dburl);
}

// session
const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:"ncdajkkfnvsjcbnj",
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
     console.log("error in mongo session store",err);
})


const sessionOptions={
    store,
    // secret:process.env.secret,
    secret:"ncdajkkfnvsjcbnj",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,//1week (in millisec)
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})


// ROUTERS


//change1
app.get("/", (req, res) => {
    res.render("hero");
});
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

app.use("/", user);


//SEARCH ROUTE
app.post('/search', async(req, res)=> {
    let title = req.body.title;
    const listing = await Listing.findOne({ title: title });
    if(title===""){

    }
    if(listing!=null){
        res.redirect(`/listings/${listing._id}`);
    }
    else{
        req.flash("error","This Listing doesn't exist!");
        res.redirect("/listings");
    }
   
});

app.post("/typeof", async (req, res) => {
    let type = req.body.type;
    try {
        const listings = await Listing.find({ type: type }); // Finds all listings with the matching type
        res.render("listings/filter.ejs",{listings});
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching listings.");
    }
});


//book
app.get("/book/:id", isLoggedIn, async (req, res) => {
    let { id } = req.params;  
    const listing = await Listing.findById(id);  
    if (listing) {
        res.render("listings/book.ejs", { listing });  
    } else {
        res.status(404).send("Listing not found");  
    }
});

app.get("/",(req,res)=>{
    res.redirect("/listings");
})
//for routes not defined
app.all("*",(req,res,next)=>{
    next(new expressError(404,"Page not Found!!!"));
})
//Middleware for err
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
   
})



app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
})
