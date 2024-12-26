const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");

// Get all users
router.get('/', async(req, res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

// Login user
router.post("/login", async (req,res) =>{
    const {username} = req.body;

    if(!username){
        return res.status(400).json({message:"Username and password are required."})
    }

    try{
        // Find user by username
        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({ message: "Invalid username" });
        }

        //   // Generate JWT
        // const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        //     expiresIn: "1h",
        // });
        // Send response with the token
        res.status(200).json({ message: "Login successful!", _id:user._id});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error." });
    }

})

// POST create a new user
router.post('/', async (req,res)=> {
    try{
        const {username} = req.body;
        const user = await User.findOne({username});

        if(!user){
            const user = new User(req.body)
            console.log(user)
            await user.save();
            res.status(201).json(user);
        }else{
            res.status(401).json({message:"Username already exists."})
        }

    }catch(err){
        console.error(err)
        res.status(500).json({ error:err.message});
    }
});

module.exports = router;