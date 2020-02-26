const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res)=>{
        try {
            let u = await userModel.findOne({email: req.body.email});
            if(!u){
                const user = new userModel(req.body);
                user.password = bcrypt.hashSync(req.body.password, process.env.BCRYPTSALTS)
                await user.save()
                delete user.password;
                res.status(201).json(user);
            } else {
                res.status(403).json({message: 'Email já registrado', error: {}})     
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Erro ao salvar o usuário', error})            
        }
    },
    login: (req, res)=>{
        const {email, password} = req.body;

        userModel.findOne({email}).lean().exec((err, user)=>{
            if(err) return res.status(500).json({message:'Erro no servidor', error: err})
            const auth_error = (password == '' || password == null || !user);          
            
            if(!auth_error){
                if(bcrypt.compareSync(password, user.password)){
                    let token = jwt.sign({_id: user._id}, process.env.KEYJWT, {expiresIn: process.env.EXPIRESJWT})
                    delete user.password
                    return res.json({...user, token})
                }
            }

            return res.status(404).json({message: 'Credenciais inválidas'})
        })
    },
    check_token: (req, res, next)=>{
        const token = req.get('Authorization');
        if(!token){
            return res.status(401).json({message: 'Token não encontrado'})
        }
        jwt.verify(token, consts.keyJwt, (err, decoded)=>{
            if(err || !decoded){
                return res.status(401).json({message: 'Erro de autenticação, token inválido'});
            }
            next()
        })
    },
    user_data: (req, res) => { 
        const token = req.get('Authorization');
        jwt.verify(token, consts.keyJwt, (err, decoded)=>{
            const id = decoded._id;
            userModel.findById(id).lean().exec((err, user)=>{
                if(err || !user) {
                    return res.status(500).json({
                        message: 'Falha ao buscar o usuário', error: err
                    })
                }
                let token = jwt.sign({_id: user._id}, consts.keyJwt, {expiresIn: consts.expiresJwt});
                
                delete user.password
                return res.json({...user, token})
            });
        })
    }
}