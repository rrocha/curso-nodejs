var app = require('./config/express')(); // Configura o express referenciando um modulo criado manualmente
var http = require('http').Server(app);
var io = require('socket.io')(http); // Importanto a bibliteca do socket io

app.set('io', io);

http.listen(3000, function(){ // passamos a porta e a função a ser chamada quando o servidor estiver pronto
	console.log("Servidor rodando");
});