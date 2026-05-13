const Booking = require('../models/Booking.js')
const Event = require('../models/Event.js')

const bookEvent = async(req, res) => {
    try{
        const eventId = req.body.eventId;
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({ message: 'Event not found' });
        }
        if(event.availableSeats <= 0){
            return res.status(400).json({ message: 'No seats available' });
        }

        const existingBooking = await Booking.findOne({userId : req.user.id, eventId});

        if(existingBooking && existingBooking.status !== 'cancelled'){
            return res.status(400).json({ message: 'Already booked or pending' });
        }

        const booking = await Booking.create({
            userId: req.user.id,
            eventId,
            status: 'pending',
            paymentStatus: 'not_paid',
            amount: event.ticketPrice
        });

        res.status(201).json({ message: 'Booking request submitted', booking });
    }catch(err) {
        res.status(500).json({ message: 'Server Error'});
    }
};

const confirmBooking = async(req, res) => {
    try{
        const {paymentStatus} = req.body;
        const booking = await Booking.findById(req.params.id).populate('userId').populate('eventId');

        if(!booking){
            res.status(404).json({message: "No booking found"})
        }

        if(booking.status === 'confirmed'){
            return res.status(400).json({ message: 'Booking is already confirmed' });
        }

        const event = await Event.findById(booking.eventId._id);
        if(event.availableSeats <= 0){
            return res.status(400).json({ message: 'No seats available to confirm this booking' });
        }

        booking.status = 'confirmed';
        if(paymentStatus){
            booking.paymentStatus = paymentStatus;
        }

        await booking.save();

        event.availableSeats -= 1;
        await event.save();
        
        res.json({ message: 'Booking confirmed successfully', booking });
    }catch(err){
         res.status(500).json({ message: 'Server Error'});
    }
};

const getMyBookings = async(req, res) => {
    try{
        if(req.user.role === 'admin'){
            const allBookings = await Booking.find({}).populate('eventId').sort({createdAt: -1});
            if(allBookings.length === 0){
                 return res.status(404).json({ message: 'No bookings found' });
            }
            res.json(allBookings);
        }
       const bookings = await Booking.find({ userId: req.user.id }).populate('eventId').sort({ createdAt: -1 });
       if(bookings.length === 0){
            return res.status(404).json({ message: 'No bookings found' });
       }
       res.json(bookings);
    }catch(err){
        res.status(500).json({ message: 'Server Error'});
        console.log(err)
    }
};

const cancelBooking = async(req, res) => {
    try{
        const booking = await Booking.findById(req.params.id);
        
        if(!booking){
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        if(booking.userId.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (booking.status === 'cancelled'){
            return res.status(400).json({ message: 'Already cancelled' });
        }

        const wasConfirmed = booking.status === 'confirmed';
        booking.status = 'cancelled';
        await booking.save();

        if(wasConfirmed){
            const event = await Event.findById(booking.eventId);
            if(event){
                event.availableSeats += 1;
                await event.save();
            }
        }

        res.status(200).json({ message: 'Booking cancelled successfully' });

    }catch(err){
        res.status(500).json({ message: 'Server Error'});
    }
};

module.exports = {bookEvent, confirmBooking, getMyBookings, cancelBooking};

