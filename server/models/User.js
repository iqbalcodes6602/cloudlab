// backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    running: { type: Boolean, default: false },
    serviceId: { type: String, default: 'N/A' },
    role: { type: String, default: 'user' },
});

UserSchema.methods.validPassword = function (password) {
    return password === this.password;
};

UserSchema.pre('save', function (next) {
    next();
});

module.exports = mongoose.model('User', UserSchema);
