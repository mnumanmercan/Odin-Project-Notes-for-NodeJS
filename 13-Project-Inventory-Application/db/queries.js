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
