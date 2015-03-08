var BaseController = require('./AdminBase');
var View = require('../libs/Views/Base');
var UserModel = require('../models/UserModel');
var layout = 'admin/layout-admin';

module.exports = BaseController.extend({
	name: 'AdminUser',
	list: function(req, res){
		UserModel.findAll({}, function(err, users){
			var v = new View(res, 'admin/user/list', layout);
			v.useJavaScript([
				'/admin/js/icheck.js',
				'/admin/js/scroll.min.js',
				'/admin/js/calendar.min.js',
				'/admin/js/feeds.min.js',
				'/admin/js/functions.js'
			]);
			v.render({
				title: 'User Management',
				users: users
			});
		});
	},
	add: function(req, res){
		var v = new View(res, 'admin/user/add', layout);
		v.render({
			title: 'AdminUserController - addAction'
		});
	},
	edit: function(req, res){
		var v = new View(res, 'admin/user/edit', layout);
		v.render({
			title: 'AdminUserController - editAction'
		});
	},
	del: function(req, res){
		res.send({result: true});
	}
});