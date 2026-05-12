const express = require('express');
const router = express.Router();
const  { protect, admin } = require('../middleware/auth.js');
const {getEvents, getEventById, createEvent, updateEvent, deleteEvent} = require('../controllers/eventsController.js');

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', protect, admin, createEvent);
router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);



module.exports = router;