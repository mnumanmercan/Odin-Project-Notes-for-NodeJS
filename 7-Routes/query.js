import express from 'express';

const app = express();
const PORT = 8080;

/**
 * GET /odin/messages?sort=date&direction=ascending will log
 * Params: { username: "odin" }
 * Query: { sort: "date", direction: "ascending" }
 *
 * GET /odin/messages?sort=date&sort=likes&direction=ascending will log
 * Params: { username: "odin" }
 * Query: { sort: ["date", "likes"], direction: "ascending" }
 */
app.get("/:username/messages", (req, res) => {
    console.log("Params:", req.params);
    console.log("Query:", req.query);
    res.end();
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
