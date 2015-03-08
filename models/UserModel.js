var _ = require('underscore');
var Model = require('../libs/Models/Base');
var model = new Model();
module.exports = model.extend({
	table: 'wp_users',
	findUserById: function(id, callback){
		var query = {
			type: 'first',
			conditions: { ID: id }
		};
		this.find(query, function(err, row){
			if(err){
				throw new Error('Not found user by id ' + id);
			}else{
				callback(err, row);
			}
		});
	}, 
	findAll: function(options, callback){
		options['type'] = 'all';
		var query = options;
		this.find(query, function(err, row){
			if(err){
				throw new Error('Not found user by id ' + id);
			}else{
				callback(err, row);
			}
		});
	}
});