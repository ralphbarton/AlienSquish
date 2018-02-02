import React, { Component } from 'react';

import GridCell from './GridCell';

import GameLogic from './plain-js/GameLogic';

var _ = require('lodash');

const C = {
    cPX: 40 // what is the side length of the 'cells', in pixels
};

class Aliens_App extends Component {

    constructor(){
	super();

	const player = {
	    x: 10,
	    y: 7
	};
	
	this.state = {
	    board: {
		width: 20,
		height: 15,
		cells: GameLogic.newBoard(C, player, 3, 0.3)
	    },
	    ...player, // defined above...
	    aliens: [
		{}, {} // nothing yet...
	    ]
	};

	this.handleKeyDown     = this.handleKeyDown.bind(this);

    }


    componentDidMount(){
	document.addEventListener("keydown",   this.handleKeyDown);
    }

    componentWillUnmount() {
	document.removeEventListener("keydown",   this.handleKeyDown);
    }


    handleKeyDown(e){

	// extract direction 'd' and value 'v' from keystoke
	const ArrowKey = (()=>{
	    if(e.keyCode === 39) {return {d: "x", v: +1};} 	    // rightPressed
	    if(e.keyCode === 37) {return {d: "x", v: -1};} 	    // leftPressed
	    if(e.keyCode === 38) {return {d: "y", v: -1};} 	    // upPressed
	    if(e.keyCode === 40) {return {d: "y", v: +1};} 	    // downPressed
	    return null;
	})();

	// no further action if key was not an arrow key
	if(!ArrowKey){return;}

	// otherwise, get the new state taking this move into account.
	const newState = GameLogic.playerMove(this.state, ArrowKey);
	this.setState(newState);

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
