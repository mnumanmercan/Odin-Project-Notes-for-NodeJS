import { Router } from "express";
import messages from "../data/messages.js";
const indexRouter = Router();


indexRouter.get('/', (req, res) => {
    res.render('index', { title: 'Mini Messageboard' , messages: messages});
});

indexRouter.get('/about', (req, res) => {
    res.render('about', { title: 'About for message board' });
});

export default indexRouter;