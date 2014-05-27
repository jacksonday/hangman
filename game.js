$(document).ready(function (e){
	startGame();

	$('#game').on('click', 'td', function(){
		var eye = $(this).parent().index();
		var jay = $(this).index();
			Minesweeper.clickSpace(eye, jay);
	});

	$('#game').on('contextmenu', 'td', function(e){
		e.preventDefault();
		var eye = $(this).parent().index();
		var jay = $(this).index();
		Minesweeper.flagSpace(eye, jay);
	});

	$('#game').on('click', '#god', function(){
		Minesweeper.flipGodMode();
		console.log('started new game');
	});

	$('#game').on('click', '#reset', function(){
		startGame();
		console.log('started new game');
	});
});

function startGame(){
	var rows = prompt('How many rows/columns would you like to play minesweeper on?');
	Minesweeper.init(rows);
}


Minesweeper = {

	init: function(rows) {
		this.gameOver = false;
		this.godMode = false;
		this.calculateMines(rows);
		this.buildGrid();
		this.setMines();
	},

	calculateMines: function(rows) {
		this.gridSize = rows;
		this.mineRatio = 0.2;
		this.numMines = Math.floor(this.gridSize * this.gridSize * this.mineRatio);
	},

	buildGrid: function(){
		this.grid = [];
		for(var i = 0; i < this.gridSize; i++){
			this.grid[i] = [];
			$("#game").append("<tr></tr>");
			for(var j = 0; j < this.gridSize; j++){
				this.grid[i][j] = new this.space();
				// debugger
				$("#game tr:last-child").append("<td></td>");
			}
		}
	},

	setMines: function() {
		//based on mineRatio
		// for(var i = 0; i < this.gridSize; i++){
		// for(var j = 0; j < this.gridSize; j++){
		//		if (Math.random() < this.mineRatio) this.grid[i][j].mine = true;
		// }
		// }

		var plantedMines = 0;

		while (plantedMines < this.numMines) {
			var i = Math.floor(Math.random() * this.gridSize);
			var j = Math.floor(Math.random() * this.gridSize);
			if (this.grid[i][j].mine === false){
				this.grid[i][j].mine = true;
				// $($($('tr')[j]).find('td')[i]).html('x');
				$('#game tr:nth-child('+(i+1)+') td:nth-child('+(j+1)+')').html('x');
				plantedMines ++;
			}
		}
	},

	minesAround: function(i, j) {
		numAdjacentMines = 0;
		for(row = i-1; row < i+2; row++){
			for(col = j-1; col < j+2; col++){
				try{
					if(this.grid[row][col].mine === true){
						numAdjacentMines++;
						console.log(numAdjacentMines);
					}
				}
				catch(err){
					//catches array index out of bounds errors
					//console.log(err);
				}
			}
		}
		return numAdjacentMines;
	},

	clickSpace: function(i, j) {

		if (this.gameOver === false){
			if(this.grid[i][j].clicked === true) {
				console.log("ya already clicked here, foo.");
			}
			else if(this.grid[i][j].flagged === true){
				if(this.grid[i][j].mine){
					this.numMines--;
					this.grid[i][j].mine = false;
				}
				// if(this.)
			}else if(this.grid[i][j].mine === true) {
				$('#game tr:nth-child('+(i+1)+') td:nth-child('+(j+1)+')').html('X');
				alert('!~boom~! mine at row:'+i+', col:'+j+' just blew up!');
				this.gameOver = true;
				this.grid[i][j].mine = false;
			}else{
				console.log(this.grid[i][j]);
				this.grid[i][j].clicked = true;
				// console.log(i,', ', j);
				// $('#game tr:nth-child('+(i+1)+') td:nth-child('+(j+1)+')').addClass('yellow');
				$('#game tr:nth-child('+(i+1)+') td:nth-child('+(j+1)+')').html(this.minesAround(i,j));
				if(this.minesAround(i,j) === 0) {
					for(var row = i-1; row < i+2; row++){
						for(var col = j-1; col < j+2; col++){
							console.log(row, col);
							try {
								console.log('got here');
								this.clickSpace(row, col);
							}
							catch(err) { }
						}
					}
				}
			}
		}
		else {
			alert('click reset to start a new game.');
		}
	},

	flipGodMode: function() {
		if(this.godMode){
			for(var i = 0; i < this.gridSize; i++){
				for(var j = 0; j < this.gridSize; j++){
					if(this.grid[i][j].mine && !this.grid[i][j].flagged){
						$('#game tr:nth-child('+(i+1)+') td:nth-child('+(j+1)+')').html('');

					}
				}
			}
			this.godMode = false;
		}
		else{
			for(var i = 0; i < this.gridSize; i++){
				for(var j = 0; j < this.gridSize; j++){
					if(this.grid[i][j].mine){
						$('#game tr:nth-child('+(i+1)+') td:nth-child('+(j+1)+')').html('M');
					}
				}
			}
			this.godMode = true;
		}
	},


	flagSpace: function(i, j) {
		if (this.gameOver === false) {
			this.grid[i][j].flagged = this.grid[i][j].flagged ? false : true;

			if(this.grid[i][j].flagged === true) {
				$('#game tr:nth-child('+(i+1)+') td:nth-child('+(j+1)+')').html('F');
			}else {
				if(this.godMode === false){
					$('#game tr:nth-child('+(i+1)+') td:nth-child('+(j+1)+')').html('');
				}else{
					$('#game tr:nth-child('+(i+1)+') td:nth-child('+(j+1)+')').html('M');
				}
			}

		}
	},

	space: function() {
		this.mine = false;
		this.clicked = false;
		this.flagged = false;
	}

};

