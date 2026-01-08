import { deleteBooksById } from "../../db/queries.js";

export async function deleteBook(req, res) {
    const bookId = Number(req.params.id);

    await deleteBooksById(bookId);

    res.redirect('/');
}