const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, unique: false },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    user_type: { type: String, enum: ['ADMIN', 'MUN', 'CAO', 'ACCOUNT', 'ENGINEER'], default: 'ADMIN' },

});

const User = mongoose.model('User', userSchema);
module.exports = User