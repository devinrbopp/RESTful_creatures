const express = require('express')
const router = express.Router()
const fs = require('fs')

// index route PREHISTORIC
router.get('/', (req, res) => {
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)
    console.log(prehistoricCreaturesData)
    res.render('prehistoric/index', {prehistoricCreaturesData})
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

module.exports = router