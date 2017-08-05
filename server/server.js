const express = require('express')

const parser = require('body-parser')
const path = require('path')
const PORT = 3000
const app = express();
const router = require('./Routers')


app.use(parser.json());
app.use(parser.urlencoded({extended:true}))

//app.use(express.static(path.join('__dirname + ../client/public')))
app.use(express.static(path.resolve(__dirname, '../static')));

app.use('/', router)

app.listen(PORT, (err)=>{
  if (err){
    console.log('there is an err')
  } else {
    console.log('the server is listeningggggggggg')
  }
})
