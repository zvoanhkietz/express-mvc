var express = require('express');
module.exports = function(app, controllers){
	// Front end
	app.use(express.Router().get("/", controllers.FrontIndex.index));
	
	// Back end
	app.use(express.Router().get("/admin", controllers.AdminIndex.index));
	app.use(express.Router().get("/admin/user", controllers.AdminUser.list));
	app.use(express.Router().get("/admin/user/add", controllers.AdminUser.add));
	app.use(express.Router().get("/admin/user/edit/:id([0-9]+)", controllers.AdminUser.edit));
	app.use(express.Router().get("/admin/user/del/:id([0-9]+)", controllers.AdminUser.del));
}