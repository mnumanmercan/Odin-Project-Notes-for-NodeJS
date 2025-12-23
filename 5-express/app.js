const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.get("/", (req, res) => res.send("Hello Worlasdqwed!"));

app.get("/qwe", (req, res) => res.send("About Page"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.groupCollapsed(`My first express server is running on http://localhost:${PORT}`);
})