const express = require('express');
const router = express.Router();
const marketModule = require("../../models/marketModel");
const fetchData = require('../../functions/fetchData');
const stockOverview = require('../../functions/stockOverview');
const futuresOverview = require('../../functions/futuresOverview');
const instrumentModule = require("../../models/instrumentModel");
const portfolioModule = require("../../models/portfolioModel");

router.post("/api/market", async (req, res) => {
    console.log("requested api/market")
    const market = await marketModule.findOne({
        market: req.body.market,
    })
    const portfolio = await portfolioModule.findOne({
        userID: req.session.userID,
    })

    var stockInfo = []
    if (req.body.market === "Futures") {
        for (index in market.default_instruments) {
            var symbol = market.default_instruments[index].slice(2, market.default_instruments[index].length)
            result = await fetchData(`${process.env.FUTURES_API_LINK}${symbol}&second=60`)
            const instrument = await instrumentModule.findOne({
                symbol: symbol.slice(0, symbol.length - 2),
            })
            try {
                overview = futuresOverview(result, market.default_instruments[index], instrument.currency)
                if (portfolio !== null) {
                    if (portfolio.holdings !== undefined) {
                        overview["portfolio"] = market.default_instruments[index] in portfolio.holdings
                    }
                    if (portfolio.watchlists !== undefined) {
                        overview["watchlist"] = portfolio.watchlists.includes(market.default_instruments[index])
                    }
                }
                stockInfo.push(overview)
            } catch (error) {
                console.log(error)
            }
        }
    } else {
        for (index in market.default_instruments) {
            result = await fetchData(`${process.env.STOCK_API_LINK}${market.default_instruments[index]}`)
            try {
                overview = stockOverview(result.data.chart.result[0])
                if (portfolio !== null) {
                    if (portfolio.holdings !== undefined) {
                        overview["portfolio"] = market.default_instruments[index] in portfolio.holdings
                    }
                    if (portfolio.watchlists !== undefined) {
                        overview["watchlist"] = portfolio.watchlists.includes(market.default_instruments[index])
                    }
                }
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
});

module.exports = router;