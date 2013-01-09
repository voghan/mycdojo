define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom", "dojo/html", "myc/SearchTilesDao", "myc/TileDao", "myc/eventPageDao"], 
function(arrayUtil, declare, dom, html) {

var IndexController = declare("IndexController", null, { 
    _this: this,
    tile: null,
    tiles: null,
    tileDao: new TileDoa(),
    searchTilesDao: new SearchTilesDao(),
    eventPageDao: new EventPageDao(),
    setup:function(dbpath, dbname) {
        this.searchTilesDao.setup(dbpath,dbname);
        this.tileDao.setup(dbpath,dbname);
        this.eventPageDao.setup(dbpath,dbname);
        _this = this;
    },

    findVersion:function(versionsId) {
        console.log("...inside findVersion");
        console.log(versionsId);

	    this.searchTilesDao.findTileVersion(versionsId, function(arry) {
            console.log(arry);

            _this.tiles = array;
	    });
    },
    get:function(id, callback) {
	    this.tileDao.get(id, function(tile) {
            console.log("...inside callback");
            var label = " ID - " + tile._id;
	        _this.displayTile(label, tile);
            _this.tile = tile;
	    });
    },
    save:function(tile, state) {
        console.log(tile);
	    tile.state = state;
      	this.tileDao.save(tile);
    },
});

return IndexController;
}); //define
