import { getAllMessages } from "../db/queries.js";

export async function indexGet(req, res) {
    const messages = await getAllMessages();

    res.render('index', { title: 'Mini Messageboard', messages: messages });
}