var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function(){

	beforeEach(function(done){
		var connection = express.infra.connectionFactory();
		connection.query("delete from livros", function(ex, result){
			if(!ex){
				done();
			}
		});
	});

	it('#listagem json', function(done){
		request.get('/produtos')
		.set('Accept', 'application/json')
		.expect('Content-type', /json/)
		.expect(200, done); //Done: A função de finalização é necessária por causa do funcionamento assíncrono do Node.js. 
	});

	it('#cadastro de novo produto com dados válidos', function(done){
		request.post('/produtos')
		.send({titulo: "Teste 1655", descricao: "novo livro", preco: 16.55})
		.expect(302, done);
	});

	it('#cadastro de novo produto com dados inválidos', function(done){
		request.post('/produtos')
		.send({titulo: "", descricao: "novo livro", preco: 16.55})
		.expect(400, done);
	});
});