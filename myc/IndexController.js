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
    findAllEventPages:function() {
	    eventPageDao.findAllEvents( function(arry) {
      	    this.displayEvents("View All Events & Pages", arry);
	    });
    },
    findAll:function() {
	    this.searchTilesDao.findAll( function(arry) {
            console.log("...inside callback");
      	    _this.displayTable("View All Tiles", arry);
            _this.tiles = array;
	    });
    },
    findAllVersions:function() {
	    this.searchTilesDao.findAll( function(arry) {
            console.log("...inside callback");
      	    _this.displayTableVersion("View All Tiles", arry);
            _this.tiles = array;
	    });
    },
    findVersion:function(tile) {
        console.log("...inside findVersion");
        console.log(tile);
	    this.searchTilesDao.findTile(tile, function(arry) {
            console.log(arry);
	        _this.displayTable("View Versions", arry);
            _this.tiles = array;
	    });
    },
    findVersion:function(versionsId) {
        console.log("...inside findVersion");
        console.log(versionsId);

	    this.searchTilesDao.findTileVersion(versionsId, function(arry) {
            console.log(arry);
	        _this.displayVersion("View Versions", versionsId, arry);
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
	    this.get(tile._id);
    },
    approve:function(versionsId) {
        console.log("...inside approve");
        console.log(versionsId);
        this.saveVersion(versionsId, "Approve");
    },
    deny:function(versionsId) {
        console.log("...inside deny");
        console.log(versionsId);
        this.saveVersion(versionsId, "Working");
    },
    saveVersion:function(versionsId, state) {
        console.log("...inside saveVersion");

	    this.searchTilesDao.findTileVersion(versionsId, function(arry) {
            console.log(arry);
	        arrayUtil.forEach( arry, function(row, index, arr) {
                _this.save(row, state);
            });
            _this.findVersion(versionsId);
	    });
    },
    hello:function() {
      	console.log("Hello");
	    html.set(dom.byId("results"), "<b>Hello!</b>");
    },
    displayEvents:function(label, arry) {
        console.log("...inside displayEvents");
	
	    console.log(arry);
	    var output = "<table>";
    	output += "<tr><td>" + label + "</td></tr>";
	    arrayUtil.forEach( arry, function(row, index, arr) {
	        output +="<tr>";
	        output +="<td>" + row.F000 + "</td>";
	        output +="<td>" + row.F001 + "</td>";
	        output +="<td>" + row.F002 + "</td>";
	        output +="</tr>";
	    });
	    output +="</table>";

	    html.set(dom.byId("results"), output);
    },
    displayTable:function(label, arry) {
        console.log("...inside displayTable");

	    var output = "<table>";
    	output += "<tr><td>" + label + "</td></tr>";
	    arrayUtil.forEach( arry, function(row, index, arr) {
	        var rowout ="<tr>";
            rowout +="<td><button id=\"getBtn\" onClick=\"mController.get('"+row._id+"')\">Get</button></td>";
	        rowout +="<td>" + row._id + "</td>";
	        rowout +="<td>" + row.F000 + "</td>";
	        rowout +="<td>" + row.F002 + "</td>";
	        rowout +="<td>" + row.F003 + "</td>";
	        rowout +="<td>" + row.F004 + "</td>";
	        rowout +="<td>" + row.state + "</td>";
	        rowout +="</tr>";
            output += rowout;
	    });
	    output +="</table>";

	    html.set(dom.byId("results"), output);
    },
    displayTableVersion:function(label, arry) {
        console.log("...inside displayTableVersion");
        console.log(arry);

	    var output = "<table>";
    	output += "<tr><td>" + label + "</td></tr>";
	    arrayUtil.forEach( arry, function(row, index, arr) {
	        var rowout ="<tr>";
            rowout +="<td><button id=\"getBtn\" onClick=\"mController.findVersion('"
                        + row.versionsId 
                        +"')\">Get</button></td>";
	        rowout +="<td>" + row._id + "</td>";
	        rowout +="<td>" + row.F000 + "</td>";
	        rowout +="<td>" + row.F002 + "</td>";
	        rowout +="<td>" + row.F003 + "</td>";
	        rowout +="<td>" + row.F004 + "</td>";
	        rowout +="<td>" + row.state + "</td>";
	        rowout +="</tr>";
            output += rowout;
	    });
	    output +="</table>";

	    html.set(dom.byId("results"), output);
    },
    displayVersion:function(label, versionsId, arry) {
        console.log("...inside displayVersion");

	    var output = "<table>";
    	output += "<tr><td>" + label + "</td></tr>";
	    arrayUtil.forEach( arry, function(row, index, arr) {
	        var rowout ="<tr>";
	        rowout +="<td>" + row._id + "</td>";
	        rowout +="<td>" + row.F000 + "</td>";
	        rowout +="<td>" + row.F002 + "</td>";
	        rowout +="<td>" + row.F003 + "</td>";
	        rowout +="<td>" + row.F004 + "</td>";
	        rowout +="<td>" + row.state + "</td>";
	        rowout +="</tr>";
            output += rowout;
	    });
        output += "<tr>";
        output += "<td><button id=\"approveBtn\" onClick=\"mController.approve('"
                        + versionsId
                        +"')\">Approve</button></td>";
        output += "<td><button id=\"denyBtn\" onClick=\"mController.deny('"
                        + versionsId
                        +"')\">Deny</button></td>";
        output += "</tr>";
	    output +="</table>";

	    html.set(dom.byId("results"), output);
    },
    displayTile:function(label, tile) {
        console.log("...inside displayTile");
   
	    var output = "<table>";
    	output += "<tr><td>" + label + "</td></tr>";
	    output += "<tr>";
	    output += "<td>" + tile._id + "</td>";
	    output += "<td>" + tile.F000 + "</td>";
	    output += "<td>" + tile.F002 + "</td>";
	    output += "<td>" + tile.F003 + "</td>";
	    output += "<td>" + tile.F004 + "</td>";
	    output += "<td>" + tile.state + "</td>";
	    output += "</tr>";
	    output += "</table>";
	    html.set(dom.byId("results"), output);
    }
});

return IndexController;
}); //define
