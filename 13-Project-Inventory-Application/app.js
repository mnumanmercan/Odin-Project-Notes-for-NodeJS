import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bookRouter from './routes/bookRoutes/booksRoute.js';
import detailsRouter from './routes/bookRoutes/detailsRoute.js';
import newBookRouter from './routes/bookRoutes/newBookRoute.js';
import deleteRouter  from './routes/bookRoutes/deleteRoute.js';
import indexRouter from './routes/indexRouter.js';
import categoriesRouter from './routes/categoryRoutes/categoriesRoute.js';
import authorsRouter from './routes/authorRoutes/authorRoute.js';
import newAuthorRouter from './routes/authorRoutes/newAuthorRoute.js';
import newCategoryRouter from './routes/categoryRoutes/newCategoryRoute.js';
import deleteAuthorRouter from './routes/authorRoutes/deleteAuthorRoute.js';
import deleteCategoryRouter from './routes/categoryRoutes/deleteCategoryRoute.js';

// .env dosyasını yükle
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// __dirname oluşturma
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "public");

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

// - - Routes - -
app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use('/books', detailsRouter);
app.use('/new', newBookRouter)
app.use('/delete-book', deleteRouter);
app.use('/categories', categoriesRouter);
app.use('/authors', authorsRouter);
app.use('/new-author', newAuthorRouter);
app.use('/new-category', newCategoryRouter);
app.use('/delete-authors', deleteAuthorRouter);
app.use('/delete-categories', deleteCategoryRouter);


//



app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));