import { addNewCategory } from "../../db/queries.js";

export async function newCategoryGet(req, res) {
    res.render("newCategory", { formTitle: "Add New Category" });
}

export async function newCategoryPost(req, res) {
    const { name } = req.body;

    await addNewCategory(name);

    res.redirect('/');
}