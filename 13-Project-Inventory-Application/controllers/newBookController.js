import { addNewBook, getCategories, getAuthors } from "../db/queries.js";

export async function newBookGet(req, res) {
    const categories = await getCategories();
    const authors = await getAuthors();
    res.render("new", { formTitle: "Add New Book", categories, authors });
}

export async function newBookPost(req, res) {
    const { title, stock_quantity, category_id, authors_id } = req.body;

    await addNewBook(title, stock_quantity, category_id, authors_id);

    res.redirect('/');
}