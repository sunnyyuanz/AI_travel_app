const express = require('express');
const router = express.Router();
const Itinerary = require('../models/itinerary');
const mongoose = require("mongoose");

// save a itinerary to under userId
router.post("/save-itinerary", async (req,res) =>{
        try{
                const itinerary = new Itinerary(req.body)
                console.log(itinerary)
                await itinerary.save();
                res.status(201).json(itinerary);
    
        }catch(err){
            console.error(err)
            res.status(500).json({ error:err.message});
        }

})

// Get all itinerary by user Id
router.get("/itinerary/:userId", async(req,res)=>{
    const { userId } = req.params;

    try{
        // Validate that userId is a valid MongoDB ObjectId
        if(!mongoose.isValidObjectId(userId)){
            return res.status(400).json({error:"Invalid user ID format"});
        }

        // Find itineraries where userId matches
        const itinerary = await Itinerary.find({userId});

        // Return trips or an empty array if none exist
        res.status(200).json({success:true,itinerary});
    }catch(error){
        console.error("Error fetching itinerary:",error);
        res.status(500).json({success:false, error:"Server error"});
    }
})

module.exports = router;