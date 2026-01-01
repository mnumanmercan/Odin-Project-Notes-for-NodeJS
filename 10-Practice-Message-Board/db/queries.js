import pool from "./pool.js";

export async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");

    return rows;
}

export async function addNewMessage(message, username) {
    await pool.query("INSERT INTO messages (message, username) VALUES ($1, $2)", [message, username]);
}

export async function deleteMessageById(id) {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}