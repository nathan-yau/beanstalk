const mongoose = require("mongoose");

const accountsCollection = mongoose.connection.useDb('derivative_data')

const userSchema = new mongoose.Schema({
    symbol: String,
    currency: String,
    multiplier: Number,
});


const instrumentModule = accountsCollection.model("instrument", userSchema);

module.exports = instrumentModule
