export async function indexGet(req, res) {
    res.render('index', { title: 'Inventory Application' });
}