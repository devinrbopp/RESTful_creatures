const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

//middleware
app.use(ejsLayouts)
app.set('view engine', 'ejs')
// body-parser middleware
// makes req.body work
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// sends requests that start with /dinosaurs to controllers/dinosaurs.js
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))

app.get('/', (req, res) => {
    res.render('home.ejs')
})

// index route PREHISTORIC
app.get('/prehistoric_creatures', (req, res) => {
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricCreaturesData = JSON.parse(prehistoricCreatures)
    console.log(prehistoricCreaturesData)
    res.render('prehistoric/index', {prehistoricCreaturesData})
})

// SHOW prehistoric route
app.get('/prehistoric_creatures/:idx', (req, res) => {
    // get the array of dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // get array index from URL pattern
    let dinoIndex = req.params.idx
    res.render('dinos/show', {myDino: dinoData[dinoIndex]})
})



app.listen(8000, () => {
    console.log('now listening on 8000!!! :)')
})