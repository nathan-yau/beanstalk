const mongoose = require("mongoose");

const accountsCollection = mongoose.connection.useDb('account_related')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    credit: Number,
    role: String,
    baseCurrency: String,
    currentCapital: Number
});


const accountModule = accountsCollection.model("accounts", userSchema);

module.exports = accountModule
