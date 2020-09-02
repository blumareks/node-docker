'use strict';

const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/hello', (req, res) => {
    res.send('Hello World - you might want to add some text\n');
});  
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
