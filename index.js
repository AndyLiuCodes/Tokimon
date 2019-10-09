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
  .get("/new", function(req, res){
    var result = {hi: 0}
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
    res.render("pages/form", {hi: 0})
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
