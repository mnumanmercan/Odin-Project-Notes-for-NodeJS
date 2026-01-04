import { getBooks } from "../db/queries.js";

export async function indexGet(req, res) {
    try {
        const books = await getBooks();

        res.render('index', { books });
    } catch (error) {
        console.error("Error fetching books:", error);

        res.status(500).send("Internal Server Error");
    }
};