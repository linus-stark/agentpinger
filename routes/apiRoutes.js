// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
const Bot = require('../../lib/index.js')
const mysql = require('mysql')
var tableData = require("../data/tableData");

const db = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password:'root',
  database:'agentdb'
})

db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('mysql succ')
});
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
 
  

  app.get("/api/agents", function(req, res) {
    let sql = `SELECT * FROM agentlist`;
    db.query(sql,(err, agentres) => {
     if(err) throw err
     console.log(agentres);
     res.json(agentres);

   })


  });

  // API POST Requests
  // ---------------------------------------------------------------------------
function oof(){
  let sql1 = `SELECT * FROM agentlist`;
  db.query(sql1,(err, agentres) => {
   if(err) throw err
   for (var i = 0; i < agentres.length; i++) {
    console.log(JSON.stringify(agentres));}
 })}
 oof()



  app.post("/api/tables", function(req, res) {
    last_element = tableData[tableData.length - 1];
  //sql stuff




  var j = schedule.scheduleJob('* * * * 1', function(){
    console.log('weekping');
    weekpinger()
  
  }); 
let sql1 = `SELECT * FROM agentlist`;
    db.query(sql1,(err, agentres) => {
     if(err) throw err
     for (var i = 0; i < agentres.length; i++) {
      console.log("name"+agentres.name);}
   })
  
   let sql = `INSERT INTO agentlist (name, worklevel, occurance, coldate) VALUES ('${last_element.name}', ${last_element.workLevel}, ${last_element.occurance}, CURDATE())`
    db.query(sql,(err, result) => {
     if(err) throw err
     console.log(result);
   })

    
      tableData.push(req.body);
      res.json(true);

      function main() {
        
        const bot = new Bot()
        const username = 'lil_bot'
        const paperkey = 'end ramp glad culture awake awkward stone rate sentence tip verb journey crime' 
      
        bot
          .init(username, paperkey, {verbose: false})
          .then(() => {
            last_element = tableData[tableData.length - 1];
            uName = (last_element.name+',')
            console.log(`Your bot is initialized. It is logged in as ${bot.myInfo().username}`)
            const channel = {name: uName + bot.myInfo().username, public: false, topicType: 'chat'}

//bot stuff should go here, pings etc
            console.log(tableData)

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
          })
          .catch(error => {
            console.error(error)
            bot.deinit()
          })
      }
      
      main()

  });

  // ---------------------------------------------------------------------------
 
  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    tableData.length = [];

    res.json({ ok: true });
  });
};
