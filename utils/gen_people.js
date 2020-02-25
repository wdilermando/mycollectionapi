const mongoose = require('mongoose');
const faker = require('faker');
const personModel = require('../models/personModel');

mongoose.connect('mongodb+srv://will:Aoa67m9A809NiZxD@atlabox-nkckf.mongodb.net/acervo?retryWrites=true&w=majority', {useNewUrlParser: true});

async function add(n) {
    try {
        for (let i = 0; i < n; i++) {
            const p = new personModel();
            p.name = faker.name.firstName();
            p.country = faker.address.country();
            p.email = faker.internet.email();
            p.company = faker.company.companyName();
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
