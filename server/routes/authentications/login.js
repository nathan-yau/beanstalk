const express = require('express');
const router = express.Router();
const accountModule = require("../models/accountModel");
const validationSchema = require("../schema/validationSchema");
const bcrypt = require("bcryptjs");

router.post("/api/login", async (req, res) => {
    const user = await accountModule.findOne({
        username: req.body.username,
    })

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        req.session.authenticated = true;
        req.session.username = user.username;
        req.session.email = user.email;
        res.json({ status: "success", message: "Login successfully" });
    } else if (!user){
        res.json({ status: "failed", message: "Username does not exist" });
    } else if (!bcrypt.compareSync(req.body.password, user.password)){
        res.json({ status: "failed", message: "Password is incorrect" });
    } else {
        res.json({ status: "failed", message: "Login failed" });
    }
});

router.get("/api/logout", (req, res) => {
    req.session.destroy();
    res.json({ status: "success", message: "Logout successfully" });
});

module.exports = router;