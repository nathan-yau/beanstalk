const express = require('express');
const fetchData = require('../../functions/fetchData');
const stockOverview = require('../../functions/stockOverview');
const futuresOverview = require('../../functions/futuresOverview');
const router = express.Router();
const instrumentModule = require("../../models/instrumentModel");

router.post("/api/search", async (req, res) => {
    console.log("requested api/search")
    const instrument = await instrumentModule.findOne({
        symbol: req.body.symbol.slice(0, req.body.symbol.length-2),
    })

    if (instrument && req.body.symbol.length > 2) {
        req.body.instrumentType = "FUTURES"
    }

    if (req.body.instrumentType === 'FUTURES') {
        result = await fetchData(`${process.env.FUTURES_API_LINK}${req.body.symbol}&second=60`)
        try {
            overview = futuresOverview(result, req.body.symbol, instrument.currency)
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
            res.json({ success: true, data: { category: "quoteSearch", message: "Data retrieved successfully", stockInfo: [overview]}});
        } catch (error) {
            console.log(error)
            return res.json({ success: false, data: { category: "quoteSearch", message: "Unknown error"} })
        }
    }
});

module.exports = router;