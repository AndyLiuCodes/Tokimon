const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const {Pool, Client} = require('pg')

const connectionString = "postgres://postgres:root@localhost:5432/tokimon"

var pool = new Pool({
  connectionString: connectionString
})
pool.connect(function(err){
  if(err) {
    return console.error("could not connect", err)
  }
  console.log("connection done")
})


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.urlencoded({ extended: false }))
  .get("/", function(req, res){
    res.render("pages/index")  
  })

  .get("/display", function(req, res){
    let displayQuery = "select * from tokimon"
    pool.query(displayQuery, function(err, result){
      if(err){
        console.log(err)
        res.render('pages/display')
      }
      let results = {numRows: result.rowCount, data: result.rows}
      console.log(results.data)
      res.render('pages/display', results)
    })
    
  })
  .get("/new", function(req, res){
    let result = {success: 0}
    res.render('pages/form', result)
  })

  .get("/edit", function(req, res){
    res.render('pages/form')
  })

  .get("/delete", function(req, res){
    res.render('pages/form')
  })

  .post("/insert", function(req, res){
    console.log(req.body);
    let description = req.body.description

    if(/^[A-Za-z ]+$/.test(req.body.name) == false){
      let result = {success: 1}
      res.render('pages/form', result)
    }
    else if(parseFloat(req.body.weight) <= 0 || req.body.weight == ''){
      let result = {success: 2}
      res.render('pages/form', result)
    }
    else if(parseFloat(req.body.height) <= 0 || req.body.height == ''){
      let result = {success: 3}
      res.render('pages/form', result)
    }
    else if(req.body.fly == '' || req.body.fly.indexOf('.') != -1){
      let result = {success: 4}
      res.render('pages/form', result)
    }
    else if(parseInt(req.body.fly) > 100 || parseInt(req.body.fly) < 0){
      let result = {success: 5}
      res.render('pages/form', result)
    }
    else if(req.body.fight == '' || req.body.fight.indexOf('.') != -1){
      let result = {success: 6}
      res.render('pages/form', result)
    }
    else if(parseInt(req.body.fight) > 100 || parseInt(req.body.fight) < 0){
      let result = {success: 7}
      res.render('pages/form', result)
    }
    else if(req.body.fire == '' || req.body.fire.indexOf('.') != -1){
      let result = {success: 8}
      res.render('pages/form', result)
    }
    else if(parseInt(req.body.fire) > 100 || parseInt(req.body.fire) < 0){
      let result = {success: 9}
      res.render('pages/form', result)
    }
    else if(req.body.water == '' || req.body.water.indexOf('.') != -1){
      let result = {success: 10}
      res.render('pages/form', result)
    }
    else if(parseInt(req.body.water) > 100 || parseInt(req.body.water) < 0){
      let result = {success: 11}
      res.render('pages/form', result)
    }
    else if(req.body.electric == '' || req.body.electric.indexOf('.') != -1){
      let result = {success: 12}
      res.render('pages/form', result)
    }
    else if(parseInt(req.body.electric) > 100 || parseInt(req.body.electric) < 0){
      let result = {success: 13}
      res.render('pages/form', result)
    }
    else if(req.body.ice == '' || req.body.ice.indexOf('.') != -1){
      let result = {success: 14}
      res.render('pages/form', result)
    }
    else if(parseInt(req.body.ice) > 100 || parseInt(req.body.ice) < 0){
      let result = {success: 15}
      res.render('pages/form', result)
    }
    if(/^[A-Za-z ]+$/.test(req.body.trainer) == false){
      let result = {success: 16}
      res.render('pages/form', result)
    }
    if(!req.body.description.replace(/\s/g, '').length || req.body.description == ""){
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
    pool.query(insertQuery, function (err, res){
      if(err){
        console.log(err)
      }
    })
    let result = {success: 17}
    res.render('pages/form', result)
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
