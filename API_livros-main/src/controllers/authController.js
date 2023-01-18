const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    async login (req, res, next){

        try{

            const userVerify = await User.findOne({where: {email: req.body.email}});

            if(!userVerify){
                return res.status(401).send({mensagem: 'Falha na autenticação'});
            }

            bcrypt.compare(req.body.senha, userVerify.senha, (errBcrypt, resultBcrypt)=>{
                if(errBcrypt){
                    return res.status(401).send({mensagem: 'Falha na autenticação'})
                }
                if(resultBcrypt){
                    const token = jwt.sign({
                        id:  userVerify.id,
                        email:  userVerify.email,
                        nome:  userVerify.nome,
                        sobrenome:  userVerify.sobrenome,
                        tel:  userVerify.tel
                    },  process.env.JWT_KEY, {
                        expiresIn: '7d'
                    })
                    return res.status(200).send({
                        mensagem: 'Autenticado com sucesso',
                        token: token
                })
                }
                return res.status(401).send({mensagem: 'Falha na autenticação'});
            })

        } catch (err){
            res.status(500).send({error: err})
        }        
    },
    async cadastro (req, res, next){

        try{

            const userVerify = await User.findOne({where: {email: req.body.email}});

            if(userVerify){
                return res.status(409).send({mensagem: 'email já cadastrado'});
            } else {
                bcrypt.hash(req.body.senha, 10, async (errBcrypt, hash) => {
                    if(errBcrypt){
                        return res.status(500).send({error: errBcrypt})
                    }
                    const user = await User.create({nome: req.body.nome, sobrenome: req.body.sobrenome, email: req.body.email, tel: req.body.tel, senha: hash})
                    if(!user){
                        return res.status(500).send({error: error})
                    }
                    console.log(user);

                    return res.status(201).send({
                        mensagem: 'usuario criado com sucesso!',
                        user: {
                            user_id: user.id,
                            email: user.email
                        }
                    })
                })

            }

        } catch(err){
            res.status(500).send({error: err})
        }
    }
};