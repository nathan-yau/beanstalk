const express = require('express');
const fetchData = require('../../functions/fetchData');
const stockOverview = require('../../functions/stockOverview');
const futuresOverview = require('../../functions/futuresOverview');
const router = express.Router();

router.post("/api/overview", async (req, res) => {

    if (req.body.instrumentType === 'STOCK') {
        result = await fetchData(`${process.env.STOCK_API_LINK}${req.body.symbol}`)
        try {
            overview = stockOverview(result.data.chart.result[0])
            // console.log(overview)
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
            overview = futuresOverview(result, req.body.symbol)
            res.json(overview);
        } catch (error) {
            console.log(error)
            res.json({ "error": "true", "message": "Invalid Symbol"});
        }
    }
});

module.exports = router;