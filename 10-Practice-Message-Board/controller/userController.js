import { getAllMessages } from "../db/queries.js";

export async function getTargetUser(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(404).render('404', { title: 'Not Found' });
    }

    const messages = await getAllMessages();
    const message = messages.find(m => m.id === id);

    if (!message) {
        return res.status(404).render('404', {
            title: 'Message Not Found'
        });
    }

    console.log(`Found message: ${message.row}`);

    res.render('detail', {
        title: 'Message Detail',
        message
    });
}