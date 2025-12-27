import { Router } from "express";
import messages from "../data/messages.js";
const newRouter = Router();

newRouter.get('/new', (req, res) => {
    res.render('form', { title: 'New Message' });
});

newRouter.post('/new', (req, res) => {
    const { userName, messageText } = req.body;

    messages.push({
        id: messages.length + 1,
        text: messageText,
        user: userName,
        added: new Date()
    });
    

    res.redirect('/');
});

export default newRouter;