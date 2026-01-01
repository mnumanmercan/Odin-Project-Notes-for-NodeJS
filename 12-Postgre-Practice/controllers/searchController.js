const db = require("../db/queries.js");
const pool = require("../db/pool.js");


async function searchUserName(req, res) {
    try {
        const search = req.query.search || '';
        const result = await db.searchUserName(search);

        res.json(result);
        console.log('RESULTS:', result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { searchUserName };