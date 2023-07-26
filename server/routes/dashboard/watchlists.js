const express = require('express');
const router = express.Router();
const fetchData = require('../../functions/fetchData');
const convertTimeStamp = require('../../functions/convertTimeStamp');
const portfolioModule = require("../../models/portfolioModel");
const instrumentModule = require("../../models/instrumentModel");
const stockOverview = require('../../functions/stockOverview');
const futuresOverview = require('../../functions/futuresOverview');
const { symbol } = require('joi');

router.get("/api/watchlists", async (req, res) => {
    console.log("requested api/watchlists")
    if (!req.session.userID) {
        return res.json({ success: false, data: {category: "watchlists", message: "User not logged in"} })
    }

    const portfolio = await portfolioModule.findOne({
        userID: req.session.userID,
    })
    try {
        if (portfolio.watchlists === undefined || portfolio.watchlists.length === 0) {
            return res.json({ success: true, data: {empty: true, category: "watchlists", message: "No watchlists found"} })
        }
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
                        if (portfolio.holdings !== undefined) {
                            overview["portfolio"] = portfolio.watchlists[index] in portfolio.holdings
                        }
                        overview["watchlist"] = true
                    stockInfo.push(overview)
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                    result = await fetchData(`${process.env.STOCK_API_LINK}${portfolio.watchlists[index]}`)
                    try {
                        overview = stockOverview(result.data.chart.result[0])
                        if (portfolio.holdings !== undefined) {
                            overview["portfolio"] = portfolio.watchlists[index] in portfolio.holdings
                        }
                        overview["watchlist"] = true
                        stockInfo.push(overview)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            return res.json({ success: true, 
                data: { 
                    empty: false,
                    category: "watchlists", 
                    message: "Data retrieved successfully", 
                    stockInfo: stockInfo
                }
            })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, data: {category: "watchlists", message: "Error retrieving data"} })
    }
});

router.post("/api/watchlists", async (req, res) => {
    console.log("requested api/portfolio")
    console.log(req.body)
    const mode = req.body.mode
    const action = req.body.action
    var symbol = req.body.instrumentName
    const portfolio = await portfolioModule.findOne({
        userID: req.session.userID,
    })
    const instrument = await instrumentModule.findOne({
        symbol: symbol.slice(0, symbol.length - 2),
    })
    symbol = instrument === null ? symbol : `F-${symbol}`
    console.log(symbol)
    if (portfolio === null) {
        return res.json({ success: false, data: {category: "portfolio", message: "Error retrieving data"} })
    }
    if (portfolio.watchlists === undefined || portfolio.watchlists.length === 0) {
        return res.json({ success: true, data: {empty: true, category: "portfolio", message: "No watchlists found"} })
    }
    if (action === "add") {
        if (portfolio.watchlists.includes(symbol)) {
            return res.json({ success: false, data: {category: "portfolio", message: "Symbol already in watchlist"} })
        }
        portfolio.watchlists.push(symbol)
        try {
            portfolio.save()
            return res.json({ success: true, data: {category: "portfolio", message: "Symbol added to watchlist"} })
        }
        catch (error) {
            console.log(error)
            return res.json({ success: false, data: {category: "portfolio", message: "Error adding symbol"} })
        }
    }
    if (action === "remove") {
        if (!portfolio.watchlists.includes(symbol)) {
            return res.json({ success: false, data: {category: "portfolio", message: "Symbol not in watchlist"} })
        }
        portfolio.watchlists.splice(portfolio.watchlists.indexOf(symbol), 1)
        try {
            portfolio.save()
            return res.json({ success: true, data: {category: "portfolio", message: "Symbol removed from watchlist"} })
        }
        catch (error) {
            console.log(error)
            return res.json({ success: false, data: {category: "portfolio", message: "Error removing symbol"} })
        }
    }
    console.log(portfolio[mode])
    return res.json({ success: false, data: {category: "portfolio", message: "Unknown error"} })
})

module.exports = router;