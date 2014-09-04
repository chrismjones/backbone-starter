var APP = new Marionette.Application();


/*================================================================================
	Setup different portions of the page
 ================================================================================*/
APP.addRegions({
	 headerRegion	: "#header-region"
	,mainRegion		: "#main-region"
})





/*================================================================================
	Routing Functions
	- really these just exist in case we want to switch routing out for something non-Backbone
 ================================================================================*/
APP.navigate = function(route, options){
	if(APP.config.debug){ console.log("APP.navigate", route); }
	options = options || {};
	Backbone.history.navigate( route, options );	
};
APP.getCurrentRoute = function(){
	return Backbone.history.fragment;
}



/*================================================================================
	What to do when the app starts
 ================================================================================*/
/* If we don't wait until after everything is initialized, we risk missing url fragments
	that are setup in other files (which is all of them). For this reason, use
	on("start" instead of addInitializer for history.start
 */
APP.on("start", function(){
	if(APP.config.debug){ console.log("app.js start"); }
	
	if(Backbone.history){
		Backbone.history.start({pushState: true});
		if(APP.config.debug){ console.log("this.getCurrentRoute()",this.getCurrentRoute()); }
		if(this.getCurrentRoute() === ""){ //do the default route
			/****************************************************************************
				REPLACE THIS!!!!
				... I mean, obviously you will because nothing will happen otherwise.
			*****************************************************************************/
			APP.trigger("your:default")
		} //else some sub-app's routing will kick in
	} //else Backbone isn't present and a ton of other errors have already been thrown
});