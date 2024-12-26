const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const mongoose = require("mongoose");

// Post a trip request to trip database
router.post("/trip-requests", async (req,res) =>{
        try{
                const trip = new Trip(req.body)
                console.log(trip)
                await trip.save();
                res.status(201).json(trip);
    
        }catch(err){
            console.error(err)
            res.status(500).json({ error:err.message});
        }

})

// Get all trip request by user Id
router.get("/trip-requests/:userId", async(req,res)=>{
    const { userId } = req.params;

    try{
        // Validate that userId is a valid MongoDB ObjectId
        if(!mongoose.isValidObjectId(userId)){
            return res.status(400).json({error:"Invalid user ID format"});
        }

        // Find trips where userId matches
        const trips = await Trip.find({userId});

        // Return trips or an empty array if none exist
        res.status(200).json({success:true,trips});
    }catch(error){
        console.error("Error fetching trips:",error);
        res.status(500).json({success:false, error:"Server error"});
    }
})

module.exports = router;