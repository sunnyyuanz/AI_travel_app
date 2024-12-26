const mongoose = require('mongoose');

const PreferencesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  languages:[
    { type: String, default:"English" }
  ],
  budget: { type: String, required:false },
  budget_currency:{ type: String, required:false },
  interests:[
    { type: String, required:false },
  ],
  weather_preferences:[
    { type: String, default:"80% Sunny days" },
  ],
  dream_destinations: [{ city: String, country: String, coordinates: { lat: Number, lon: Number } }],
}, { timestamps: true });

module.exports = mongoose.model('Preferences', PreferencesSchema);
