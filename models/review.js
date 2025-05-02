
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Corrected to use function reference
    },
    author: {
        type: Schema.Types.ObjectId,  // stores user's id
        ref: "User",
    }
});

module.exports = mongoose.model("Review", reviewSchema);
