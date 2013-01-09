
define(["dojo/store/JsonRest", "dojo/_base/array", "dojo/_base/declare"], function(JsonRest, arrayUtil, declare) {

    var EventPageDoa = declare("EventPageDao", null, {
	    store: new JsonRest(),
        viewPath: "_design/render/_view/list_event_info?group=true",
        setup:function(dbPrefix,dbName) {
            this.store.target = dbPrefix + "/" + dbName + "/" + this.viewPath;
        },
	    findAllEvents: function(callback) {
	        //console.log("...inside findAllEvents");

	        var eventPageArray = [];

            this.store.query( "", {} ).then(function(results) {

	            arrayUtil.forEach( results.rows, function(row, index, arr) {
		        var view = { "F000":row.key[0],"F001":row.key[1], "F002":row.key[2] }; 
                        eventPageArray[index] = view;
	            });

                    callback(eventPageArray);
            });
        }

    });

    return EventPageDoa;

}); //define
