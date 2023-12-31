const express = require('express');
const router = express.Router();
const fetchData = require('../../functions/fetchData');
const convertTimeStamp = require('../../functions/convertTimeStamp');
const portfolioModule = require("../../models/portfolioModel");
const accountModule = require("../../models/accountModel");
const instrumentModule = require("../../models/instrumentModel");

router.get("/api/holdings", async (req, res) => {
    console.log("requested api/holdings")
    if (!req.session.userID) {
        return res.json({ success: false, data: {category: "holdings", message: "User not logged in"} })
    }

    const portfolio = await portfolioModule.findOne({
        userID: req.session.userID,
    })

    const user = await accountModule.findOne({
        _id: req.session.userID,
    })

    var currentCapital = user.currentCapital
    var previousCapital = user.currentCapital
    var baseCurrency = user.baseCurrency
    var topgain = [null, 0]
    var toploss = [null, 0]
    var overallLastUpdate = null

    var holdingInstruments = []
    try {
        if (portfolio.holdings === undefined) {
            return res.json({ success: true, data: {empty: true, category: "holdings", message: "No holdings found"} })
        }
        Promise.all(Object.keys(portfolio.holdings).map(async (key) => {
            if (key.slice(0, 2) === "F-") {
                result = await fetchData(`${process.env.FUTURES_API_LINK}${key.slice(2)}&second=60`)
                const dataRows = result.data.split("\r\n").map(x => x.split(","));
                var breakTime = 0
                lastIndex = dataRows.length - 1
                while (breakTime < 1800) {
                    lastIndex = lastIndex - 1
                    breakTime = dataRows[lastIndex][5]-dataRows[lastIndex-1][5]
                }
            
                var relevantDataRows = dataRows.slice(lastIndex - 1, -1);
                var overviewData = relevantDataRows[0]
                var relevantDataRows = relevantDataRows.slice(1, -1);
                previousClose = overviewData[3]
                currentClose = [];
                for (const row of relevantDataRows) {
                    currentClose.push(row[3]);
                    timestamp.push(row[5]);
                }

                const instrument = await instrumentModule.findOne({
                    symbol: key.slice(2, key.length-2),
                })

                currentPrice = Number(currentClose[currentClose.length-1])
                lastUpdate = convertTimeStamp(timestamp[timestamp.length-1]).replace(",", "")
                var instrumentData = {symbol: key.slice(2), lastUpdate: lastUpdate, currentPrice: currentPrice, previousClose: previousClose, currency: instrument.currency}
                portfolio.holdings[key]['position'] === "Long" ? position = 1 : position = -1
                instrumentData['totalPLinLocal'] = ((instrumentData['currentPrice'] - portfolio.holdings[key]['cost'])*position*portfolio.holdings[key]['shares']*instrument.multiplier)
                instrumentData['dailyPLinLocal'] = ((instrumentData['currentPrice'] - previousClose)*position*portfolio.holdings[key]['shares']*instrument.multiplier)
                instrumentData['NotionalValue'] = 0
            } else {
                result = await fetchData(`${process.env.STOCK_API_LINK}${key}`)
                result = result.data.chart.result[0]
                previousClose = result.meta["previousClose"]
                currency = result.meta.currency
                priceHint = result.meta.priceHint
                currentClose = result.indicators.quote[0].close;
                currentClose = currentClose.filter(function (value) {return value != null;})
                currentPrice = Number(currentClose[currentClose.length - 1])
                timestamp = result.timestamp
                lastUpdate = convertTimeStamp(timestamp[timestamp.length - 1]).replace(",", "")
                var instrumentData = {symbol: key, lastUpdate: lastUpdate, currentPrice: currentPrice, previousClose: previousClose, currency: currency}
                portfolio.holdings[key]['position'] === "Long" ? position = 1 : position = -1
                instrumentData['totalPLinLocal'] = (instrumentData['currentPrice'] - portfolio.holdings[key]['cost'])*position*portfolio.holdings[key]['shares']
                instrumentData['dailyPLinLocal'] = (instrumentData['currentPrice'] - previousClose)*position*portfolio.holdings[key]['shares']
                instrumentData['NotionalValue'] = (instrumentData['currentPrice']*portfolio.holdings[key]['shares'])
            }
            if (baseCurrency != instrumentData['currency']) {
                result = await fetchData(`${process.env.STOCK_API_LINK}${instrumentData['currency']}${baseCurrency}=X`)
                rate = result.data.chart.result[0].meta.regularMarketPrice
            } else {
                rate = 1
            }
            if (!overallLastUpdate || overallLastUpdate < lastUpdate) {
                overallLastUpdate = lastUpdate
            }
            instrumentData['dailyPriceDelta'] = (instrumentData['currentPrice'] - previousClose)*position
            console.log(instrumentData['currentPrice'], previousClose, position)
            instrumentData['priceDelta'] = (instrumentData['currentPrice'] - portfolio.holdings[key]['cost'])*position
            instrumentData['percentageDelta'] = (instrumentData['priceDelta'] / (portfolio.holdings[key]['cost']))*100
            instrumentData['percentageDelta'] = instrumentData['percentageDelta'].toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            instrumentData['percentageDelta'] = instrumentData['percentageDelta'] === "-0.00" || instrumentData['percentageDelta'] === "0.00" ? "0.00" : instrumentData['percentageDelta'][0] === "-" ? `(${instrumentData['percentageDelta'].replace("-","")}%)` : `${instrumentData['percentageDelta']}%`
            instrumentData['priceDelta'] = instrumentData['priceDelta'].toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            instrumentData['priceDelta'] = instrumentData['priceDelta'] === "-0.00" || instrumentData['priceDelta'] === "0.00" ? "0.00" : instrumentData['priceDelta'][0] === "-" ? `(${instrumentData['priceDelta'].replace("-","")})` : `+${instrumentData['priceDelta']}`
            instrumentData['dailyPriceDelta'] = instrumentData['dailyPriceDelta'].toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            instrumentData['dailyPriceDelta'] = instrumentData['dailyPriceDelta'] === "-0.00" || instrumentData['dailyPriceDelta'] === "0.00" ? "0.00" : instrumentData['dailyPriceDelta'][0] === "-" ? `(${instrumentData['dailyPriceDelta'].replace("-","")})` : `+${instrumentData['dailyPriceDelta']}`
            instrumentData['totalPLinBase'] = (instrumentData['totalPLinLocal'] * rate).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            instrumentData['totalPLinBase'] = instrumentData['totalPLinBase'] === "-0.00" || instrumentData['totalPLinBase'] === "0.00" ? "0.00" : instrumentData['totalPLinBase'][0] === "-" ? `(${instrumentData['totalPLinBase'].replace("-","")})` : `+${instrumentData['totalPLinBase']}`
            
            instrumentData['dailyPLinBase'] = (instrumentData['dailyPLinLocal'] * rate).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            instrumentData['dailyPLinBase'] = instrumentData['dailyPLinBase'] === "-0.00" || instrumentData['dailyPLinBase'] === "0.00" ? "0.00" : instrumentData['dailyPLinBase'][0] === "-" ? `(${instrumentData['dailyPLinBase'].replace("-","")})` : `+${instrumentData['dailyPLinBase']}`
            instrumentData['dailyPLinBase' ] > topgain[1] ? topgain = [instrumentData['symbol'], instrumentData['dailyPLinBase']] : null
            instrumentData['dailyPLinBase' ] < toploss[1] ? toploss = [instrumentData['symbol'], instrumentData['dailyPLinBase']] : null
            currentCapital += (instrumentData['dailyPLinLocal'] * rate)
            instrumentData['totalPLinLocal'] = instrumentData['totalPLinLocal'].toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            instrumentData['dailyPLinLocal'] = instrumentData['dailyPLinLocal'].toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            instrumentData['currentPrice'] = instrumentData['currentPrice'].toLocaleString('en', { minimumFractionDigits: priceHint? priceHint: 2 })
            instrumentData['shares'] = (portfolio.holdings[key]['shares'] * position).toLocaleString('en', { maximumFractionDigits: 2 })
            instrumentData['shares'] = instrumentData['shares'][0] === "-" ? `(${instrumentData['shares'].replace("-","")})` : instrumentData['shares']
            instrumentData['cost'] = portfolio.holdings[key]['cost'].toLocaleString('en', { minimumFractionDigits: priceHint? priceHint: 2 })
            holdingInstruments.push(instrumentData)
        })).then(() => {
            capitalChange= (currentCapital-previousCapital).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            percentageChange = ((currentCapital-previousCapital) / previousCapital*100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            currentCapital = currentCapital.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            var capitalChart = []
            for (const key in portfolio.capitalHistory) {
                if (portfolio.capitalHistory.hasOwnProperty(key)) {
                const xValue = Number(key);
                const yValue = portfolio.capitalHistory[key];
                capitalChart.push({x: xValue, y: yValue});
                }
            }
            return res.json(
                { success: true, 
                    data: { 
                        empty: false,
                        category: "holdings", 
                        message: "Data retrieved successfully", 
                        baseCurrency: baseCurrency,
                        currentCapital: currentCapital, 
                        capitalChange: capitalChange, 
                        percentageChange: percentageChange, 
                        holding: holdingInstruments, 
                        topGainer: topgain[0], 
                        topLoser: toploss[0], 
                        capitalHistory: capitalChart,
                        lastUpdate: overallLastUpdate
                    } 
                })
        });
    } catch (error) {
        console.log(error)
        return res.json({ success: false, data: {category: "holdings", message: "Error retrieving data"} })
    }
});

router.post("/api/holdings", async (req, res) => {
    console.log("requested api/holdings")
})

module.exports = router;