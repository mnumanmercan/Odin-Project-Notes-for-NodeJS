const db = require("../db/queries.js");

async function searchUserName(req, res) {
    const { search } = req.query;
    const usernames = await db.getAllUsernames();
    const filteredUsernames = usernames.filter(user => user.username.includes(search));
    console.log("Search Result: ", filteredUsernames);
    res.send("Search Result: " + filteredUsernames.map(user => user.username).join(", "));
}

module.exports = { searchUserName };