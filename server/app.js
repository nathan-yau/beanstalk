const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const fetchData = require('./functions/fetchData');
const convertTimeStamp = require('./functions/convertTimeStamp');
dotenv.config();

app.set('views', process.env.VIEW_PATH);
app.use(express.static(__dirname + '/../frontend/public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup the MongoStore for storing session data
var dbStore = MongoStore.create({
    mongoUrl: `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`,
    collection: "sessions",
    crypto: {
        secret: process.env.MONGODB_SESSION_SECRET,
    },
});

// Setup the session middleware
app.use(
    session({
        secret: process.env.NODE_SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
        store: dbStore,
        saveUninitialized: false,
        resave: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Beanstalk Investment App!" });
});

app.post("/api/stockQuery", async (req, res) => {
    result = await fetchData('stock', req.body.symbol)
    try{
        stockMeta = {}
        stockMeta['symbol'] = result.data.chart.result[0].meta.symbol
        stockMeta['currency'] = result.data.chart.result[0].meta.currency
        stockMeta['exchangeName'] = result.data.chart.result[0].meta.exchangeName
        stockMeta['instrumentType'] = result.data.chart.result[0].meta.instrumentType
        stockMeta['previousClose'] = result.data.chart.result[0].meta.previousClose

        chartData = []
        high = result.data.chart.result[0].indicators.quote[0].high
        low = result.data.chart.result[0].indicators.quote[0].low
        close = result.data.chart.result[0].indicators.quote[0].close
        open = result.data.chart.result[0].indicators.quote[0].open
        volume = result.data.chart.result[0].indicators.quote[0].volume
        stockMeta['min_y_axis'] = Math.min(...low)
        timestamp = result.data.chart.result[0].timestamp
        exchangeTimezoneName = result.data.chart.result[0].meta.exchangeTimezoneName
        priceHint = result.data.chart.result[0].meta.priceHint
        const priceData = timestamp.map((time, index) => [
            Number(Number(open[index]).toFixed(priceHint)), 
            Number(Number(high[index]).toFixed(priceHint)), 
            Number(Number(low[index]).toFixed(priceHint)), 
            Number(Number(close[index]).toFixed(priceHint))]
            )
        for (var i = 0; i < timestamp.length; i++) {
            timestamp[i] = convertTimeStamp(timestamp[i], exchangeTimezoneName)
        }
        for (var i = 0; i < timestamp.length; i++) {
            if (!(priceData[i].includes(0))) {
                chartData.push({"x": timestamp[i], "y": priceData[i]})
            }
        }
        res.json({ stockMeta, chartData });
    } catch (error) {
        res.json({ "error": "true", "message": "Invalid Symbol"});
    }
});

module.exports = app;