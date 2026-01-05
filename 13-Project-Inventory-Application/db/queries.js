import pool from "./pool.js";

export async function getBooks() {
    const { rows } = await pool.query(`SELECT 
        b.id,
        b.title,
        b.stock_quantity,
        c.name as category,
        STRING_AGG(a.name, ', ') as authors
        FROM books b
        LEFT JOIN categories c ON b.category_id = c.id
        LEFT JOIN book_authors ba ON b.id = ba.book_id
        LEFT JOIN authors a ON ba.author_id = a.id
        GROUP BY b.id, b.title, b.stock_quantity, c.name;`);
        
    return rows;
}

export async function getCategories() {
    const { rows } = await pool.query(`SELECT * FROM categories;`);
    return rows;
}

export async function getAuthors() {
    const { rows } = await pool.query(`SELECT * FROM authors;`);
    return rows;
}

export async function addNewBook(title, stockQuantity, categoryId, authorIds) {
    // authorIds'in array olduğundan emin ol
    const authorIdsArray = Array.isArray(authorIds) ? authorIds : [authorIds];

    const { rows } = await pool.query(
        `INSERT INTO books (title, stock_quantity, category_id) VALUES ($1, $2, $3) RETURNING *`,
        [title, stockQuantity, categoryId]
    );

    const bookId = rows[0].id;

    for (const authorId of authorIdsArray) {
        await pool.query(
            `INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2)`,
            [bookId, authorId]
        );
    }

    return rows[0];
}

export async function deleteBooksById(id) {
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
}

export async function updateBookInfo(bookId, title, stockQuantity, categoryId) {
    const { rows } = await pool.query(
        `UPDATE books SET title = $2, stock_quantity = $3, category_id = $4 WHERE id = $1 RETURNING *`,
        [bookId, title, stockQuantity, categoryId]
    );

    return rows[0];
}