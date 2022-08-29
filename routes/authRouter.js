const Router = require('express');
const router = new Router();
const authController = require('../controller/authController');
const checkAuth = require('../middleware/checkAuthorization');


router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/user', checkAuth, authController.getUsers);


module.exports = router;
