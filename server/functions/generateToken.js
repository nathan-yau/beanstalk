const bcrypt = require("bcryptjs");


// For all visitors
module.exports = async function generateToken() {
    const salt = await bcrypt.genSalt(10);
    const token = await bcrypt.hash(`3892hndBfei82he2whdbnh324`, salt);
    return token;
}