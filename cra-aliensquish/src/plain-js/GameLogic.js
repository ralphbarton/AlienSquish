import update from 'immutability-helper';
var _ = require('lodash');

const GameLogic = {

    // 'C' - board size. 'P' - player coords
    newBoard: function(C, P, aliens, dens){

	// 1. generate content
	const longArr = Array(C.max_X*C.max_Y).fill(null).map( ()=> {
	    return (Math.random() > dens ? 0 : "C");
	});

	// 2. split into the rows
	const Board = _.chunk(longArr, C.max_X)

	// 3. Add aliens

	// 4. make a space for player
	Board[P.pY][P.pX] = 0;
	
	return Board;
    },

    testMove: function(board, pX, pY, d, v, C){ // d=[ 'X' | 'Y' ] v = [ +1 -1 ]

	

	const next = {
	    pX: pX + (d === "X" ? v : 0),
	    pY: pY + (d === "Y" ? v : 0)
	};


	
	if(board[next.pY][next.pX] === 0){//simply moving into empty space
	    return board;

	}else{
	    // for now, assume moving into a Rock

	    return update(board, {
		[next.pY]: {
		    [next.pX]: {$set: "B"}
		},
	    });
	    
	    
	}
	    
	
    }
};


export default GameLogic;
