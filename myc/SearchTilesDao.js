
define(["dojo/store/JsonRest", "dojo/_base/array", "dojo/_base/declare"], function(JsonRest, arrayUtil, declare) {

    var SearchTilesDao = declare("SearchTilesDao", null,  {
        store: new JsonRest(),
        viewPath: "_design/render/_view/view_by_version",

        setup:function(dbPrefix,dbName) {
            this.store.target = "http://localhost:10039/motweb/search"
//            this.store.target = dbPrefix + "/" + dbName + "/" + this.viewPath;
        },
	    findAll: function(callback) {
	        console.log("...inside findAll");

	        var tileVersionsArray = [];
            this.store.query( "", {} ).then(function(results) {
                arrayUtil.forEach( results.rows, function(row, index, arr) {
                    tileVersionsArray[index] = row.value;
                });
                callback(tileVersionsArray);
            });

            return tileVersionsArray;
        },
	    findTileVersionByTile: function(tile, callback) {
	        console.log("...inside findTile");

	        var  params = "?key=[\"" 
                + tile.versionsId 
    		    + "\"]";

	        var tileVersionsArray = [];
            this.store.query( params, {} ).then(function(results) {
		        arrayUtil.forEach( results.rows, function(row, index, arr) {
                        tileVersionsArray[index] = row.value;
	            });
                callback(tileVersionsArray);
            });
        },
        findTileVersion: function(versionsId, callback) {
	        console.log("...inside findTile(4x)");

	        var  params = "?key=[\"" 
                + versionsId
		        + "\"]";

	        var tileVersionsArray = [];
            this.store.query( params, {} ).then(function(results) {
		        arrayUtil.forEach( results.rows, function(row, index, arr) {
                        tileVersionsArray[index] = row.value;
	            });
                callback(tileVersionsArray);
            });
        }
    });

    return SearchTilesDao;

}); //End Define
