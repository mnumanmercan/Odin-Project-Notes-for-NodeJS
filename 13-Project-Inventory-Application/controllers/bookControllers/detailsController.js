import { getBooks } from "../../db/queries.js";

export async function getTargetBook(req, res) {
    const bookId = Number(req.params.id);
    console.log(`Requested book ID: ${bookId}`);

    if (Number.isNaN(bookId)) {
        return res.status(404).render('404', { title: 'Not Found' });
    }

    const books = await getBooks();
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).render('404', {
            title: 'Book Not Found'
        });
    }

    console.log(`Book details: ${JSON.stringify(book)}`);

    res.render('details', { book });
}