const express = require('express');
const Livro = require('../models/livros');


module.exports = {
    async create(req, res, next){

        try{
            const livro = await Livro.create({
                titulo: req.body.titulo, 
                categoria: req.body.categoria, 
                descricao: req.body.descricao, 
                ano_lancamento: req.body.ano_lancamento, 
                autor: req.body.autor, 
                foto: req.file.path,  
                is_reservado: false, 
                user_id: req.user.id
            });
            if(!livro){
                return res.status(500).send({mensagem: 'Livro não criado'})
            }

            return res.status(201).send({
                mensagem: 'Livro criado com sucesso!',
                livro: {
                    titulo: livro.titulo,
                    categoria: livro.categoria
                }
            })

        } catch (err){
            res.status(500).send({error: err})
        }
    },
    async read(req, res, next){

        try{
            const livros = await Livro.findAll({include: {association: 'mensagens'}});

            if(!livros){
                return res.status(500).send({mensagem: 'Erro no retorno dos livros'})
            }

            return res.status(201).send({
                livros: livros
            })

        } catch (err){
            res.status(500).send({error: err})
        }

    },
    async CategoryFilterRead(req, res, next){

        try{
            const livros = await Livro.findAll({
                where: { categoria: req.params.categoria},
                include: {association: 'mensagens'}
            });

            if(!livros){
                return res.status(500).send({mensagem: 'Erro no retorno dos livros'})
            }

            return res.status(201).send({
                livros: livros
            })

        } catch (err){
            res.status(500).send({error: err})
        }

    },
    async myRead(req, res, next){
        try{
            const livros = await Livro.findAll({
                where: { user_id: req.user.id},
                include: {association: 'mensagens'}
            });

            if(!livros){
                return res.status(500).send({mensagem: 'Erro no retorno dos livros'})
            }

            return res.status(201).send({
                livros: livros
            })

        } catch (err){
            res.status(500).send({error: err})
        }

    },
    async delete(req, res, next){
        try{
            const livro = await Livro.findOne({
                where: { id: req.params.livro_id},
            });
            if(!livro){
                return res.status(500).send({mensagem: 'Erro ao encontrar o livro, verifique os dados'})
            }
            if(livro.user_id === req.user.id){
                await livro.destroy();
                return res.status(201).send({
                    mensagem: 'Livro deletado!'
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
            const livro = await Livro.findOne({
                where: { id: req.params.livro_id},
            });
            if(!livro){
                return res.status(500).send({mensagem: 'Erro ao encontrar o livro, verifique os dados'})
            }
            if(livro.user_id === req.user.id){
                await Livro.update({
                    titulo: req.body.titulo, 
                    categoria: req.body.categoria, 
                    descricao: req.body.descricao, 
                    ano_lancamento: req.body.ano_lancamento, 
                    autor: req.body.autor, 
                    foto: req.file.path,  
                }, {
                    where: {
                        id: req.params.livro_id
                    }
                  });
                return res.status(201).send({
                    mensagem: 'Livro editado!'
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
    async IsReservado(req, res, next){
        try{
            const livro = await Livro.findOne({
                where: { id: req.params.livro_id},
            });
            if(!livro){
                return res.status(500).send({mensagem: 'Erro ao encontrar o livro, verifique os dados'})
            }
            if((livro.user_id === req.user.id) && (req.params.is_reservado == 0 || req.params.is_reservado == 1)){
                await Livro.update({
                    is_reservado: req.params.is_reservado == 0 ? false : true,
                     
                }, {
                    where: {
                        id: req.params.livro_id
                    }
                  });
                return res.status(201).send({
                    mensagem: 'Livro editado!'
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