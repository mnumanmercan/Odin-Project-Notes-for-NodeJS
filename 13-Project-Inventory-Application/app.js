import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import indexRouter from './routes/indexRouter.js';

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

//



app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));