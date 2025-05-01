const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust path if needed

// // GET /dashboard
// router.get('/', async (req, res) => {
//     try {
//         // Manually check if the user is logged in
//         if (!req.isAuthenticated()) {
//             return res.redirect('/login');  // Redirect to login if not authenticated
//         }

//         const user = await User.findById(req.user._id).populate('wishlist');
//         res.render('dashboard', { user });
//     } catch (err) {
//         console.error('Error fetching dashboard:', err);
//         res.redirect('/');
//     }
// });
// GET /dashboard
router.get('/', async (req, res) => {
    try {
        // Manually check if the user is logged in
        if (!req.isAuthenticated()) {
            return res.redirect('/login');  // Redirect to login if not authenticated
        }

        const user = await User.findById(req.user._id)
            .populate('wishlist')  // Populate wishlist with hotel data
            .populate('reservations');  // Populate reservations with reserved hotel data

        res.render('dashboard', { user });  // Render dashboard and pass the populated user data
    } catch (err) {
        console.error('Error fetching dashboard:', err);
        res.redirect('/');  // Redirect to homepage if there's an error
    }
});


module.exports = router;
