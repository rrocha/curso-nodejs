// Importação das funcões que o express nos fornece
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function (){
	console.log('Módule está sendo carregado');

	var app = express();

	app.use(express.static('./app/public'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	// Define funções que serão usadas antes das requisições, deve ser antes do load
	// Express chama isso de Middleware
	app.use(bodyParser.urlencoded({extended: true})); 
	app.use(bodyParser.json());
	app.use(expressValidator());

	// Tudo que carregar automaticamente ficará dentro do app
	// Carregando tudo que estiver em routes depois tudo que tiver em infra e coloque tudo dentro do app
	// CWD é a configuração do parâmetro onde a aplicação deve procurar
	// A ordem do carregamento tem importância
	load('routes', {cwd: 'app'} )
		.then('infra')
		.into(app);

 	//tem que colocar na ordem, caso contrário ele passa pelo middleware e 
    //ainda não vai ter acontecido nenhum erro.
	app.use(function(req, res, next){
		res.status(404).render('erros/404');
		next();
	});

	app.use(function(error, req, res, next){
		if(process.env.NODE_ENV == 'production'){
			res.status(500).render('erros/500');
			return;
		}
		next(error);
	});

	return app;
}
