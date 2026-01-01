const db = require("../db/queries.js");

async function deleteAllUsers(req, res) {
    await db.deleteAllUsers();

    console.log("All users deleted.");
    res.redirect("/");
}

module.exports = {
    deleteAllUsers
};