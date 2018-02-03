import update from 'immutability-helper';
var _ = require('lodash');

const GameLogic = {

    // 'C' - board size. 'P' - player coords
    genAliens: function(W, H, player, qty){
	return Array(qty).fill(null).map( ()=> {

	    // this logic does not prevent alien-alien, or alien-player overlaps, which should be blocked.
	    return {
		x: _.random(0, W-1),
		y: _.random(0, H-1),
		speed: Math.random()
	    };
	});
    },

    
    newBoard: function(W, H, player, aliens, dens){

	var uniqueKey = 0;
	
	// Generate content
	const longArr = Array(W * H).fill(null).map( (emptyElem, i)=> {

	    // 1. probabalistically determine if boulder is to be placed
	    var isBoulder = Math.random() <= dens;

	    // 2. no boulder if the player is there...
	    isBoulder = isBoulder && (i !== player.y * W + player.x);

	    if(isBoulder){
		return {
		    type: "C",
		    key: uniqueKey++
		};
	    }
	    return null;

	});

	// split into rows and return
	return _.chunk(longArr, W);
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
	const flattenedCellsPlus = flattenedCells.concat(
	    state.aliens.map( (ALI, i) => {
		return {...ALI, type: "D", key: 1000+i}
	    }),
	    [{
		    ...state.player,
		type: "A",
		key: "A"
	    }]
	);

	return _.sortBy(flattenedCellsPlus, 'key');
    },
    

    playerMove: function(state, ArrowKey){
	// ArrowKey = { d=[ 'x' | 'y' ], v = [ +1 -1 ] }

	const isX = ArrowKey.d === 'x'; // moving along x-direction
	const max = state.board[isX ? "width" : "height"] - 1;
	var latestState = state;
	
	function getNext(Coords){
	    return {
		x: Coords.x + (isX ? ArrowKey.v : 0),
		y: Coords.y + (isX ? 0 : ArrowKey.v)
	    };
	};
	
	function nudgeInto(Coords, nudger){

	    // case 1: nudge is into a location which is outside the board
	    const xy = isX ? Coords.x : Coords.y; //whichever of x or y is the direction of pushing.
	    if((xy < 0) || (xy > max)){return false;} // no movement
	    
	    // cases 2 & 3: where nudge is into an empty space (2) or a boulder (3)
	    const intoCell = latestState.board.cells[Coords.y][Coords.x];
	    const Coords2 = getNext(Coords);

	    /* this condition (incorporating the recursion) reads as does the motion
	       actually take place (potentially some way 'downstream'...) */
	    if(!intoCell || nudgeInto(Coords2, intoCell)){

		latestState = update(latestState, {
		    board: {
			cells: {[Coords.y]: {[Coords.x]:  {$set: nudger}  }}
		    }
		});
		return true;
	    }
	};

	// passing the 'null' will leave an empty space where the pushed bolder moves from
	const playerNext = getNext(state.player);
	if(nudgeInto(playerNext, null)){
	    //movement occurred. Let player move
	    return update(latestState, {player: {$set: playerNext}});
	}else{
	    // those boulders aren't moving!
	    return state;
	}
	
    }
    
};


export default GameLogic;
