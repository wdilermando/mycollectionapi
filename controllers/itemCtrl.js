const itemModel = require('../models/itemModel');

module.exports = {
    all: (req, res, next)=>{
        itemModel.find({}).lean().exec((err, items)=>{
            if(err) return res.json([]);
            return res.json(items);
        })
    }
}