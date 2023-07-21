const express = require('express');
const router = express.Router();
const accountModule = require("../../models/accountModel");
const validationSchema = require("../../schema/validationSchema");
const bcrypt = require("bcryptjs");

router.post("/api/login", async (req, res) => {
    console.log("requested api/login")
    const user = await accountModule.findOne({
        username: req.body.username,
    })

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        req.session.premission = "authenticated"
        req.session.username = user.username;
        req.session.email = user.email;
        req.session.credit = user.credit;
        req.session.userID = user._id;
        return res.json({ success: true, data: { category: "login", message: "Login successful"} })
    } else if (!user){
        return res.json({ success: false, data: { category: "login", message: "Username does not exist"} })
    } else if (!bcrypt.compareSync(req.body.password, user.password)){
        return res.json({ success: false, data: { category: "login", message: "Password is incorrect"} })
    } else {
        return res.json({ success: false, data: { category: "login", message: "Error logging in"} })
    }
});

router.get("/api/logout", (req, res) => {
    req.session.destroy();
    res.json({ status: "success", message: "Logout successfully" });
});

module.exports = router;