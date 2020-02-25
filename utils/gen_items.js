const mongoose = require('mongoose');
const faker = require('faker');
const itemModel = require('../models/itemModel');

mongoose.connect('mongodb+srv://will:Aoa67m9A809NiZxD@atlabox-nkckf.mongodb.net/acervo?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

async function add(n) {
    try {
        for (let i = 0; i < n; i++) {
            const p = new itemModel();
            p.status = faker.commerce.color();
            p.title = faker.commerce.productName();
            p.img = faker.image.imageUrl();
            p.type = faker.commerce.department();
            p.stars = faker.random.number();
            await p.save();
        }        
    } catch (error) {
        console.log(error);
        
    }
}

add(10)
    .then(()=>{
        console.log('OK');
        mongoose.disconnect();        
    })



