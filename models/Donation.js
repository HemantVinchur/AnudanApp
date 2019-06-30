const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DonationSchema = new Schema({
    donarName: String,
    Email: String,
    Contact: Number,
    Address: String,
    Amount: Number,
    createdAt: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('Donation', DonationSchema);
