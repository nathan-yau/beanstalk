const express = require('express');
const router = express.Router();
const accountModule = require("../../models/accountModel");
const validationSchema = require("../../schema/validationSchema");

router.get("/api/checkSession", async (req, res) => {
    console.log("requested api/checkSession")
    res.cookie('connectionValid', true, { expires: new Date(Date.now() + 2 * 60 * 60 * 1000) });
    if (req.session.premission === "authenticated") {
        const user = await accountModule.findOne({
            _id: req.session.userID,
        })
        credit = user.credit.toLocaleString('en')
        return res.json({ success: true, data: { category: "authorized-session", message: "User is authorized", userInfo: {username: user.username, credit: credit}} })
    } else if (req.session.premission === "guest") {
        return res.json({ success: true, data: { category: "guest-session", message: "User is a guest", userInfo: null} })
    } else {
        req.session.premission = "guest";
        return res.json({ success: true, data: { category: "guest-session", message: "Guest session created", userInfo: null} })
    }
});

router.post("/api/validation", async (req, res) => {
    console.log("requested api/validation")
    if (req.body.username) {
        const usernameCheck = await accountModule.findOne({
            username: req.body.username,
        })

        if (usernameCheck) {
            return res.json({ success: false, data: { category: "username", message: "Username already exists"} })
        }
        const validationResult = validationSchema.validate(req.body);
        if (validationResult.error !== null && validationResult.error !== undefined) {
            return res.json({ success: false, data: { category: "username", message: validationResult.error.details[0].message} })
        }
        return res.json({ success: true, data: { category: "username", message: "Username is available"} })
    }

    if (req.body.email) {
        const emailCheck = await accountModule.findOne({
            email: req.body.email,
        })
        if (emailCheck) {
            return res.json({ success: false, data: { category: "email", message: "Email already exists"} })
        }
        const validationResult = validationSchema.validate(req.body);
        if (validationResult.error !== null && validationResult.error !== undefined) {
            return res.json({
                success: false, data: { category: "email", message: validationResult.error.details[0].message}
            });
        }
        return res.json({ success: true, data: { category: "email", message: "Email is available"} })
    }

    if (req.body.password && !req.body.confirmpassword) {
        const validationResult = validationSchema.validate(req.body);

        if (validationResult.error !== null && validationResult.error !== undefined) {
            return res.json({
                success: false, data: { category: "password", message: validationResult.error.details[0].message}
            });
        }
        return res.json({ success: true, data: { category: "password", message: "Password acceptable."} })
    }

});

module.exports = router;