
define(["mot/searchTilesDao", "mot/tileDao", "mot/eventPageDao", "dojo/_base/array", "dojo/dom", "dojo/html"], 
function(searchTilesDao, tileDao, eventPageDao, arrayUtil) {

var IndexController = { 

    dom:null,
    html:null,
    setup:function(dbpath, dbname, html, dom) {
        searchTilesDao.setup(dbpath,dbname);
        tileDao.setup(dbpath,dbname);
        eventPageDao.setup(dbpath,dbname);
        this.dom= dom;
        this.html = html;
    },
    findAllEventPages:function() {
	    eventPageDao.findAllEvents( function(array) {
      	    IndexController.displayEvents("View All Events & Pages", array);
	    });
    },
    findAll:function() {
	    searchTilesDao.findAll( function(array) {
      	    IndexController.displayTable("View All Tiles", array);
	    });
    },
    findVersion:function(tile) {
	    searchTilesDao.findTile(tile, function(array) {
	        IndexController.displayTable("View Versions", array);
	    });
    },
    get:function(id) {
	    tileDao.get(id, function(tile) {
            console.log("...inside callback");
            var label = " ID - " + tile._id;
	        IndexController.displayTile(label, tile);
	    });
    },
    save:function(tile, state) {
	    tile.state = state;
      	tileDao.save(tile);
	    this.get(tile._id);
    },
    hello:function() {
      	console.log("Hello");
	    this.html.set(this.dom.byId("results"), "<b>Hello!</b>");
    },
    displayEvents:function(label, array) {
        console.log("...inside displayEvents");
	
	    console.log(array);
	    var output = "<table>";
    	output += "<tr><td>" + label + "</td></tr>";
	    arrayUtil.forEach( array, function(row, index, arr) {
	        output +="<tr>";
	        output +="<td>" + row.F000 + "</td>";
	        output +="<td>" + row.F001 + "</td>";
	        output +="<td>" + row.F002 + "</td>";
	        output +="</tr>";
	    });
	    output +="</table>";

	    this.html.set(this.dom.byId("results"), output);
    },
    displayTable:function(label, array) {
        console.log("...inside displayTable");
	
	    var output = "<table>";
    	output += "<tr><td>" + label + "</td></tr>";
	    arrayUtil.forEach( array, function(row, index, arr) {
	        output +="<tr>";
	        output +="<td>" + row._id + "</td>";
	        output +="<td>" + row.F000 + "</td>";
	        output +="<td>" + row.F002 + "</td>";
	        output +="<td>" + row.F003 + "</td>";
	        output +="<td>" + row.F004 + "</td>";
	        output +="<td>" + row.state + "</td>";
	        output +="</tr>";
	    });
	    output +="</table>";

	    this.html.set(this.dom.byId("results"), output);
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
	    this.html.set(this.dom.byId("results"), output);
    }
};

return IndexController;
}); //define
