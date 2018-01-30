import React, { Component } from 'react';

import GridCell from './GridCell';

class Aliens_App extends Component {

    constructor(){
	super();
	this.state = {
	    vSplit: true,
	    selectedFont: {value: 1}
	};
    }

    render() {

	return (
	    <div className="Aliens_App">

	      {/* 1. Heading Area */}
	      <div className="title">
		The Alien-Squish Game
		<div>built in React</div>
	      </div>

	      {/* 2. Heading Area */}
	      <div className="box">
	      
	      {
		  ["A", "B", "C", "D"].map( (str, i) => {
		      return (
			  <GridCell
			     type={str}
			     key={i}
			     x={3-i}
			     y={i}
			     />
		      );
		  })
	      }
	    </div>
	    
	    </div>
	);
    }
}

export default Aliens_App;
