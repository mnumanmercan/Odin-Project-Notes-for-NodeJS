const pool = require("./pool.js");

export async function deletePostById(id) {
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
}