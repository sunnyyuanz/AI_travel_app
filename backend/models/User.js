const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: false},
    lastName: { type: String, required: false},
    phone:{ type: Number, required: false},
    email: { type: String, required: false},
    username:{ type: String, required: true},
    password: { type: String, required: false},
    preferences:{type: Object, default:{}},},
{ timestamps:true });

module.exports = mongoose.model('User', UserSchema);
