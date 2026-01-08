import { deleteAuthorById  } from "../../db/queries.js";

export async function deleteAuthor(req, res) {
    const authorId = Number(req.params.id);

    await deleteAuthorById(authorId);

    res.redirect('/');
}