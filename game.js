$(document).ready(function (e){
	var rows = prompt('How many rows/columns would you like to play minesweeper on?');
	Minesweeper.init(rows);
});

Minesweeper = {

	init: function(rows) {
		this.calculateMines(rows);
		this.buildGrid();
		this.setMines();
	},

	calculateMines: function(rows) {
		this.gridSize = rows;
		this.mineRatio = 0.2;
	},

	buildGrid: function(){
		var grid = [];
		for(var i = 0; i < this.gridSize; i++){
			grid[i] = [];
			for(var j = 0; j < this.gridSize; j++){
				grid[i][j] = new this.space();
			}
		}

		debugger;

		//also build front end
		//this.buildUI();
	},

	setMines: function() {
		//based on mineRatio
	},

	space: function() {
		this.mine = false;
		this.clicked = false;
	}

}

