
define(["dojo/store/JsonRest", "dojo/_base/declare"], function(JsonRest, declare) {

    var TileDoa = declare("TileDoa", null, {
        store: new JsonRest(),
        viewPath: "",
        setup:function(dbPrefix,dbName) {
            this.store.target = dbPrefix + "/" + dbName + "/" + this.viewPath;
        },
	    save: function(tile) {
            console.log("...inside save");
	        this.store.put( tile , { id: tile._id });
            },
        get: function(id, callback) {
            console.log("...inside get");
            this.store.get( id, {} ).then(function(result) {
	            callback(result);
            });
        }
     });

    return TileDoa; //return

}); //define
