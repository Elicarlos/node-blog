const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', function(req, res){
    res.render('admin/index')
})

router.get('/posts', function(req, res){
    res.send('Lista de posts')
})

router.get('/categorias', function(req, res) {
    res.render('admin/categorias')
})

router.post('/categorias/nova', function(req, res){
    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({ texto: 'Nome Invalido'})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({ texto: 'Slug invalido'})
    }

    if(req.body.nome.length < 2){
        erros.push({ texto: 'Nome da categoria muito pequeno'})
    }

    if (erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
    } else {
        const novaCategoria = {
            nome : req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(()=>{
            req.flash('success_msg', 'Categoria cadastrada com sucesso')
            res.redirect('/admin/categorias')
        }).catch(( error ) =>{
            req.flash('error_msg', 'Houve um erro ao salvar a categoria')
            res.redirect('/admin')
        })
    

    }


    
})

router.get('/categorias/add', function(req, res){
    res.render('admin/addcategorias')
})

module.exports = router