const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool, Client } = require('pg')

const connectionString = "postgres://postgres:root@localhost:5432/tokimon"

var pool = new Pool({
  connectionString: connectionString
})
pool.connect(function (err) {
  if (err) {
    return console.error("could not connect", err)
  }
  console.log("connection done")
})


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.urlencoded({ extended: false }))
  .get("/", function (req, res) {
    res.render("pages/index")
  })

  .get("/display", function (req, res) {
    let displayQuery = "select * from tokimon"
    pool.query(displayQuery, function (err, result) {
      if (err) {
        console.log(err)
        res.render('pages/display')
      }
      let results = { numRows: result.rowCount, data: result.rows }
      res.render('pages/display', results)
    })

  })
  .get("/new", function (req, res) {
    let result = { success: 0}
    res.render('pages/form', result)
  })

  .get("/edit", function (req, res) {
    let editQuery = "select * from tokimon"
    pool.query(editQuery, function (err, result) {
      if (err) {
        console.log(err)
        res.render('pages/display')
      }
      let results = { numRows: result.rowCount, data: result.rows }
      res.render('pages/edit', results)
    })

  })

  .get("/edit/:id", function (req, res) {
    let editQuery = `select * from tokimon where id = ${req.params.id}`
  
    pool.query(editQuery, function (err, result) {
      if (err) {
        console.log(err)
        res.render('pages/display')
      }
    
      info = {
        name: result.rows[0].name, weight: result.rows[0].weight, height: result.rows[0].height, fly: result.rows[0].fly, fight: result.rows[0].fight,
        fire: result.rows[0].fire, water: result.rows[0].water, electric: result.rows[0].electric, ice: result.rows[0].ice, trainer: result.rows[0].trainer, description: result.rows[0].trainer
      }

      console.log(info)
      let results = { success: 0, data: info, state: "update" }
      res.render('pages/update', results)
    })
  })
  .get("/delete", function (req, res) {
    let deleteQuery = "select * from tokimon"
    pool.query(deleteQuery, function (err, result) {
      if (err) {
        console.log(err)
        res.render('pages/display')
      }
      let results = { numRows: result.rowCount, data: result.rows }
      console.log(results.data)
      res.render('pages/delete', results)
    })
  })

  .get("/delete/:id", function (req, res) {
    pool.query(`DELETE from tokimon where id = ${req.params.id}`)
    res.redirect("/display")
  })
  .post("/insert", function (req, res) {
    let description = req.body.description

    if (/^[A-Za-z ]+$/.test(req.body.name) == false) {
      let result = { success: 1 }
      res.render('pages/form', result)
    }
    else if (/^[A-Za-z ]+$/.test(req.body.trainer) == false) {
      let result = { success: 2 }
      res.render('pages/form', result)
    }
    else if (!req.body.description.replace(/\s/g, '').length || req.body.description == "") {
      description = "No description was entered when added into the Tokidex"
    }

    let tokiName = req.body.name
    let weight = parseFloat(req.body.weight)
    let height = parseFloat(req.body.height)
    let fly = parseInt(req.body.fly)
    let fight = parseInt(req.body.fight)
    let fire = parseInt(req.body.fire)
    let water = parseInt(req.body.water)
    let electric = parseInt(req.body.electric)
    let ice = parseInt(req.body.ice)
    let trainer = req.body.trainer
    let total = fly + fight + fire + water + electric + ice
    var insertQuery = `insert into tokimon values('${tokiName.toLowerCase()}', ${weight}, ${height}, ${fly}, ${fight}, ${fire}, ${water}, ${electric}, ${ice}, ${total}, '${trainer.toLowerCase()}', '${description}')`
    console.log(insertQuery)
    pool.query(insertQuery, function (err, res) {
      if (err) {
        console.log(err)
      }
    })
    let result = { success: 3 }
    res.render('pages/form', result)
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
