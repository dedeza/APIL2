const express = require('express');
const User = require('../models/user');


module.exports = {
    async perfil(req, res, next){

        try{
            const user = await User.findOne({
                where: {id: req.user.id}
            });
            if(!user){
                return res.status(500).send({mensagem: 'Usuario não encontrado'})
            }
            return res.status(201).send({
                user: {
                    nome: user.nome, 
                    sobrenome: user.sobrenome,
                    email: user.email,
                    tel: user.tel,
                }
            })

        } catch (err){
            res.status(500).send({error: err})
        }
    },
}