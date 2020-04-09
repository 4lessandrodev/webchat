var express = require('express');
// Realiza o require do express, http, e socketio
var app = express();
// passa o express para o http-server
var http = require('http').Server(app);
// passa o http-server para o socketio
var io = require('socket.io')(http);

var path = require('path');

app.use(express.static(path.join(__dirname, 'src')));

app.set('views', path.join(__dirname, 'views'));

// cria uma rota para fornecer o arquivo index.html
/*
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
*/
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

// sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// inicia o servidor na porta informada
const PORT = process.env.PORT || process.env.WEBCHAT_SERVER || 21257;
http.listen(21257, function(){
  console.log('Servidor rodando em: http://localhost:21257');
});
