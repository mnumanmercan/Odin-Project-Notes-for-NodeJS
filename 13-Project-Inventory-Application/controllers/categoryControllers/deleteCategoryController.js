import { deleteCategoryById } from "../../db/queries.js";

export async function deleteCategory(req, res) {
    const categoryId = Number(req.params.id);

    try {
        await deleteCategoryById(categoryId);
        res.redirect('/categories?success=true');
    } catch (error) {
        res.redirect('/categories?error=' + encodeURIComponent(error.message));
    }
}