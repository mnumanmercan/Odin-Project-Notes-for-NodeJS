const bcrypt = require("bcryptjs");
const pool = require("../db/pool.js")

async function signUpGet(req, res) {
    res.render("sign-up");
}

async function signUpPost(req, res, next) {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query("INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)", [
            username,
            email,
            hashedPassword,
        ]);

        res.redirect("/");
    } catch (err) {
        return next(err);
    }
}

module.exports = { signUpGet, signUpPost }