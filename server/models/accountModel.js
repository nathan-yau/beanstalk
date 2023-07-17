const mongoose = require("mongoose");

const accountsCollection = mongoose.connection.useDb('account_related')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    credit: Number,
    role: String,
    holding: Array,
    baseCurrency: String,
    currentCapital: Number,
    watchlist: Array,
    capitalHistory: Object
});


const accountModule = accountsCollection.model("accounts", userSchema);

module.exports = accountModule
