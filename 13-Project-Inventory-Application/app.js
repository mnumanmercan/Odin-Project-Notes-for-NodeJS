import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bookRouter from './routes/bookRoutes/booksRoute.js';
import detailsRouter from './routes/bookRoutes/detailsRoute.js';
import newBookRouter from './routes/bookRoutes/newBookRoute.js';
import { deleteRouter, deleteAuthorRouter, deleteCategoryRouter} from './routes/bookRoutes/deleteRoute.js';
import indexRouter from './routes/indexRouter.js';
import categoriesRouter from './routes/categoryRoutes/categoriesRoute.js';
import authorsRouter from './routes/authorRoutes/authorRoute.js';
import newAuthorRouter from './routes/authorRoutes/newAuthorRoute.js';

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
app.use('/book', detailsRouter);
app.use('/new', newBookRouter)
app.use('/delete-book', deleteRouter);
app.use('/categories', categoriesRouter);
app.use('/authors', authorsRouter);
app.use('/new-author', newAuthorRouter);
app.use('/delete-author', deleteAuthorRouter);
app.use('/delete-category', deleteCategoryRouter);


//



app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));