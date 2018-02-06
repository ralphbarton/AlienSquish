import update from 'immutability-helper';

import leveldata from './leveldata';

var _ = require('lodash');

const GameLogic = {

    // 'C' - board size. 'P' - player coords
    genAliens: function(W, H, player, qty){
	return Array(qty).fill(null).map( (emptyElem, i) => {

	    // this logic does not prevent alien-alien, or alien-player overlaps, which should be blocked.
	    return {
		x: _.random(0, W-1),
		y: _.random(0, H-1),
		key: 2000+i,
		speed: Math.random()
	    };
	});
    },

    loadState: function(op, oldState){

	var player = {
	    x: 10,
	    y: 7,
	    lives: 5,
	    score: 0
	};

	
	// this was the basic way
	if(op === "RANDOM"){

	    const aliens = GameLogic.genAliens(20, 15, player, 6);
	    return {
		board: this.newBoard( "RANDOM", 0),
		player, // defined above...
		aliens,
		level: "none",
		mode: "START"
	    }

	    
	}
	// the new way...
	else if(op === "LEVEL_LOAD"){

	    const newGame = !oldState;
	    if(!newGame){
		player = oldState.player;
	    }
	    if(!newGame && oldState.level >= leveldata.length){
		return null
	    }
	    var myLevel = leveldata[newGame ? 0 : (oldState.level)];
	    const longArr = [];
	    var uniqueKey = 0;
	    var aliens = [];

	    // 1. extract the Level layout
	    for (var j=0; j < myLevel.height; j++){
		for (var i=0; i < myLevel.width; i++){

		    const type = myLevel.data[j][i];
		    const isBoulder = type === "C";
		    const isObstruc = type === "B";

		    if(isBoulder || isObstruc){
			longArr.push({
			    type: isBoulder ? "C" : "B",
			    key: uniqueKey++
			});
		    }else{
			longArr.push(null);
		    }
		    
		    // A: Player cell
		    if(type === "A"){
			player.x = i;
			player.y = j;
		    }
		    // D: Alien cell
		    else if(type === "D"){
			aliens.push({
			    x: i,
			    y: j,
			    key: uniqueKey++,
			    speed: Math.random()
			});
		    }
		    
		}
	    }

	    // 2 return the new state object
	    return {
		board: {
		    width: myLevel.width,
		    height: myLevel.height,
		    cells: _.chunk(longArr, myLevel.width)
		},
		player, // defined above...
		aliens,
		level: newGame ? 1 : (oldState.level+1), //this evaluates to 1 greater than the leveldata item loaded
		mode: newGame ? "START" : "PLAY"
	    }
	}
	// this is advancing to a new level..
	else{

	}
    },
    
    newBoard: function(boardType, player, aliens, dens_Boulder, dens_Obstruc){
	if(boardType === "RANDOM"){
	    return {
		width: 20,
		height: 15,
		cells: this.newRandomCells(20, 15, player, aliens, 0.2, 0.05)
	    };
	}else{

	}
    },
    
    newRandomCells: function(W, H, player, aliens, dens_Boulder, dens_Obstruc){

	var uniqueKey = 0;
	
	// Generate content
	const longArr = Array(W * H).fill(null).map( (emptyElem, i) => {

	    // 1. probabalistically determine if boulder is to be placed
	    var isBoulder = Math.random() <= dens_Boulder;
	    var isObstruc = !isBoulder && Math.random() <= dens_Obstruc;

	    // 2. no boulder if the player is there...
	    isBoulder = isBoulder && (i !== player.y * W + player.x);

	    if(isBoulder || isObstruc){
		return {
		    type: isBoulder ? "C" : "B",
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
			player: {score: {$apply: x => {return x+5;}}}
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
	
    }
    
};


export default GameLogic;
