const express = require('express');
const fetchData = require('../../functions/fetchData');
const stockOverview = require('../../functions/stockOverview');
const futuresOverview = require('../../functions/futuresOverview');
const router = express.Router();
const instrumentModule = require("../../models/instrumentModel");

router.post("/api/overview", async (req, res) => {
    
    const instrument = await instrumentModule.findOne({
        symbol: req.body.symbol.slice(0, req.body.symbol.length-2),
    })

    if (instrument && req.body.symbol.length - 2 > 2) {
        req.body.instrumentType = "FUTURES"
    }

    if (req.body.instrumentType === 'STOCK') {
        result = await fetchData(`${process.env.STOCK_API_LINK}${req.body.symbol}`)
        try {
            overview = stockOverview(result.data.chart.result[0])
            res.json(overview);
        } catch (error) {
            console.log(error)
            res.json({ "error": "true", "message": "Invalid Symbol"});
        }
    } else if (req.body.instrumentType === 'CRYPTOCURRENCY') {
        result = await fetchData(`${process.env.STOCK_API_LINK}${req.body.symbol}`)
        try {
            overview = stockOverview(result.data.chart.result[0])
            res.json(overview);
        } catch (error) {
            res.json({ "error": "true", "message": "Invalid Symbol"});
        }
    } else if (req.body.instrumentType === 'FUTURES') {
        result = await fetchData(`${process.env.FUTURES_API_LINK}${req.body.symbol}&second=60`)
        try {
            overview = futuresOverview(result, req.body.symbol, instrument.currency)
            res.json(overview);
        } catch (error) {
            console.log(error)
            res.json({ "error": "true", "message": "Invalid Symbol"});
        }
    }
});

module.exports = router;