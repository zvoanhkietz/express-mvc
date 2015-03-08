var BaseController = require('./AdminBase');
var View = require('../libs/Views/Base');
var layout = 'admin/layout-admin';

module.exports = BaseController.extend({
	index: function(req, res){
		var v = new View(res, 'admin/index/index', layout);
		v.render({
			title: 'DASHBOARD'
		});
	}
});