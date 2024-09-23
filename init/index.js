const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});//removing all prev data from DB
  initData.data=initData.data.map((obj)=>({...obj,owner:"66e7b504a878cf8b8ccb9813"}));//initialises new db with owner 
  await Listing.insertMany(initData.data);//as it was a obj (we only need key)
  console.log("data was initialized");
};

initDB();
