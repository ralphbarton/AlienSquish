import update from 'immutability-helper';
var _ = require('lodash');

const GameLogic = {

    // 'C' - board size. 'P' - player coords
    newBoard: function(W, H, player, aliens, dens){

	// 1. generate content
	const longArr = Array(W * H).fill(null).map( ()=> {
	    return (Math.random() > dens ? 0 : "C");
	});

	// 2. split into the rows
	const Board = _.chunk(longArr, W)

	// 3. Add aliens

	// 4. make a space for player
	Board[player.y][player.x] = 0;
	
	return Board;
    },


    /*
      "A" - player
      "B" - red X
      "C" - rock
      "D" - alien!!
     */
    getRasteredCells: function(state){

	const RasterCells = update(state.board.cells, {
	    [state.player.y]: {
		[state.player.x]: {$set: "A"}
	    },
	});
	
	return _.flatten(RasterCells.map( (row, y) => {
	    return row.map( (cell, x) => {
		if (cell === 0){return null;}
		return {
		    type:  cell,
		    key:   `x${x}y${y}`,
		    x,
		    y
		};
	    });
	}))
    },
    

    playerMove: function(state, ArrowKey){
	// ArrowKey = { d=[ 'x' | 'y' ], v = [ +1 -1 ] }

	// 1. check if at edge of board (means no action)
	if(ArrowKey.v<0){// wants to move up or left
	    if(state.player[ArrowKey.d] <= 0){console.log("edge");return state;}//no action if at adge
	}else{// wants to move down or right
	    const max = state.board[ArrowKey.d === "x" ? "width" : "height"] - 1;
	    if(state.player[ArrowKey.d] >= max){console.log("edge");return state;}//no action if at adge
	}

	const playerNext = {
	    x: state.player.x + (ArrowKey.d === "x" ? ArrowKey.v : 0),
	    y: state.player.y + (ArrowKey.d === "y" ? ArrowKey.v : 0)
	};



	if(state.board.cells[playerNext.y][playerNext.x] === 0){//simply moving into empty space

	    return update(state, {
		player: {$set: playerNext}
	    });

	}else{
	    // for now, assume moving into a Rock

	    return update(state, {
		board: {
		    cells:{
			[playerNext.y]: {
			    [playerNext.x]: {$set: "B"}
			}
		    }
		},
		player: {$set: playerNext}
	    });
	    
	    
	}
	
    }
    
};


export default GameLogic;
