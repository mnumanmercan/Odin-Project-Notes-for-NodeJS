import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.sendFile('./index.html', { root: '.' }))
app.get('/about', (req, res) => res.sendFile('./about.html', { root: '.' }))
app.get('/contact-me', (req, res) => res.sendFile('./contact.html', { root: '.' }))

app.use((req, res) => {
    res.status(404).sendFile('./404.html', { root: '.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});