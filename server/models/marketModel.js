const mongoose = require("mongoose");

const marketCollection = mongoose.connection.useDb('overview_related')

const userSchema = new mongoose.Schema({
    market: String,
    default_instruments: Array,
});


const marketModule = marketCollection.model("default_stocks", userSchema);

module.exports = marketModule
