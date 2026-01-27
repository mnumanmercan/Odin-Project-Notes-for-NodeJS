import { getAllPosts, getPostById, createPostQuery } from '../db/queries.js';

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

export const fetchPostById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Geçersiz post ID'
            });
        }

        const result = await getPostById(parseInt(id));

        if (!result.rows.length) {
            return res.status(404).json({
                success: false,
                message: 'Post bulunamadı'
            });
        }

        return res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createPost = async (req, res) => {
    const { title, content, category_id } = req.body;

    try {
        if (!title || !content || !category_id) {
            return res.status(400).json({
                success: false,
                message: 'Title, content ve category_id alanları zorunludur'
            });
        }

        const result = await createPostQuery(
            title,
            content,
            parseInt(category_id),
            req.user.id
        );

        return res.status(201).json({
            success: true,
            message: 'Post başarıyla oluşturuldu',
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};