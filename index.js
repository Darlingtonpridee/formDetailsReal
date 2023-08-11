let express = require('express');
let bodyParser = require('body-parser')
let mongose = require('mongoose')
let port = 5500
let app = express()

mongose.connect('mongodb://localhost:27017/formDeatails')

let db = mongose.connection;
db.on('error', ()=> console.log('error in connection to datbase'))
db.on('open', ()=> console.log('connection succesuffly to database'))

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.post('/login', (req,res)=>{
  let email = req.body.email;
  let pwd = req.body.password

  let data = {
    email:email,
    password: pwd
  }

  db.collection('users').insertOne(data, (err, collections)=>{
    if (err) return(console.log(err))
    console.log('data inserted succesfully to the database')
  })

  return res.redirect('successful.html')
})

app.get('/', (req,res)=>{
  res.set({
    'Allow-access-Allow-Origin': '*'
  })
}).listen(port, ()=> console.log('we are listening on ' + port))