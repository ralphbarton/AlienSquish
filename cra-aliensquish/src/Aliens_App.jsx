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
		The synesthesia text-to-colour translator
		<span>built in React</span>
	      </div>

	      {
		  ["A", "B", "C", "D"].map( (str, i) => {
		      return (
			  <GridCell
			     type={str}
			     x={3-i}
			     y={i}
			     />
		      );
		  })
	      }

	    </div>
	);
    }
}

export default Aliens_App;
