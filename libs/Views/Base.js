var _ = require('underscore');
var util = require('util');
module.exports = function(res, template, layout){
	this.res = res;
	this.template = template;
	this.layout = layout || 'layout';
	this.javascripts = [];
}

module.exports.prototype = {
	extend: function(child){
		return _.extend({}, this, child);
	},
	render: function(data){
		data['layout'] = this.layout;
		data['javascripts'] = [];
		for(var i = 0; i < this.javascripts.length; i++){
			data['javascripts'].push(this.javascripts[i]);
		}
		if(this.template && this.res){
			this.res.render(this.template, data);
		}
	},
	setLayout: function(layout){
		this.layout = layout;
	},
	setTemplate: function(template){
		this.template = template;
	},
	useJavaScript: function(javascript){
		if(util.isArray(javascript)){
			for(var i = 0; i < javascript.length; i++ ){
				this.javascripts.push(javascript[i]);
			}
		}else{
			this.javascripts.push(javascript);
		}		
		return this;
	}
}