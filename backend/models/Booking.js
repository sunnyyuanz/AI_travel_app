const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  bookingType:{ type: String, required:true },
  details: { type: Object, defaultL:{} },
  status:{ type: String, required:true },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);