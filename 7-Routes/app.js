import express from 'express';
import authorRouter from './route/authorRouter.js';
import bookRouter from './route/bookRouter.js';
import indexRouter from './route/indexRouter.js';

const app = express();
const PORT = 8080;

app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use((err, req, res, next) => {
    console.error(err, '--- GLOBAL ERROR HANDLER ---');
    res.status(500).send(err);
});


app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.log(`Library API is running on http://localhost:${PORT}`);
});

