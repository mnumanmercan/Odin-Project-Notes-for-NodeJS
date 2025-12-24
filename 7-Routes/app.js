import express from 'express';
import authorRouter from './authorRouter.js';
import bookRouter from './bookRouter.js';
import indexRouter from './indexRouter.js';

const app = express();
const PORT = 8080;

app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);


app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.log(`Library API is running on http://localhost:${PORT}`);
});

