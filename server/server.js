const express = require('express')

const parser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 3000;
const app = express();
const router = require(path.joins(__dirname, './Routers/index.js'))

const http = require('http')
const server = http.createServer(app)
const socketIO = require('socket.io')
const io = socketIO(server)

app.use(parser.json());
app.use(parser.urlencoded({extended:true}))

app.use(express.static(path.resolve(__dirname, '../static')));

app.use('/', router)

io.on('connection', socket => {
  console.log('client connected!')
  socket.on('addedTask', body => {
    socket.broadcast.emit('addedTask', {
      body,
      from: socket.id.slice(8),
    })
  })
  socket.on('message', body => {
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(8),
    })
  })
})

server.listen(PORT, process.env.IP, (err)=>{
  if (err){
    console.log('there is an err')
  } else {
    console.log('the server is listening on port', PORT);
  }
})
