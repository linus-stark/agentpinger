// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var schedule = require('node-schedule');
const mysql = require('mysql');
const Bot = require('../lib')
const express = require("express");
const db = mysql.createConnection({
  host: 'localhost',
  user : 'root',
  password: 'root',
  database: 'agentdb'
});

db.connect((err) => {
  if (err){
    throw err;
  }
  console.log('succ')
})

var app = express();

app.get('/init' , (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS agentdb';
  db.query(sql, (err, result) =>{
    if(err) throw err;
    console.log(result)
    res.send('db created')
  })
})
  function weekpinger(){
  let sql = `SELECT * FROM agentlist WHERE occurance = 1`;
  db.query(sql,(err, agentres) => {

   if(err) throw err

   function main() {
        
    const bot = new Bot()
    const username = 'lil_bot'
    const paperkey = '' 
  
    bot
      .init(username, paperkey, {verbose: false})
      .then(() => {
        console.log(`Your bot is initialized. It is logged in as ${bot.myInfo().username}`)

        last_element = agentres[agentres.length - 1];
        uName = (last_element.name+',')
        for (var i = 0; i < agentres.length; i++) {
        const channel = {name: uName + bot.myInfo().username, public: false, topicType: 'chat'}

//bot stuff should go here, pings etc
        console.log(agentres)

        const message = {
          body: `db updated,\nUser: ${last_element.name}\nOccurence: ${last_element.occurance} \nworklevel: ${last_element.workLevel}`
          
          ,
        }
        
        bot.chat
          .send(channel, message)
          .then(() => {
            console.log('Message sent!')
            bot.deinit()
          })
          .catch(error => {
            console.error(error)
            bot.deinit()
          })
      }})
      .catch(error => {
        console.error(error)
        bot.deinit()
      })
  }
  
  main()  

   console.log(agentres);

 })}
 function monthpinger(){
  let sql = `SELECT * FROM agentlist WHERE occurance = 2`;
  db.query(sql,(err, agentres) => {

   if(err) throw err

   function main() {
        
    const bot = new Bot()
    const username = 'lil_bot'
    const paperkey = '' 
  
    bot
      .init(username, paperkey, {verbose: false})
      .then(() => {
        console.log(`Your bot is initialized. It is logged in as ${bot.myInfo().username}`)

        last_element = agentres[agentres.length - 1];
        uName = (last_element.name+',')
        for (var i = 0; i < agentres.length; i++) {
        const channel = {name: uName + bot.myInfo().username, public: false, topicType: 'chat'}

        console.log(agentres)

        const message = {
          body: `db updated,\nUser: ${last_element.name}\nOccurence: ${last_element.occurance} \nworklevel: ${last_element.workLevel}`
          
          ,
        }
        
        bot.chat
          .send(channel, message)
          .then(() => {
            console.log('Message sent!')
            bot.deinit()
          })
          .catch(error => {
            console.error(error)
            bot.deinit()
          })
      }})
      .catch(error => {
        console.error(error)
        bot.deinit()
      })
  }
  
  main()  

   console.log(agentres);

 })}
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/funk' , (req, res) => {
  weekpinger()
    res.send(' created')
  
})




// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
