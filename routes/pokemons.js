let router = require('express').Router()
let Pokemon = require('./../models/Pokemon')
let Type = require('./../models/Type')

router.get('/', (req, res) => {
    Pokemon.find({}).populate('types').then(pokemons => {
        res.render('pokemons/index.html', {pokemons: pokemons})
    })
})

router.get('/new', (req, res) => {
    Type.find({}).then(types => {
        let pokemon = new Pokemon()
        res.render('pokemons/edit.html', {pokemon: pokemon, types: types})
    })
})

router.get('/edit/:id', (req, res) => {
    Type.find({}).then(types => {
        Pokemon.findById(req.params.id).then(pokemon => {
            res.render('pokemons/edit.html', {pokemon: pokemon, types: types})
        })
    })
})

router.post('/:id?', (req, res) => {
    new Promise((resolve, reject) => {
        if(req.params.id) {
            Pokemon.findById(req.params.id).then(resolve, reject)
        } else {
            resolve(new Pokemon())
        }
    }).then(pokemon => {
        pokemon.name = req.body.name
        pokemon.number = req.body.number
        pokemon.description = req.body.description
        pokemon.types = req.body.types
        if(req.file) pokemon.picture = req.file.filename
        return pokemon.save()
    }).then(() => {
        res.redirect('/')
    }, err => console.log(err))
})

module.exports = router