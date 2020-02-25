const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const api = require('./routes/api');
const auth = require('./routes/auth');

const app = express();



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(cors());

mongoose.connect('mongodb+srv://will:Aoa67m9A809NiZxD@atlabox-nkckf.mongodb.net/acervo?retryWrites=true&w=majority', {useNewUrlParser: true,
useUnifiedTopology: true});

app.use('/auth', auth)
app.use('/api', api);


app.use((req, res, next)=>{
    res.status(404).send('Not found')
});


app.listen(3000);