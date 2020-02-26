const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const api = require('./routes/api');
const auth = require('./routes/auth');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(cors());

app.use('/auth', auth)
app.use('/api', api);

app.use((req, res, next)=>{
    res.status(404).send('Not found')
});

module.exports = app;