const express = require('express');
const fetchData = require('../../functions/fetchData');
const stockOverview = require('../../functions/stockOverview');
const futuresOverview = require('../../functions/futuresOverview');
const router = express.Router();
const instrumentModule = require("../../models/instrumentModel");
const portfolioModule = require("../../models/portfolioModel");

router.post("/api/search", async (req, res) => {
    console.log("requested api/search")
    const instrument = await instrumentModule.findOne({
        symbol: req.body.symbol.slice(0, req.body.symbol.length-2),
    })
    const portfolio = await portfolioModule.findOne({
        userID: req.session.userID,
    })

    if (instrument && req.body.symbol.length > 2) {
        req.body.instrumentType = "FUTURES"
    }

    if (req.body.instrumentType === 'FUTURES') {
        result = await fetchData(`${process.env.FUTURES_API_LINK}${req.body.symbol}&second=60`)
        try {
            overview = futuresOverview(result, req.body.symbol, instrument.currency)
            if (portfolio !== null) {
                if (portfolio.holdings !== undefined) {
                    overview["portfolio"] = `F-${req.body.symbol}` in portfolio.holdings
                }
                if (portfolio.watchlists !== undefined) {
                    overview["watchlist"] = portfolio.watchlists.includes(`F-${req.body.symbol}`)
                }
            }
            res.json({ success: true, data: { category: "quoteSearch", message: "Data retrieved successfully", stockInfo: [overview]}});
        } catch (error) {
            console.log(error)
            return res.json({ success: false, data: { category: "quoteSearch", message: "Unknown error"} })
        }
    } else {
        result = await fetchData(`${process.env.STOCK_API_LINK}${req.body.symbol}`)
        if (!result.data) {
            return res.json({ success: false, data: { category: "quoteSearch", message: "Unknown error"} })
        }
        try {
            overview = stockOverview(result.data.chart.result[0])
            if (portfolio !== null) {
                if (portfolio.holdings !== undefined) {
                    overview["portfolio"] = `${req.body.symbol}` in portfolio.holdings
                    console.log(portfolio.holdings)
                    console.log(req.body.symbol)
                    console.log(req.body.symbol in portfolio.holdings)
                }
                if (portfolio.watchlists !== undefined) {
                    overview["watchlist"] = portfolio.watchlists.includes(req.body.symbol)
                    console.log(portfolio.watchlists)
                    console.log(req.body.symbol)
                    console.log(req.body.symbol in portfolio.watchlists)
                }
            }
            res.json({ success: true, data: { category: "quoteSearch", message: "Data retrieved successfully", stockInfo: [overview]}});
        } catch (error) {
            console.log(error)
            return res.json({ success: false, data: { category: "quoteSearch", message: "Unknown error"} })
        }
    }
});

module.exports = router;