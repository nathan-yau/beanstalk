const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
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

app.post("/api/sample", (req, res) => {
    res.json({ ...req.body });
});

module.exports = app;