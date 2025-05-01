
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing" // or "Hotel" depending on your model name
        }
    ]
});

userSchema.plugin(passportLocalMongoose); // adds username, hash, salt, etc.

module.exports = mongoose.model("User", userSchema);
