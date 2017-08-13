const express = require('express')

const parser = require('body-parser')
const path = require('path')
const PORT = 3000
const app = express();
const router = require('./Routers')
const cors = require('cors');


app.use(cors());

app.use(parser.json());
app.use(parser.urlencoded({extended:true}))

app.use(express.static(path.resolve(__dirname, '../static')));

app.use('/', router)

app.listen(PORT, (err)=>{
  if (err){
    console.log('there is an err')
  } else {
    console.log('the server is listening on port', PORT);
  }
})
