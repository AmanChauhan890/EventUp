const express = require('express');
const router = express.Router();
const { bookEvent, confirmBooking, getMyBookings, cancelBooking } = require('../controllers/bookingsController.js')


router.post('/', bookEvent);
router.put('/:id/confirm', confirmBooking);
router.get('/my', getMyBookings);
router.delete('/:id', cancelBooking);

module.exports = router;