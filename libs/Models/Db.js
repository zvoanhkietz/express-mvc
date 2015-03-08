var mysql = require('mysql');
var config = require('../../config/db');
module.exports = function(app){
	var env = app.get('env');
	var dbConfig = config[env] || {};
	this.connect = function(){
		var connection = mysql.createConnection(dbConfig);
		connection.connect(function(err) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			console.log('Connected to database as id ' + connection.threadId);
		});
		return connection;
	}
};