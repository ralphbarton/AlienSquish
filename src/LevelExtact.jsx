import React from 'react';

import AllLevels   from './levels-bitmap/aliens-levels.png';


class LevelExtact extends React.PureComponent {
    

    componentDidMount(){

	var canvas  = this.canvas_el;
	var context = canvas.getContext('2d');
	var image = new Image();

	const TS = this;
	image.onload = function(){
	    context.drawImage(image,0,0,canvas.width,canvas.height);

	    var myData = context.getImageData(0, 0, image.width, image.height);
	    TS.textarea_el.value = myData.data;

	    for(var i=0; i< 69*4; i++){
		this.pix
	    }

	    
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
