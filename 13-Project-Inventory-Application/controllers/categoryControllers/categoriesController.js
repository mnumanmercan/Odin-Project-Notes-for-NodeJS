import { getCategories } from "../../db/queries.js";

export async function categoriesGet(req, res) {
    const categories = await getCategories();

    res.render('categories', { title: 'Categories', categories });
}