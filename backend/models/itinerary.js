const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itinerary: [{type: Object}],
  itinerary_costs: {type: Object, required:true},
  title:{type:String, required: true},
  image:{type:String, require:true}
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', ItinerarySchema);