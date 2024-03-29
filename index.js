const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool, Client } = require('pg')

var pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.urlencoded({ extended: false }))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  //done
  .get("/", function (req, res) {
    let result = {success: 0}
    res.render("pages/index", result)
  })
  //done
  .get("/display", function (req, res) {
    let displayQuery = "select * from tokimon order by id ASC"
    pool.query(displayQuery, function (err, result) {
      if (err) {
        console.log(err)
        res.render('pages/display')
      }
      let results = { numRows: result.rowCount, data: result.rows }
      res.render('pages/display', results)
    })

  })
  //done
  .get("/sort", function(req, res){
    let sortOption = parseInt(req.query.Sort)
    
    if(sortOption == 1){
      pool.query("select * from tokimon order by id asc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 2){
      pool.query("select * from tokimon order by id desc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 3){
      pool.query("select * from tokimon order by name asc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 4){
      pool.query("select * from tokimon order by name desc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 5){
      pool.query("select * from tokimon order by weight asc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 6){
      pool.query("select * from tokimon order by weight desc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 7){
      pool.query("select * from tokimon order by height asc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 8){
      pool.query("select * from tokimon order by height desc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 9){
      pool.query("select * from tokimon order by fly asc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 10){
      pool.query("select * from tokimon order by fly desc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 11){
      pool.query("select * from tokimon order by fight asc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 12){
      pool.query("select * from tokimon order by fight desc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 13){
      pool.query("select * from tokimon order by fire asc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 14){
      pool.query("select * from tokimon order by fire desc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 15){
      pool.query("select * from tokimon order by water asc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 16){
      pool.query("select * from tokimon order by water desc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 17){
      pool.query("select * from tokimon order by electric asc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 18){
      pool.query("select * from tokimon order by electric desc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 19){
      pool.query("select * from tokimon order by ice asc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else if(sortOption == 20){
      pool.query("select * from tokimon order by ice desc", function(err, result){
        if(err){
          console.log(err)
          res.end()
        }
        let results = { numRows: result.rowCount, data: result.rows }
        res.render('pages/display', results)
      })
    }
    else{
      res.redirect("/*")
    }

    
  })
  //done
  .get("/info/:id", function(req, res){
    let moreInfoQuery = `select * from tokimon where id = ${req.params.id}`
    pool.query(moreInfoQuery, function(err, result){
      if (err){
        console.log(err)
        res.render('pages/display')
      }

      let results = {data: result.rows}
      res.render('pages/info', results)
    })
  })
  //done
  .get("/new", function (req, res) {
    let result = {success: 0}
    res.render('pages/form', result)
  })
  //done
  .get("/edit", function (req, res) {
    let editQuery = "select * from tokimon order by id ASC"
    pool.query(editQuery, function (err, result) {
      if (err) {
        console.log(err)
        res.render('pages/display')
      }
      let results = { numRows: result.rowCount, data: result.rows }
      res.render('pages/edit', results)
    })

  })
  //done
  .get("/edit/:id", function (req, res) {
    let editQuery = `select * from tokimon where id = ${req.params.id}`
  
    pool.query(editQuery, function (err, result) {
      if (err) {
        console.log(err)
        res.render('pages/display')
      }
      info = {
        name: result.rows[0].name, weight: result.rows[0].weight, height: result.rows[0].height, fly: result.rows[0].fly, fight: result.rows[0].fight,
        fire: result.rows[0].fire, water: result.rows[0].water, electric: result.rows[0].electric, ice: result.rows[0].ice, trainer: result.rows[0].trainer, description: result.rows[0].description, id: result.rows[0].id
      }
      let results = {success: 0, data: info}
      res.render('pages/update', results)
    })
  })
  //done
  .post("/update/:id", function(req, res){
    let description = req.body.description

    if (!req.body.description.replace(/\s/g, '').length || req.body.description == "") {
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
    var insertQuery = `update tokimon set name='${tokiName.toLowerCase().trim()}', weight = ${weight}, height = ${height}, fly = ${fly}, fight = ${fight}, fire = ${fire}, water = ${water}, electric = ${electric}, ice = ${ice}, total = ${total}, trainer = '${trainer.toLowerCase().trim()}', description = '${description}' where id = ${req.params.id}`

    pool.query(insertQuery, function (err, res) {
      if (err) {
        console.log(err)
      }
    })
    let result = {success: 1}
    res.render("pages/index", result)
  })
  
  //done
  .get("/delete", function (req, res) {
    let deleteQuery = "select * from tokimon order by id ASC"
    pool.query(deleteQuery, function (err, result) {
      if (err) {
        console.log(err)
        res.render('pages/display')
      }
      let results = { numRows: result.rowCount, data: result.rows }
      res.render('pages/delete', results)
    })
  })
  //done
  .get("/delete/:id", function (req, res) {
    pool.query(`DELETE from tokimon where id = ${req.params.id}`)
    let result = {success: 2}
    res.render("pages/index", result)
  })
  //done
  .post("/insert", function (req, res) {
    let description = req.body.description

    if (!req.body.description.replace(/\s/g, '').length || req.body.description == "") {
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
    var insertQuery = `insert into tokimon values('${tokiName.toLowerCase().trim()}', ${weight}, ${height}, ${fly}, ${fight}, ${fire}, ${water}, ${electric}, ${ice}, ${total}, '${trainer.toLowerCase().trim()}', '${description}')`
    console.log(insertQuery)
    pool.query(insertQuery, function (err, res) {
      if (err) {
        console.log(err)
      }
    })
    let result = { success: 3 }
    res.render('pages/index', result)
  })
  //done
  .get("/compare1", function(req, res){
    let compareQuery = "select * from tokimon order by id ASC"
    pool.query(compareQuery, function (err, result) {
      if (err) {
        console.log(err)
        res.render('pages/display')
      }
      let results = { numRows: result.rowCount, data: result.rows }
      res.render('pages/compare1', results)
    })
  })
  //done
  .get("/compare1/:id", function(req, res){
    let compareQuery = "select * from tokimon order by id ASC"
    pool.query(compareQuery, function (err, result) {
      if (err) {
        console.log(err)
        res.render('pages/display')
      }
      let results = { numRows: result.rowCount, data: result.rows, choice1: req.params.id}
      res.render('pages/compare2', results)
    })
  })
  .get("/compare/:idf/:id", function(req, res){
    let compareQuery = `select * from tokimon where id = ${req.params.idf} union all select * from tokimon where id = ${req.params.id}`
    pool.query(compareQuery, function(err, result){
      if(err){
        console.log(err)
        res.redirect("*")
      }
      
      let results = {data: result.rows}
      res.render('pages/comparison', results)
    })
  })
  //done
  .get('*', function(req, res){
    res.status(404).send('ERROR 404: The page you requested is invalid or is missing, please try something else')
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
