import db from '../db.js';
import CustomNotFound from '../errors/CustomNotFound.js';

export const getAuthorById = async (req, res) => {
    const { authorId } = req.params;

    try {
        const author = await db.getAuthorById(Number(authorId));

        if (!author) {
            throw new CustomNotFound(`Author with ID ${authorId} not found.`);
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