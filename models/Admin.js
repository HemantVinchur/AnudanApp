const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AdminSchema = new Schema({
    Email: String,
    Password: String,
    salt: String,
    createdAt: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('Admin', AdminSchema);
