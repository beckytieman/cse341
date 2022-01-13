const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log('In the Users middleware');
    res.send('<h1>User Page</h1>');
});

app.use('/', (req, res, next) => {
    console.log('In the default "/" middleware');
    res.send('<h1>Default Page</h1>');
});

app.listen(3000);