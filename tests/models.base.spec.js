var ModelBase = require('../libs/Models/Base');
var dbMockup = {};
describe('Model Base', function(){
	it('should create to a new instance', function(done){
		var model1 = new ModelBase(dbMockup);
		expect(model1.db).toBeDefined();
		expect(model1.extend).toBeDefined();
		done();
	});
	
	it('should be able to extend', function(done){
		var OtherModel = new ModelBase(dbMockup);
		var model2 = OtherModel.extend({
			OtherProp: 'valueProp',
			OtherMethod: function(a, b){
				return a*b;
			}
		});
		expect(model2.db).toBeDefined();
		expect(model2.extend).toBeDefined();
		expect(model2.OtherProp).toBe('valueProp');
		expect(model2.OtherMethod(2,3)).toBe(6);
		
		done();
	});
});