module.exports = function(app){

	var listaProdutos = function(req, res, next){ // NEXT: armazena a próxima função a ser executada.
		//res.send("<html><body><h1>Listagem de produtos</h1></body></html>");
		//console.log("teste 01");
		
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection); // O NEW cria um novo contexto

        produtosDAO.lista(function(erros, resultados){
			if(erros){
				return next(erros);
			} else{
				res.format({
					html: function(){
						res.render('produtos/lista', {lista: resultados});		
					},
					json: function(){
						res.json(resultados);
					}
				});				
			}
        });

        connection.end();
		
		//res.render("produtos/lista"); // Busca dentro de 'views', este diretório
	}

	// Rotas
	app.get('/produtos', listaProdutos);

	app.get('/produtos/form', function(req, res){
		//console.log("Cheguei aqui");
		res.render('produtos/form', 
				{errosValidacao : {}, produto: {}});
	});

	app.post('/produtos', function(req, res, next){
		var produto = req.body;

		//.assert: cria uma asserção/validação para o título do produto
		req.assert('titulo', 'Título é obrigatório.').notEmpty();
		req.assert('preco', 'Formato é inválido').isFloat();

		var erros = req.validationErrors();
		if(erros){
			res.format({
				html: function(){
					res.status(400).render('produtos/form', {errosValidacao : erros, produto : produto});	
				},
				json: function(){
					res.status(400).json(erros);
				}
			});
			return;
		}

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection); // O NEW cria um novo contexto

		produtosDAO.salva(produto, function(erros, resultados){

			if(erros){
				return next(erros);
			} 

			// Para evitar o envio de uma nova requisição via F5, é sempre bom dar um REDIRECT.
			res.redirect('/produtos');
		});
	});

	app.get('/produtos/remove', function(req, res){
		//var produto = req.body;
		var id = req.query.id;
		console.log("## TESTE REMOVER ##");
		console.log(id);

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection); // O NEW cria um novo contexto

		produtosDAO.remove(id, function(erros, resultados){
			// Para evitar o envio de uma nova requisição via F5, é sempre bom dar um REDIRECT.
			res.redirect('/produtos');
		});
	});
}