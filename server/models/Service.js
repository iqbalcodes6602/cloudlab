// backend/models/User.js

const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    owner: { type: String },
    image: { type: String },
    serviceName: { type: String },
    containerName: { type: String },
    containerId: { type: String },
    port: { type: Number },
    host: { type: String },
    createdAt: { type: Date },
});


module.exports = mongoose.model('Service', ServiceSchema);