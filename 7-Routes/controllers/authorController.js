import db from '../db.js';

export const getAuthorById = async (req, res) => {
    const { authorId } = req.params;

    try {
        const author = await db.getAuthorById(Number(authorId));

        if (!author) {
            res.status(404).sendFile('./404.html', { root: '.' });
            return;
        }

        res.send(
            `<h1>Author Details</h1>
            <p>ID: ${author.id}</p>
            <p>Name: ${author.name}</p>`
        );
    } catch (error) {
        console.error("Error retrieving author:", error);
        res.status(500).send('Internal Server Error');
    }
};