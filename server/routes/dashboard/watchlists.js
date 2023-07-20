const express = require('express');
const router = express.Router();
const fetchData = require('../../functions/fetchData');
const convertTimeStamp = require('../../functions/convertTimeStamp');
const portfolioModule = require("../../models/portfolioModel");
const instrumentModule = require("../../models/instrumentModel");
const stockOverview = require('../../functions/stockOverview');
const futuresOverview = require('../../functions/futuresOverview');

router.get("/api/watchlists", async (req, res) => {
    console.log("GET /api/watchlists")
    if (!req.session.userID) {
        return res.json({ success: false, data: {category: "dashboard", message: "User not logged in"} })
    }

    const portfolio = await portfolioModule.findOne({
        userID: req.session.userID,
    })
    try {
        console.log(portfolio.watchlists)
        var stockInfo = []
        for (index in portfolio.watchlists) {
            if (portfolio.watchlists[index].slice(0, 2) === "F-") {
                var symbol = portfolio.watchlists[index].slice(2, portfolio.watchlists[index].length)
                const instrument = await instrumentModule.findOne({
                    symbol: portfolio.watchlists[index].slice(2, portfolio.watchlists[index].length-2)
                })
                result = await fetchData(`${process.env.FUTURES_API_LINK}${symbol}&second=60`)
                try {
                    overview = futuresOverview(result, symbol, instrument.currency)
                    stockInfo.push(overview)
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                    result = await fetchData(`${process.env.STOCK_API_LINK}${portfolio.watchlists[index]}`)
                    try {
                        overview = stockOverview(result.data.chart.result[0])
                        stockInfo.push(overview)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            return res.json({ success: true, 
                data: { 
                    category: "overview", 
                    message: "Data retrieved successfully", 
                    stockInfo: stockInfo
                }
            })
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;