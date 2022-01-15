const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const users = [];

router.get('/', (req, res, next) => {
    res.render('index', {
        pageTitle: 'Add User',
        path: '/',
    });
});

router.post('/add-user', (req, res, next) => {
    users.push({username: req.body.username});
    res.redirect('/users');
})

exports.routes = router;
exports.users = users;