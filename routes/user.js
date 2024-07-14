import express from 'express';
import userControllers from '../controllers/user.js';

const router = express.Router();


// Route to render the login page
router.get(['/', '/login'], (req, res) => {
    res.render('login');
});

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/logout', userControllers.logout);

export default router;
