const express = require('express');
const Mensagem = require('../models/mensagens');


module.exports = {
    async create(req, res, next){

        try{
            const mensagem = await Mensagem.create({
                user_id: req.user.id,
                livro_id: req.params.livro_id,
                mensagem: req.body.mensagem
            });
            if(!mensagem){
                return res.status(500).send({mensagem: 'mensagem não enviada'})
            }
            return res.status(201).send({
                mensagem: 'Mensagem enviada com sucesso!',
                mensagem: {
                    livro_id: mensagem.livro_id,
                    mensagem: mensagem.mensagem
                }
            })

        } catch (err){
            res.status(500).send({error: err})
        }
    },
    async myMensagens(req, res, next){
        try{
            const mensagens = await Mensagem.findAll({
                where: { user_id: req.user.id},
            });

            if(!mensagens){
                return res.status(500).send({mensagem: 'Erro no retorno das mensagens'})
            }

            return res.status(201).send({
                mensagens: mensagens
            })

        } catch (err){
            res.status(500).send({error: err})
        }
    },
    async delete(req, res, next){
        try{
            const mensagem = await Mensagem.findOne({
                where: { id: req.params.mensagem_id},
            });
            if(!mensagem){
                return res.status(500).send({mensagem: 'Erro ao encontrar a mensagem, verifique os dados'})
            }
            if(mensagem.user_id === req.user.id){
                await mensagem.destroy();
                return res.status(201).send({
                    mensagem: 'Mensagem deletada!'
                })
            } else {
                return res.status(401).send({
                    mensagem: 'Operação não autorizada!'
                })
            }

        } catch (err){
            res.status(500).send({error: err})
        }
    },
    async update(req, res, next){
        try{
            const mensagem = await Mensagem.findOne({
                where: { id: req.params.mensagem_id},
            });
            if(!mensagem){
                return res.status(500).send({mensagem: 'Erro ao encontrar o livro, verifique os dados'})
            }
            if(mensagem.user_id === req.user.id){
                await Mensagem.update({
                     mensagem: req.body.mensagem
                }, {
                    where: {
                        id: req.params.mensagem_id
                    }
                  });
                return res.status(201).send({
                    mensagem: 'Mensagem editada!'
                })
            } else {
                return res.status(401).send({
                    mensagem: 'Operação não autorizada!'
                })
            }

        } catch (err){
            res.status(500).send({error: err})
        }
    }
}