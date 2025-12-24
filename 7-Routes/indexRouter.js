import { Router } from "express";
const indexRouter = Router();

indexRouter.get('/', (req, res) => res.send('Welcome To Library API'));
indexRouter.get('/about', (req, res) => res.send('This is a simple library API'));
indexRouter.get('/contact', (req, res) => res.send('Contact us at contact@library.com'));
indexRouter.post('/contact', (req, res) => {
    console.log('Contact form submitted');
    res.send('Thank you for contacting us!');
});

export default indexRouter;