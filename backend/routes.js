const express = require('express');

const router = express.Router();

const controllers = require('./controllers');

router.get('/users', controllers.getUsers);

router.get('/users/:userId', controllers.getUser);

router.post('/users', controllers.postUser);

router.patch('/users/:userId', controllers.patchUser);

router.delete('/users/:userId', controllers.deleteUser);

module.exports = router;