const express = require('express');
const router = express.Router();
const  { protect, admin } = require('../middleware/auth.js');
const { bookEvent, confirmBooking, getMyBookings, cancelBooking } = require('../controllers/bookingsController.js')


router.post('/', protect, bookEvent);
router.put('/:id/confirm', protect, admin, confirmBooking);
router.get('/my', protect, getMyBookings);
router.delete('/:id', protect, cancelBooking);

module.exports = router;