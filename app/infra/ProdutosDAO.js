function ProdutosDAO(connection){
	this._connection = connection; // _ convenceu da linguagem, diz que o atributo é privado da classe.
}

ProdutosDAO.prototype.lista = function(callback){
	this._connection.query('select * from livros', callback);
}

ProdutosDAO.prototype.salva = function(produto, callback){
	this._connection.query('insert into livros set ?', produto, callback);
	// Outra forma de fazer o insert:
	// this._connection.query('insert into produtos (titulo, preco, descricao) values (?, ?, ?)',  [produto.titulo, produto.preco, produto.descricao], callback);
}

ProdutosDAO.prototype.remove = function(id, callback){
	this._connection.query('delete from livros where id = ?',  id, callback);
}

module.exports = function(){
	return ProdutosDAO;
}