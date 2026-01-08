import { addNewAuthor } from "../../db/queries.js";

export async function newAuthorGet(req, res) {
    res.render("newAuthor", { formTitle: "Add New Author" });
}

export async function newAuthorPost(req, res) {
    const { name } = req.body;

    await addNewAuthor(name);

    res.redirect('/');
}