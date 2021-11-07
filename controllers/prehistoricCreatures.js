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

// SHOW prehistoric route
router.get('/:idx', (req, res) => {
    // get the array of dinosaurs
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)
    // get array index from URL pattern
    let prehistoricCreatureIndex = req.params.idx
    res.render('prehistoric/show', {myPrehistoricCreature: prehistoricCreaturesData[prehistoricCreatureIndex]})
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