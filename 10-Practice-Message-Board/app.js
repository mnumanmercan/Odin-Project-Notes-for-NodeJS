import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import indexRouter from './routes/indexRouter.js';
import newRouter from './routes/newRouter.js';
import userRoute from './routes/userRoute.js';
import deleteRoute from './routes/deleteRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname oluşturma
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "public");

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/', newRouter);
app.use('/messages', userRoute)
app.use('/delete-user', deleteRoute)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});