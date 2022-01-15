const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const indexData = require('./index');

const router = express.Router();

router.get('/users', (req, res, next) => {
    const users = indexData.users;
    res.render('users', {
        users: users,
        pageTitle: 'Users',
        path: '/users'
    });
});

module.exports = router;