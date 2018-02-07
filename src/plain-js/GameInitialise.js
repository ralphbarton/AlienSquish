import leveldata from './leveldata';

var _ = require('lodash');

const GameInitialise = {


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
    
    
    // 'C' - board size. 'P' - player coords
    newRandomAliensPlacement: function(W, H, player, qty){
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
	    lives: 3,
	    score: 0,
	    invincible: false
	};

	
	// this was the basic way
	if(op === "RANDOM"){
	    return {
		board: this.newBoard( "RANDOM", 0),
		aliens: this.newRandomAliensPlacement(20, 15, player, 6),
		player, // defined above...
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
    }

        
};


export default GameInitialise;
