const personModel = require('../models/personModel');

module.exports = {
    all: (req, res, next)=>{
        personModel.find({}).lean().exec((err, people)=>{
            if(err) return res.json([]);
            return res.json(people);
        })
    }
}