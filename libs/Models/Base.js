var _ = require('underscore');
module.exports = function(db){
	this.db = global._db || db;
	this.table = '';
}

module.exports.prototype = {
	extend: function(child){
		return _.extend({}, this, child);
	},
	// pagination
	paginate: function(current, rowsPerPage, totalResult){
		current = parseInt(current);
		rowsPerPage = parseInt(rowsPerPage);
		totalResult = parseInt(totalResult);
		var totalPage = Math.ceil(totalResult/rowsPerPage);
		var currentPage = (current<=0) ?1:(current>=totalPage)?totalPage:current;
		var pages = [];
		var startPage= (totalPage < 20 || currentPage <= 10) ? 1:currentPage-10;
		var endPage = (currentPage+10>totalPage)?totalPage:currentPage+10;
		for(var i= startPage; i <= endPage; i++){
			pages.push(i);
		}
		return {
			start: (currentPage - 1) * rowsPerPage, 
			offset: rowsPerPage,
			current: currentPage,
			pages: pages,
			next: (currentPage >= totalPage )? totalPage: currentPage + 1,
			prev: (currentPage <= 1 )? 1: currentPage - 1
		};
	},
	// find data
	find: function(options, callback){
		var $this = this;
		var type = options['type'] || 'all';
		var listKey = [];
		var listValue = [];
		var strQuery = '';
		options['fields'] = options['fields'] || ['*'];
		strQuery += '\
			SELECT ' + options['fields'].join(',') + '\
			  FROM ' + this.table;
		if(options['conditions']){
			for(var key in options['conditions']){
				listKey.push(key + ' = ?');
				listValue.push(options['conditions'][key]);
			}
			var CondStr = listKey.join(' AND ');
			strQuery += '\
			 WHERE '+ CondStr;
		}
		
		if(options['orders']){
			strQuery += '\
			 ORDER BY '+ options['orders'].join(',');
		}
		if(options['page']){
			var page = parseInt(options['page']) || 1;
			var rowsPerPage = parseInt(options['rowPerPage']) || 20;
			$this.count(function(err, count){
				$this.pagination = $this.paginate(page, rowsPerPage, count);
			});
			options['limit'] = $this.pagination.start + ',' + $this.pagination.offset;
		}
		
		if(options['limit']){
			strQuery += '\
			 LIMIT '+ options['limit'];
		}
		
		$this.db.query(strQuery, listValue, function(err, rows, fields) {
			if(err){
				callback(new Error(err));
			}else {
				if(type === 'first'){
					callback(null, rows[0] || null);
				}else{
					rows = (options['page'])?{ rows: rows, paging: $this.pagination}:rows;
					callback(null, rows);
				}
			}
		});
		return $this;
	},
	// count data
	count: function(callback){
		var strQuery = 'SELECT count(*) as count FROM ' + this.table;
		this.db.query(strQuery, [], function(err, rows, fields) {
			var count = rows[0]['count'] || 0;
			callback(err, count);
		});
	}
}