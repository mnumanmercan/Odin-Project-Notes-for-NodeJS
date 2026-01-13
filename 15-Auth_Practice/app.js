const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const pool = require("./db/pool.js");

const indexRouter = require("./routes/indexRoute.js");
const signUpRouter = require("./routes/signUpRoute.js");

dotenv.config();

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            const match = await bcrypt.compare(password, user.password_hash);

            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];

        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

//
app.use('/', indexRouter);
app.use("/sign-up", signUpRouter);

app.post(
    "/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

app.get("/new-post", (req, res) => res.render("newPost", { user: req.user }));

app.post("/new-post", async (req, res, next) => {
    try {

        // 1. GİRİŞ KONTROLÜ
        if (!req.user) {
            return res.status(401).send("Giriş yapmalısınız");
        }

        const { title, content } = req.body;

        // 3. VALİDASYON
        if (!title || !content) {
            return res.status(400).send("Başlık ve içerik gerekli");
        }

        if (title.trim().length === 0 || content.trim().length === 0) {
            return res.status(400).send("Başlık ve içerik boş olamaz");
        }

        // 4. DATABASE'E EKLE
        await pool.query(
            `INSERT INTO posts (user_id, title, content) 
             VALUES ($1, $2, $3) 
             RETURNING id, title, content, user_id, created_at`,
            [req.user.id, title.trim(), content.trim()]
        );

        // 5. ANA SAYFAYA YÖNLENDİR
        res.redirect("/");
    } catch (err) {
        return next(err);
    }
});

app.get("/posts", async (req, res) => {
    if (req.user) {
        const result = await pool.query(`
                SELECT 
                    p.id,
                    p.title,
                    p.content,
                    p.created_at,
                    u.username
                FROM posts p
                INNER JOIN users u ON p.user_id = u.id
                ORDER BY p.created_at DESC
            `);
        posts = result.rows;
    } else {
        const result = await pool.query(`
                SELECT 
                    id,
                    title,
                    content,
                    created_at
                FROM posts
                ORDER BY created_at DESC
            `);
        posts = result.rows;
    }

    res.render("posts", {
        user: req.user,  // Passport'tan gelir
        posts: posts
    });
});

app.listen(3000, (error) => {
    if (error) {
        throw error;
    }
    console.log("app listening on port 3000!");
});