import messages from "../data/messages.js";
import { Router } from "express";
const userRoute = Router();

userRoute.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(404).render('404', { title: 'Not Found' });
    }

    const message = messages.find(m => m.id === id);

    if (!message) {
        return res.status(404).render('404', {
            title: 'Message Not Found'
        });
    }

    res.render('detail', {
        title: 'Message Detail',
        message
    });
});

export default userRoute;