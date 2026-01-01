import { deleteMessageById } from "../db/queries.js";

export async function deleteUserController(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(404).render('404', { title: 'Not Found' });
    }
    console.log(`User and message deleted for message id: ${id}`);

    await deleteMessageById(id);

    res.redirect('/');
}