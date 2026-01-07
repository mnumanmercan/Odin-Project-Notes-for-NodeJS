import { getAuthors } from "../../db/queries.js";

export async function authorsGet(req, res) {
    const authors = await getAuthors();

    res.render('authors', { title: 'Authors', authors });
}