import React, { Component } from 'react';

import GridCell from './GridCell';

import GameLogic from './plain-js/GameLogic';

var _ = require('lodash');

const C = {
    cPX: 40,
    max_X: 20,
    max_Y: 15
};

class Aliens_App extends Component {

    constructor(){
	super();

	const start_coords = {
	    pX: parseInt(C.max_X/2),
	    pY: parseInt(C.max_Y/2)
	};
	
	this.state = {
	    board: GameLogic.newBoard(C, start_coords, 3, 0.3),
	    ...start_coords
	};

	this.handleKeyDown     = this.hofHandleKeyDown.bind(this);
//	console.log(this.state.board);
    }


    componentDidMount(){
	document.addEventListener("keydown",   this.handleKeyDown);
    }

    componentWillUnmount() {
	document.removeEventListener("keydown",   this.handleKeyDown);
    }


    hofHandleKeyDown(e){

	const F = (d,v) => {

	    const s = this.state;
	    const nextB = GameLogic.testMove(s.board, s.pX, s.pY, d, v, C);
	    
	    if(v<0){// wants to move up or left
		if(this.state["p"+d] <= 0){return;}//no action if at adge
	    }else{// wants to move down or right
		if(this.state["p"+d] >= (C["max_"+d]-1)){return;}//no action if at adge
	    }

	    this.setState({
		//player...
		["p"+d]: this.state["p"+d]+v,
		//board
		board: nextB
	    });
	};

	if(e.keyCode === 39) {
	    // rightPressed
	    F("X", +1); 
	}
	else if(e.keyCode === 37) {
	    // leftPressed
	    F("X", -1); 
	}
	else if(e.keyCode === 38) {
	    // upPressed
	    F("Y", -1); 
	}
	else if(e.keyCode === 40) {
	    // downPressed
	    F("Y", +1); 
	}

    }
    

    render() {

	return (
	    <div className="Aliens_App">

	      {/* 1. Heading Area */}
	      <div className="title">
		The Alien-Squish Game
		<div>built in React</div>
	      </div>

	      {/* 2. Board Area */}
	      <div className="box"
		   style={{
		       width: (C.cPX * C.max_X),
		       height: (C.cPX * C.max_Y)
		   }}
		   >
	      
	      {
		  _.flatten(this.state.board.map( (row, i_y) => {
		      return row.map( (cell, i_x) => {
			  if (cell === 0){return null;}
			  return (
			      <GridCell
				 type={cell}
				 key={`x${i_x}y${i_y}`}
				 x={i_x}
				 y={i_y}
				 />
			  );
		      });
		  }))
	      }

	    {/* 3. Draw the player */}
	    	<GridCell
	    type={"A"}
	    x={this.state.pX}
	    y={this.state.pY}
		/>
		
	    </div>
	    
	    </div>
	);
    }
}

export default Aliens_App;
