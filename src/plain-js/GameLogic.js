import update from 'immutability-helper';
var _ = require('lodash');

const GameLogic = {

    // 'C' - board size. 'P' - player coords
    newBoard: function(W, H, player, aliens, dens){

	var uniqueKey = 0;
	
	// 1. generate content
	const longArr = Array(W * H).fill(null).map( ()=> {
	    if(Math.random() > dens){
		return null;
	    }else{
		return {
		    type: "C",
		    key: uniqueKey++
		};
	    }

	});

	// 2. split into the rows
	const Board = _.chunk(longArr, W)

	// 3. Add aliens
	// todo
	
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

	const flattenedCells = _.flatten(state.board.cells.map( (row, y) => {
	    return row.map( (cell, x) => {
		if (!cell){return null;}
		return {
			...cell,
		    x,
		    y
		};
	    });
	}));

	//add in the player...
	flattenedCells.push({
		...state.player,
	    type: "A",
	    key: "A"
	});

	return flattenedCells;
    },
    

    playerMove: function(state, ArrowKey){
	// ArrowKey = { d=[ 'x' | 'y' ], v = [ +1 -1 ] }

	// 1. check if at edge of board (means no action)
	const max = state.board[ArrowKey.d === "x" ? "width" : "height"] - 1;
	if(ArrowKey.v<0){// wants to move up or left
	    if(state.player[ArrowKey.d] <= 0){console.log("edge");return state;}//no action if at adge
	}else{// wants to move down or right
	    if(state.player[ArrowKey.d] >= max){console.log("edge");return state;}//no action if at adge
	}

	const playerNext = {
	    x: state.player.x + (ArrowKey.d === "x" ? ArrowKey.v : 0),
	    y: state.player.y + (ArrowKey.d === "y" ? ArrowKey.v : 0)
	};

	const cellEntered = state.board.cells[playerNext.y][playerNext.x];
	
	if(!cellEntered){//simply moving into empty space

	    return update(state, {
		player: {$set: playerNext}
	    });

	}else{
	    // for now, assume moving into a Rock

	    const isX = ArrowKey.d === 'x'; // moving along x-direction
	    
	    var latestState = state;

	    function nudgeInto(x, y, nudger){

		// case 1: nudge is into a location which is outside the board
		const xy = isX ? x : y; //whichever of x or y is the direction of pushing.
		if((xy < 0) || (xy > max)){return false;} // no movement
	
		
		// cases 2 & 3: where nudge is into an empty space (2) or a boulder (3)
		const intoCell = latestState.board.cells[y][x];
		const x_ = x + (isX ? ArrowKey.v : 0);
		const y_ = y + (isX ? 0 : ArrowKey.v);

		/* this condition (incorporating the recursion) reads as does the motion
		   actually take place (potentially some way 'downstream'...) */
		if(!intoCell || nudgeInto(x_, y_, intoCell)){

		    latestState = update(latestState, {
			board: {
			    cells: {[y]: {[x]:  {$set: nudger}  }}
			}
		    });
		    return true;
		}
		
	    };

	    // paasing null will leave an empty space where the pushed bolder moves from
	    if(nudgeInto(playerNext.x, playerNext.y, null)){
		//movement occurred. Let player move
		return update(latestState, {player: {$set: playerNext}});
	    }else{
		// those boulders aren't moving!
		return state;
	    }
	    
	    
	}
	
    }
    
};


export default GameLogic;
