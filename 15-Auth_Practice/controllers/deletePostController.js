const pool = require("../db/pool.js")

async function deletePost(req, res) {
    const postId = Number(req.params.id);

    await pool.query("DELETE FROM posts WHERE id = $1", [postId]);

    res.redirect("/posts")
}

module.exports = { deletePost }