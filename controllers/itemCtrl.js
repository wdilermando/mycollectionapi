const itemModel = require('../models/itemModel');

module.exports = {
    all: (req, res, next) => {
        itemModel.find({}).lean().exec((err, items) => {
            if (err) return res.json([]);
            return res.json(items);
        })
    },
    create: async (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'As informações do item devem ser preenchidas!' })
        }
        try {
            
            let { title } = req.body;
            await itemModel.findOne({ title }, async (err, obj) => {
                if (err) return res.json([]);

                if (!obj) {
                    const novoItem = await itemModel.create({ ...req.body })
                    res.status(201).json({ novoItem })
                }
                return res.status(400).json({ message: "Já existe um item com esse mesmo título!" })
            }).catch(err => console.log(err))
        } catch (error) {
            res.status(500).json({
                message: err.message || "Ocorreu um erro ao criar o Item"
            });
        }
    }
}