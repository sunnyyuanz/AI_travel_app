const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  origin: { type: String, required: true},
  destinations: [{ type:String, type: String }],
  budget:{type:String, required: true},
  currency:{type:String, required: true},
  days:{type:Number, required:true},
  groupSize:{type:Number, required:true},
  comfortLevel:{type:String, required:true},
  theme:{type:String, required:false},
  additionalInfo:{type:String, required:false},
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);
