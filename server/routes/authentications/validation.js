const express = require('express');
const router = express.Router();
const accountModule = require("../../models/accountModel");
const validationSchema = require("../../schema/validationSchema");
// const bcrypt = require("bcryptjs");

// router.get("/api/checkSession", async (req, res) => {
//     if (req.session.authenticated) {
//         res.json({ status: "success", message: "Session is valid" });
//     } else {
//         res.json({ status: "failed", message: "Session is invalid" });
//     }
// });

router.post("/api/testing", async (req, res) => {
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
});


// router.post("/api/validation", async (req, res) => {

//     if (req.body.email) {
//         const emailCheck = await accountModule.findOne({
//             email: req.body.email,
//         })
//         if (emailCheck) {
//             return res.json({ target: "email", status: "error", message: "Email already exists" });
//         }
//         const validationResult = validationSchema.validate(req.body);
//         if (validationResult.error !== null && validationResult.error !== undefined) {
//             return res.json({
//                 target: "email", status: "error", message: validationResult.error.details[0].message
//             });
//         }
//         return res.json({ target: "email", status: "success", message: "Email is available" });
//     }

//     if (req.body.username) {
//         const usernameCheck = await accountModule.findOne({
//             username: req.body.username,
//         })

//         if (usernameCheck) {
//             return res.json({ target: "username", status: "error", message: "Username already exists" })
//         }
//         const validationResult = validationSchema.validate(req.body);
//         if (validationResult.error !== null && validationResult.error !== undefined) {
//             return res.json({
//                 target: "username", status: "error", message: validationResult.error.details[0].message
//             });
//         }
//         return res.json({ target: "username", status: "success", message: "Username is available" })
//     }

//     if (req.body.password && !req.body.confirmpassword) {
//         const validationResult = validationSchema.validate(req.body);

//         if (validationResult.error !== null && validationResult.error !== undefined) {
//             return res.json({
//                 target: "password", status: "error", message: validationResult.error.details[0].message
//             });
//         }
//         return res.json({ target: "password", status: "success", message: "Password acceptable." })
//     }

//     if (req.body.confirmpassword && req.body.password) {
//         if (req.body.confirmpassword !== req.body.password) {
//             return res.json({ target: "confirmpassword", status: "error", message: "Password not match" });
//         }
//         console.log("here")
//         return res.json({ target: "confirmpassword", status: "success", message: "Password acceptable." })
//     }

// });

module.exports = router;