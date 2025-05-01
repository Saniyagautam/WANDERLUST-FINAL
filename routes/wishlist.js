const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Add to Wishlist without using middleware
router.post('/add/:id', async (req, res) => {
    try {
        // Check if the user is logged in (check for req.user)
        if (!req.isAuthenticated()) {
            // If user is not logged in, redirect to login or any other page
            return res.redirect('/login'); // Or any other route
        }

        const user = await User.findById(req.user._id);
        const hotelId = req.params.id; // hotelId from route parameter
        
        // Add to wishlist if not already added
        if (!user.wishlist.includes(hotelId)) {
            user.wishlist.push(hotelId);
            await user.save();
        }

        res.redirect('back');  // Change this to a known valid path

    } catch (err) {
        console.error('Error adding to wishlist:', err);
        res.redirect('back');
    }
});
// Remove from Wishlist without using middleware
router.post('/remove/:id', async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }

        const user = await User.findById(req.user._id);
        const hotelId = req.params.id;

        // Remove hotelId from wishlist
        user.wishlist = user.wishlist.filter(id => id.toString() !== hotelId.toString());
        await user.save();

        res.redirect('back'); // Redirects to the previous page

    } catch (err) {
        console.error('Error removing from wishlist:', err);
        res.redirect('back');
    }
});


module.exports = router;
