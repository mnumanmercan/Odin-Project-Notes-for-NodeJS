import { addNewMessage } from "../db/queries.js";

export async function createMessageGet(req, res) {
    res.render('form', { title: 'New Message' });
}

export async function createMessagePost(req, res) {
    const { userName, messageText } = req.body;

    await addNewMessage(messageText, userName);

    console.log(`New message and user added. User: ${userName}, Message: ${messageText} `);
    res.redirect("/");
}