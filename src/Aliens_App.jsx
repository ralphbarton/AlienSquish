import React, { Component } from 'react';

import GridCell from './GridCell';
import ScoresStrip from './ScoresStrip';
import Modal from './Modal';
import Modal_Messages from './Modal_Messages';
//import LevelExtact from './LevelExtact';

import GameLogic from './plain-js/GameLogic';
import GameInitialise from './plain-js/GameInitialise';

var _ = require('lodash');

class Aliens_App extends Component {

    constructor(){
	super();
	
	//	this.state = GameInitialise.loadState("RANDOM");
	this.state = GameInitialise.loadState("LEVEL_LOAD");
	
	this.handleKeyDown     = this.handleKeyDown.bind(this);
	this.aliensTick        = this.aliensTick.bind(this);

	//A massive anti-pattern
	window.getLatestState  = this.getLatestState.bind(this);
    }


    getLatestState(){
	return this.state;
    }

    componentDidMount(){
	document.addEventListener("keydown",   this.handleKeyDown);
	setInterval(this.aliensTick, 100);
    }

    componentWillUnmount() {
	document.removeEventListener("keydown",   this.handleKeyDown);
    }


    handleKeyDown(e){

	if(this.state.mode !== "PLAY"){
	    if(e.keyCode === 13){
		const currentModalMsg = _.find(Modal_Messages, {id: this.state.mode});
		currentModalMsg.action({
		    state: this.state,
		    setState: this.setState.bind(this)
		});
	    }
	    return;
	}

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

    aliensTick(){
	if(this.state.mode !== "PLAY"){return;}
	const newState = GameLogic.aliensMove(this.state);
	this.setState(newState);
    }

    render() {

	const boxW = 40 * this.state.board.width;
	const boxH = 40 * this.state.board.height;
	const rasteredCells = GameLogic.getRasteredCells(this.state);
	return (
	    <div className="Aliens_App">

	      {/* 1. The Modal overlay (it may or may not actually be visible) */}
	      <Modal state={this.state} setState={this.setState.bind(this)} />

	      {/* 2. Heading Area */}
	      <div className="title">
		The Alien-Squish Game
		<div>built in React</div>
	      </div>


	      {/* 3. The Game States (scores strip) */}
	      <ScoresStrip state={this.state} width={boxW}/>
		   
	      {/* 4. Board Area */}
	      <div className="box"
		   style={{
		       width: boxW,
		       height: boxH
		   }}
		   >
	      
	      {
		  rasteredCells.map( cell => {
		      if (!cell){return null;}
		      return (
			  <GridCell {...cell}
			     />
			  );
		  })

	      }
		
	    </div>


		{/* 5. Used for Level data generation (not part of the actual game) */}
	    {/*
		<LevelExtact/>
	      */}

	    </div>
	);
    }
}

export default Aliens_App;
