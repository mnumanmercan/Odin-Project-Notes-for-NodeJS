import prisma from "../db/db.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return res.status(400).send("User with this email already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hashing to be implemented
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        res.redirect("/login");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
            where: { 
                email
            }
        });

        if (!user) {
            return res.status(400).send("Invalid email or password.");
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send("Invalid email or password.");
        }

        console.log("User logged in:", user.email);
        req.session.userId = user.id;
        res.redirect("/dashboard", { user });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Sunucu hatası"
        });
    }
}