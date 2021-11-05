const express = require('express')
const router = express.Router()
const fs = require('fs')

// index route DINOS
router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    if (nameFilter) {
        dinoData = dinoData.filter( (dino) => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dinos/index', {dinoData})
})

// NEW route
router.get('/new', (req, res) => {
    res.render('dinos/new')
})

// route for editing
router.get('/edit/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinos/edit.ejs', {dinoId: req.params.idx, dino: dinoData[req.params.idx]})
})

// update a dino
router.put('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

// SHOW dinos route
router.get('/:idx', (req, res) => {
    // get the array of dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // get array index from URL pattern
    let dinoIndex = req.params.idx
    res.render('dinos/show', {myDino: dinoData[dinoIndex]})
})

// POST route
router.post('/', (req, res) => {
    // get the dino array
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // add new dino to dinoData
    dinoData.push(req.body)

    // save data to json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to GET /dinosaurs (index)
    res.redirect('/dinosaurs') // you still need this guy here bc redirect kicks it bck to the top
})

router.delete('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // remove the dinosaur that you would like to delete
    dinoData.splice(req.params.idx, 1)
    // save dinos to json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')

})

module.exports = router