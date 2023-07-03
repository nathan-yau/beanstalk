const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const generateToken = require("./functions/generateToken");

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

app.use((req, res, next) => {
    const allowedDomain = process.env.REACT_LINK;
    const referer = req.headers.referer;
    if (!referer || !referer.includes(allowedDomain)) {
        return res.status(403).json({ success: false, error: "Access denied" });
    }
    next();
});

// Pending Token Security

app.get("/", (req, res) => {
    return res.json({ message: "Welcome to the Beanstalk Investment App!" });
});

const overviews = require("./routes/quotes/overviews");
app.use(overviews);

const validations = require("./routes/authentications/validation");
app.use(validations);

const registrations = require("./routes/authentications/registration");
app.use(registrations);

const logins = require("./routes/authentications/login");
app.use(logins);

// const registration = require("./routes/authentications/registration");
// app.use(registration);





module.exports = app;