const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust path if needed
const Listing = require('../models/listing'); // Import Listing model

// GET /dashboard
router.get('/', async (req, res) => {
    try {
        // Manually check if the user is logged in
        if (!req.isAuthenticated()) {
            return res.redirect('/login');  // Redirect to login if not authenticated
        }

        // Fetch user data, populate wishlist and reservations
        const user = await User.findById(req.user._id)
            .populate('wishlist')  // Populate wishlist with hotel data
            .populate('reservations');  // Populate reservations with reserved hotel data

        // Fetch the listings hosted by the logged-in user
        const hostedListings = await Listing.find({ owner: req.user._id });

        // Render dashboard and pass the user data and hosted listings
        res.render('dashboard', { user, hostedListings });
    } catch (err) {
        console.error('Error fetching dashboard:', err);
        res.redirect('/');  // Redirect to homepage if there's an error
    }
});

module.exports = router;
