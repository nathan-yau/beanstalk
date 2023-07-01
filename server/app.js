const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const fetchData = require('./functions/fetchData');
const convertTimeStamp = require('./functions/convertTimeStamp');
const stockOverview = require('./functions/stockOverview');
const futuresOverview = require('./functions/futuresOverview');
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


app


app.post("/api/overview", async (req, res) => {

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

module.exports = app;