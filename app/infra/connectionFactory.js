var mysql = require('mysql');

//Factory Method
function createDBConnection(){
	console.log("Abrindo conexão com banco de dados");

	if(!process.env.NODE_ENV){
		return mysql.createConnection({
	            host: "localhost",
	            user: "root",
	            password : "12345",
	            database: "casadocodigo_nodejs",
				insecureAuth : true
        	});
	}

	if(process.env.NODE_ENV == 'test'){
		return mysql.createConnection({
	            host: "localhost",
	            user: "root",
	            password : "12345",
	            database: "casadocodigo_nodejs_test",
				insecureAuth : true
        	});
	}
	
};

//wrapper: função que embrulha outra função
module.exports = function(){
	return createDBConnection;
}