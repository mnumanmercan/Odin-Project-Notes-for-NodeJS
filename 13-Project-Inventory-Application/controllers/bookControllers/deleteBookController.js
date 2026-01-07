import { deleteBooksById, deleteAuthorById, deleteCategoryById  } from "../../db/queries.js";

export async function deleteBook(req, res) {
    const bookId = Number(req.params.id);

    await deleteBooksById(bookId);

    res.redirect('/');
}

export async function deleteAuthor(req, res) {
    const authorId = Number(req.params.id);

    await deleteAuthorById(authorId);

    res.redirect('/');
}

export async function deleteCategory(req, res) {
    const categoryId = Number(req.params.id);

    await deleteCategoryById(categoryId);

    res.redirect('/');
}
