import { createUser, getUserByEmail } from '../db/queries.js';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email ve password alanları zorunludur'
            });
        }

        if (!isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Geçersiz email formatı'
            });
        }

        const userExists = await getUserByEmail(email);

        if (userExists.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Bu email adresi zaten kullanılıyor'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await createUser(name, email, hashedPassword);

        return res.status(201).json({
            success: true,
            message: 'Kullanıcı başarıyla oluşturuldu',
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};