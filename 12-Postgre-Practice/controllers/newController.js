const db = require("../db/queries.js");

async function createUsernameGet(req, res) {
    res.sendFile("views/new.html", { root: "." });
}

async function createUsernamePost(req, res) {
    const { userName } = req.body;
    await db.insertUsername(userName);
    res.redirect("/");
}

module.exports = {
    createUsernameGet,
    createUsernamePost
};