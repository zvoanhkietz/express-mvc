var _ = require('underscore');
module.exports = function(db){
	this.db = global._db || db;
	this.table = '';
}

module.exports.prototype = {
	extend: function(child){
		return _.extend({}, this, child);
	},
	find: function(options, callback){
		this.db.query('SELECT * FROM ' + this.table, [], function(err, rows, fields){
			if(err){
				callback(new Error(err));
			}else{
				if(options['type'] == 'first'){
					var data = rows[0] || null;
					callback(err, data);
				}else{
					callback(err, rows);
				}
			}
		});
	}
}