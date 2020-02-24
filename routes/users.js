const { Router } = require('express');
const UserController = require('../controllers/users');
const router = Router();

router.post('/create', UserController.create);
router.post('/login', UserController.login);

module.exports = router;
