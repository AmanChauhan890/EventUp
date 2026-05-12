const Event = require('../models/Event.js');

const getEvents = async(req,res) => {
    try{
        const filters = {};
        if(req.query.category){
            filters.category = req.query.category;
        };

        if(req.query.search){
            filter.title = {$regex: request.query.search, $options: 'i'};
        };

        const events = await Event.find(filters).populate('createdBy', 'name email');
        res.status(200).json(events);

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
};

const getEventById = async(req,res) => {
    try{
        const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
        if(!event){
            res.status(404).json({message : "Event not found"});
        }
        res.status(200).json(event);
    }catch(err){
        console.log(err)
        res.status(500).json({message : "Server Error"});
    }
};

const createEvent = async(req,res) => {
    try{
        const { title, description, date, location, category, totalSeats, ticketPrice, image} = req.body;
        const event = await Event.create({
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            availableSeats: totalSeats,
            ticketPrice: ticketPrice || 0,
            image: image || '',
            createdBy: '6a2da461f59faa65a5125d2d',
        });

        res.status(201).json(event);
    }catch(err){
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }
};

const updateEvent = async(req,res) => {
    try{
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        if(!event){
            res.status(404).json({message: "Event not found"});
        }
        res.json(event);
    }catch(err){
        res.status(500).json({message : "Server Error"});
    }
};

const deleteEvent = async(req,res) => {
    try{
        const event = await Event.findByIdAndDelete(req.params.id);
        if(!event){
            res.status(404).json({message: "Event not found"});
        }
        res.status(200).json({message: "Successfully Deleted"})
    }catch(err){
        console.log(err)
        res.status(500).json({message : "Server Error"});
    }
};

module.exports = {getEvents, getEventById, createEvent, updateEvent, deleteEvent};