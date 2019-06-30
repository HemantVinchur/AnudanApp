const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DonarSchema = new Schema({
    Name: String,
    Email: String,
    Password: String,
    Contact: Number,
    Address: String,
    salt: String,
    createdAt: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('Donar', DonarSchema);
