import React from 'react';

import AllLevels   from './levels-bitmap/aliens-levels.png';

var _ = require('lodash');

class LevelExtact extends React.PureComponent {
    

    componentDidMount(){

	var canvas  = this.canvas_el;
	var context = canvas.getContext('2d');
	var image = new Image();

	/*
	 (w x h) - pixels
	 column 1: 9x9
	 column 2: 20x10
	 column 3: 25x15
	 column 4: 10x15	 
	 */

	const bitmapColumns = [
	    {// 1st
		width: 9,
		height: 9,
		qty: 6
	    },
	    {// 2nd
		width: 20,
		height: 10,
		qty: 6
	    },
	    {// 3rd
		width: 25,
		height: 15,
		qty: 4
	    },
	    {// 4th
		width: 10,
		height: 15,
		qty: 4
	    }
	];

	
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

	    const x = 1;
	    const y = 1;
	    const w = 9;
	    const h = 9;

	    const result = [];
	    //cumulative position pointer
	    var XX = 0;
	    var YY = 0;
	    
	    bitmapColumns.forEach( col => {

		YY = 1;
		for (var k=0; k < col.qty; k++){

		    const singleLevel = [];
		    for (var j=0; j < col.height; j++){
			singleLevel[j] = [];
			for (var i=0; i < col.width; i++){
			    singleLevel[j][i] = Bol(Arr[YY+j][XX+i]);
			    
			}
		    }

		    result.push({
			width: col.width,
			height: col.height,
			data: singleLevel
		    });

		    YY += col.height + 1;
		}
		XX += col.width + 1;
	    });

	    const textdata = JSON.stringify(result);
	    TS.textarea_el.value = textdata
		.replace(/\],\[/g,"],\n[") // ],[
		.replace(/},{/g,"},\n{")  // },{
	    	.replace(/\[\[/g,"[\n[") // [[
	    	.replace(/\]\]/g,"]\n]") // ]]
	    	.replace(/{\[/g,"{\n[")  // {[
	    	.replace(/\]}/g,"]\n}")  // ]}
	    	.replace(/,\"data/g,',\n"data')
	    	.replace(/,\"hei/g,',\n"hei');

	    
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
