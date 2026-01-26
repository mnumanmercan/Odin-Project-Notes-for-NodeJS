import { getAllPosts } from '../db/queries.js';

export const fetchAllPosts = async (req, res) => {
    try {
        const result = await getAllPosts();

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};