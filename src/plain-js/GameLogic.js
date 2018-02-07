import update from 'immutability-helper';

var _ = require('lodash');

const GameLogic = {

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


	const flattenedCellsPlus = flattenedCells.concat(
	    //add in the aliens...
	    state.aliens.map( (ALI, i) => {
		return {...ALI, type: "D"}
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

	function setBoardCell(Coords, obj, withAlienUpdate){

	    //update the POSITION of a particular alien, in the aliens Array of 'state'
	    if(withAlienUpdate && obj && obj.type === "D"){
		const alienIndex = _.findIndex(latestState.aliens, {key: obj.key});
		latestState = update(latestState, {
		    aliens: {
			[alienIndex]: {
			    x: {$set: Coords.x},
			    y: {$set: Coords.y}
			}
		    }
		});
	    }

	    // update the board cell
	    latestState = update(latestState, {
		board: {
		    cells: {[Coords.y]: {[Coords.x]:  {$set: obj}  }}
		}
	    });
	};

	// add the aliens into the board
	state.aliens.forEach( (ALI, i)=>{
	    setBoardCell(ALI, {type: "D", key: ALI.key});
	});	
	
	
	function getNext(Coords){
	    return {
		x: Coords.x + (isX ? ArrowKey.v : 0),
		y: Coords.y + (isX ? 0 : ArrowKey.v)
	    };
	};

	function outside(Coords){
	    const xy = isX ? Coords.x : Coords.y; //whichever of x or y is the direction of pushing.
	    return (xy < 0) || (xy > max);
	};
	
	function nudgeInto(Coords, nudger){

	    // case 1: nudge is into a location which is outside the board
	    if(outside(Coords)){return false;}

	    // case 2: nudge is into an immovable red rock ('obstruction')
	    const intoCell = latestState.board.cells[Coords.y][Coords.x];
	    if(intoCell && (intoCell.type === "B")){
		return false;
	    }
	    
	    // case 3: player has moved into an Alien Player dies
	    const isIntoAlien = intoCell && (intoCell.type === "D");

	    // All handled below:
	    // case 4: nudge is a rock into an alien, AND at the alien's other side is Boulder OR obstruction (not an Alien)
	    // (that is the alien squish condition)
	    // case 5: nudge is into an empty space
	    // case 6: nudge is into a boulder
	    const Coords2 = getNext(Coords);
	    const subsequentCell = outside(Coords2) || latestState.board.cells[Coords2.y][Coords2.x];
	    const isAlienSquish = isIntoAlien && subsequentCell && (subsequentCell.type !== "D");

	    /* this condition here (incorporating the recursion as 'last resort') as answers the question for
	       the caller: "does the motion actually take place (potentially some way 'downstream'...) */
	    if(isAlienSquish || !intoCell || nudgeInto(Coords2, intoCell)){

		if(isAlienSquish){
		    // kill that alien
		    const alienIndex = _.findIndex(latestState.aliens, {key: intoCell.key});
		    latestState = update(latestState, {
			aliens: {$splice: [[alienIndex, 1]]},
			player: {score: {$apply: x => {return x+5;}}}// 5 points per kill
		    });
		}
		
		setBoardCell(Coords, nudger, true);
		return true;
	    }
	};

	// passing the 'null' will leave an empty space where the pushed bolder moves from
	const playerNextCoords = getNext(state.player);

	if(nudgeInto(playerNextCoords, null)){
	    //movement occurred. Let player move

	    // Clear all aliens that were placed on the board for the calculations, prior to returning board as state
	    latestState = update(latestState, {
		board: {
		    cells: {
			$set: latestState.board.cells.map( (row, y) => {
			    return row.map( (cell, x) => {return (cell && cell.type) === "D" ? null : cell;})
			})
		    }
		}
	    });
	    
	    if(latestState.aliens.length === 0){
		latestState = update(latestState, {mode: {$set: "COMPLETE"}});
	    }

	    //update player position
	    const playerNext = update(latestState.player, {x: {$set: playerNextCoords.x}, y: {$set: playerNextCoords.y}});
	    
	    return update(latestState, {player: {$set: playerNext}});
	}else{
	    // those boulders aren't moving!
	    return state;
	}
	
    },

    aliensMove: function(state){

	const Xmax = state.board.width -1;
	const Ymax = state.board.height -1;

	var latestState = state; // we need to cumulate the changes because multiple aliens may move
	
	state.aliens.forEach( (ALI, alienIndex) => {

	    const willMove = ALI.speed > Math.random()*1.2;
	    if(!willMove){return;}
	    for(var z = 0; z < 1000; z++){ // I would use while(1) except when the alien is cornered it cannot move
		const dx = _.random(-1, 1);
		const dy = _.random(-1, 1);
		if( dx===0 && dy===0 ){continue;}//movement must occur
		const newX = ALI.x + dx;
		const newY = ALI.y + dy;
		// must be within bounds (test here to prevent reference errors)
		if( newX < 0 || newX > Xmax ){continue;}
		if( newY < 0 || newY > Ymax ){continue;}

		// it moved into PLAYER?
		if(newX === state.player.x && newY === state.player.y){

		    console.log("before loss registered, lives = ", latestState.player.lives);
		    latestState = update(latestState, {
			aliens: {
			    [alienIndex]: {
				x: {$set: newX},
				y: {$set: newY}
			    }
			},
			player: {lives: {$apply: x => {return x-1;}}},
			mode: {$set: "LIFE_LOST"}
		    });
		}
		
		// must otherwise be into empty space
		if(state.board.cells[newY][newX] !== null){continue;}

		latestState = update(latestState, {
		    aliens: {
			[alienIndex]: {
			    x: {$set: newX},
			    y: {$set: newY}
			}
		    }
		});
	    }
	});

	// contains all alien-movement changes...
	return latestState;
	
    }
    
};


export default GameLogic;
