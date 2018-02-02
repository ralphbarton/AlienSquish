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


    /*
      "A" - player
      "B" - red X
      "C" - rock
      "D" - alien!!
     */
    rasteriseBoard: function(state){

	const RasterBoard = update(board, {
	    [state.player.y]: {
		[state.player.y]: {$set: "A"}
	    },
	});
	
	return _.flatten(state.board.cells.map( (row, y) => {
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



	const s = this.state;
	const nextB = GameLogic.testMove(s.board, s.pX, s.pY, K.d, K.v, C);
	
	if(K.v<0){// wants to move up or left
	    if(this.state["p"+K.d] <= 0){return;}//no action if at adge
	}else{// wants to move down or right
	    if(this.state["p"+K.d] >= (C["max_"+K.d]-1)){return;}//no action if at adge
	}

	({
	    //player...
	    ["p"+K.d]: this.state["p"+K.d]+K.v,
	    //board
	    board: nextB
	});
	
    },
    
    testMove: function(board, pX, pY, d, v, C){ 

	

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
