const express = require('express');
const router = express.Router();
const accountModule = require("../../models/accountModel");
const validationSchema = require("../../schema/validationSchema");
const bcrypt = require("bcryptjs");

router.post("/api/register", async (req, res) => {

    // Check if any missing input
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.confirmPassword) {
        console.log("Missing input")
        return res.json({ status: "error", message: "Missing input" });
    }

    // Check if username or email already exists
    const existingUser = await accountModule.findOne({
        username: req.body.username,
    })
    const existingEmail = await accountModule.findOne({
        email: req.body.email,
    })

    if (existingUser || existingEmail) {
        return res.json({ success: false, data: { category: "registration", message: "Username or email already exists"} })
    }

    // Validate the input
    const validationResult = validationSchema.validate(req.body);
    if (validationResult.error !== null && validationResult.error !== undefined) {
        return res.json({ success: false, data: { category: "registration", message: validationResult.error.details[0].message} })
    }

    // Check if password and confirm password match
    if (req.body.password !== req.body.confirmPassword) {
        return res.json({ success: false, data: { category: "registration", message: "Password and confirm password do not match"} })
    }


    password = await bcrypt.hash(req.body.password, 10);
    // Create a new user
    const newUser = new accountModule({
        username: req.body.username,
        email: req.body.email,
        password: password,
        credit: 1000,
        role: "user"
    })
    
    newUser.save().then(async () => {
        console.log("New user created");
        req.session.authenticated = true;
        req.session.guest = false;
        req.session.username = req.body.username;
        req.session.email = req.body.email;
        const user = await accountModule.findOne({
            username: req.session.username,
        })
        req.session.userID = user._id;
        return res.json({ success: true, data: { category: "registration", message: "New user created"} })
    }).catch((err) => {
        console.log(err);
        return res.json({ success: false, data: { category: "registration", message: "Error creating new user"} })
    })

});

module.exports = router;