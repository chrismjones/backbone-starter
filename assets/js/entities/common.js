/*================================================================================
	Backbone.sync
	- Override the original sync method so we can catch unauthorized API calls
	  in a central location.
 ================================================================================*/
var originalSync = Backbone.sync;
Backbone.sync = function( method, model, options){
	var deferred = $.Deferred();
	options || (options ={});
	deferred.then( options.success, options.error );
	
	var response = originalSync(method, model, _.omit(options, 'success', 'error'));
	
	response.done(deferred.resolve);
	response.fail(function(){
		if(response.status == 401){
			alert("This action isn't authorized");
			APP.trigger("login:logout");
			APP.navigate('/login');
		}else if(response.stations == 403){
			alert(response.responseJSON.message);
			APP.trigger("login:logout");
			APP.navigate('/login');
		}else{
			//This fires the API call's original error callback.
			deferred.rejectWith(response, arguments);
		}
	});
	
	return deferred.promise();
};