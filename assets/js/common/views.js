APP.module("Common.Views",function(Views, SO, Backbone, Marionette, $, _){
	/*================================================================================
		Loading
	 ================================================================================*/
		Views.Loading = Marionette.ItemView.extend({
			template:"#loading-view"
		});



	/*================================================================================
		Pagination
	 ================================================================================*/
	 	/* The Main Layout */
		Views.PaginatedView = Marionette.LayoutView.extend({
			 template: "#paginated-view"
			
			,regions: {
				 paginationControlsRegion: ".js-pagination-controls"
				,paginationMainRegion: ".js-pagination-main"
			}
			
			,initialize:function(options){
				this.collection = options.collection;
				var eventsToPropagate = options.propagatedEvents || [];
				
				/* The actual content */
				var listView = new options.mainView({ collection: this.collection });
				/* The paging controls */
				var controls = new Views.PaginationControls({ 
					 paginatedCollection: this.collection 
					,urlBase: options.paginatedUrlBase
				});
				
				
				var self = this;
				/* just propogate the event triggered by the controls. */
				this.listenTo( controls, "page:change", function(page){
					if(APP.config.debug){ console.log("Views.PaginatedView - page:change", page); }
					
					self.trigger("page:change", page);
				});
				
				_.each(eventsToPropagate, function(evt){
					self.listenTo(listView, evt, function(view, model){
						console.log('asdf')
						self.trigger(evt, view, model);
					});
				});
				
				this.on("show", function(){
					this.paginationControlsRegion.show(controls);
					this.paginationMainRegion.show(listView);
				});
			}
		})
		
		/* Paging Controls */
		Views.PaginationControls = Marionette.ItemView.extend({
			 template: "#pagination-controls"
			
			,initialize: function(options){
				this.paginatedCollection = options.paginatedCollection;
				this.urlBase = options.urlBase;
				/* Update the controls when the collection page has changed. Triggered from the collection itself */
				this.listenTo(this.paginatedCollection, "page:change:after", this.render);
			}
			
			,events: {
				"click a[class=navigatable]": "navigateToPage"
			}
			
			,navigateToPage: function(e){
				if(APP.config.debug){ console.log("Views.PaginationControls - navigateToPage"); }
				
				e.preventDefault();
				var page = parseInt( $(e.target).data('page'), 10);
				/* Set the param on the collection so that when it responds to the event, it knows where to go */
				this.paginatedCollection.parameters.set("page", page);
				this.trigger("page:change", page);
			}
			
			,serializeData: function(){
							/* .info() is provived by the paging plugin. It holds things like what the first/current/last page is */
				var  data = this.paginatedCollection.info()
					,url = this.urlBase;
					
				url += "page:";
				data.urlBase = url;

				return data;
			}
		})
	/* END Paging views */
});