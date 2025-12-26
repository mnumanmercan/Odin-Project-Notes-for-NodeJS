import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname oluşturma
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "public");

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));

// app.js
// app.js

const links = [
    { href: "/", text: "Home" },
    { href: "about", text: "About" },
];

const users = ["Rose", "Cake", "Biff"];

const footerMessage = "© 2024 My Website. All rights reserved.";

app.get("/", (req, res) => {
    res.render("index", { links: links, users: users, footerMessage: footerMessage });
});

app.get("/about", (req, res) => {
    res.render("about", { message: "About Us", links: links, footerMessage: footerMessage });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});