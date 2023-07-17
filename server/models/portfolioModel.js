const mongoose = require("mongoose");

const portfolioCollection = mongoose.connection.useDb('account_related')

const userSchema = new mongoose.Schema({
    userID: String,
    holdings: Object,
    watchlists: Array,
    capitalHistory: Object
});


const portfolioModule = portfolioCollection.model("portfolios", userSchema);

module.exports = portfolioModule
