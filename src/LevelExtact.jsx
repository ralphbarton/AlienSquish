import React from 'react';

import AllLevels   from './levels-bitmap/aliens-levels.png';

var _ = require('lodash');

class LevelExtact extends React.PureComponent {
    

    componentDidMount(){

	var canvas  = this.canvas_el;
	var context = canvas.getContext('2d');
	var image = new Image();

	const TS = this;
	image.onload = function(){
	    context.drawImage(image,0,0,canvas.width,canvas.height);

	    var myData = context.getImageData(0, 0, image.width, image.height);

	    const Arr = _.chunk(_.chunk(myData.data,4), image.width);

	    /*
	     WHITE (space)   = 255,255,255,255
	     GREEN (alien)   = 35,178,82,255
	     RED (barrier)   = 236,4,46,255
	     brown (boulder) = 183,121,90,255
	     orange (player) = 254,125,54,255
	     */

	    function Bol(col){
		//only bother checking the red channel [0]
		if (col[0] === 254){return "A";} // plr
		if (col[0] === 236){return "B";} // red X
		if (col[0] === 183){return "C";} // boulder
		if (col[0] === 35) {return "D";} //alien
		return 0;
	    };


	    /*
	     (w x h) - pixels
	     column 1: 9x9
	     column 2: 20x10
	     column 3: 25x15
	     column 4: 10x15
	     
	     */
	    const x = 1;
	    const y = 1;
	    const w = 9;
	    const h = 9;

	    const result = [];

	    for (var j=0; j < h; j++){

		result[j] = [];
		for (var i=0; i < w; i++){
		    result[j][i] = Bol(Arr[y+j][x+i]);
			
		}
	    }
	    
	    TS.textarea_el.value = JSON.stringify(result);

	    
	};
	image.src = AllLevels;


	
    }
    
    render(){
    
    return (
	<div>
	  <textarea readOnly={true}
		  ref={ (el) => {this.textarea_el = el;}}
		  />
	<canvas
	   ref={ (el) => {this.canvas_el = el;}}
	  width={69}
	  height={77}
	  />
	</div>

    );
    }

}

export default LevelExtact;
