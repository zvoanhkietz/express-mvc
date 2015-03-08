var _ = require('underscore');
module.exports = {
	name: 'Base',
	extend: function(child){
		return _.extend({}, this, child);
	},
	init: function(req, res){ }
}