const express = require('express')
const router = express.Router()
const fs = require('fs')

// index route PREHISTORIC
router.get('/', (req, res) => {
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)
    // console.log(prehistoricCreaturesData)
    res.render('prehistoric/index', {prehistoricCreaturesData})
})

// NEW route
router.get('/new', (req, res) => {
    res.render('prehistoric/new.ejs')
})

// EDIT route
router.get('/edit/:idx', (req, res) => {
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)
    res.render('prehistoric/edit.ejs', {prehistoricCreatureId: req.params.idx, prehistoricCreature: prehistoricCreaturesData[req.params.idx]})
})

// update after editing
router.put('/:idx', (req, res) => {
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)

    prehistoricCreaturesData[req.params.idx].type = req.body.type
    prehistoricCreaturesData[req.params.idx].img_url = req.body.img_url

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricCreaturesData))
    res.redirect('/prehistoric_creatures')
})

// SHOW prehistoric route
router.get('/:idx', (req, res) => {
    // get the array of dinosaurs
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)
    // get array index from URL pattern
    let prehistoricCreatureIndex = req.params.idx
    res.render('prehistoric/show', {myPrehistoricCreature: prehistoricCreaturesData[prehistoricCreatureIndex]})
})


// POST route
router.post('/', (req, res) => {
    // get the array
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)

    // add new create to array
    prehistoricCreaturesData.push(req.body)

    // save data to json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricCreaturesData))

    // redirect to /prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})

// DESTROY prehistoric route
router.delete('/:idx', (req,res) => {
    console.log('you deleted a guy 💀')
    // get the array of prehistoric creatures
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)
    // remove the creature you would like to delete
    prehistoricCreaturesData.splice(req.params.idx, 1)
    // save creatures back to json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricCreaturesData))
    res.redirect('/prehistoric_creatures')
})

module.exports = router