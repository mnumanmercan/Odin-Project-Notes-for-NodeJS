-- PostgreSQL Kitap Envanter Database Şeması

# Kategoriler Tablosu
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Yazarlar Tablosu
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Kitaplar Tablosu
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category FOREIGN KEY (category_id) 
        REFERENCES categories(id) ON DELETE SET NULL
);

# Kitap-Yazar İlişki Tablosu
CREATE TABLE book_authors (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    CONSTRAINT fk_book FOREIGN KEY (book_id) 
        REFERENCES books(id) ON DELETE CASCADE,
    CONSTRAINT fk_author FOREIGN KEY (author_id) 
        REFERENCES authors(id) ON DELETE CASCADE,
    CONSTRAINT unique_book_author UNIQUE (book_id, author_id)
);

### Örnek Veriler
INSERT INTO categories (name) VALUES 
('Roman'),
('Bilim'),
('Tarih'),
('Çocuk');

INSERT INTO authors (name) VALUES 
('Orhan Pamuk'),
('Sabahattin Ali'),
('Zülfü Livaneli');

INSERT INTO books (title, stock_quantity, category_id) VALUES 
('Kar', 15, 1),
('Kürk Mantolu Madonna', 8, 1),
('Serenad', 12, 1);

INSERT INTO book_authors (book_id, author_id) VALUES 
(1, 1),
(2, 2),
(3, 3);

# Yararlı Sorgular

## Tüm kitapları yazarları ve kategorileri ile listele
SELECT 
    b.id,
    b.title,
    b.stock_quantity,
    c.name as category,
    STRING_AGG(a.name, ', ') as authors
FROM books b
LEFT JOIN categories c ON b.category_id = c.id
LEFT JOIN book_authors ba ON b.id = ba.book_id
LEFT JOIN authors a ON ba.author_id = a.id
GROUP BY b.id, b.title, b.stock_quantity, c.name;

## Bir yazarın tüm kitaplarını listele
SELECT b.title, b.stock_quantity
FROM books b
JOIN book_authors ba ON b.id = ba.book_id
WHERE ba.author_id = 1;

## Kategoriye göre kitapları listele
SELECT b.title, b.stock_quantity
FROM books b
WHERE b.category_id = 1;-- Kategoriler Tablosu
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
