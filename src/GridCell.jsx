import React from 'react';

import ImageA   from './asset/blk-A-a.png';
import ImageB   from './asset/blk-B-a.png';
import ImageC   from './asset/blk-C-a.png';
import ImageD   from './asset/blk-D-a.png';

var _ = require('lodash');

const dim = 40;

function selImg(str) {
    if (str === "A"){return ImageA;}
    if (str === "B"){return ImageB;}
    if (str === "C"){return ImageC;}
    return ImageD;
    
}

function GridCell(props) {

    const cellStyle = {
	left: props.x*dim,
	top: props.y*dim
    };

    if(props.type === "A" && props.invincible){
	cellStyle.opacity = 0.3;	
    }


    if(props.type === "D"){
	cellStyle.filter = `hue-rotate(${_.round(60*(0.5-props.speed))}deg)`;
    }
    
    return (
	<img className="GridCell"
	     src={selImg(props.type)} 
	     alt=""
	     style={cellStyle}
	     />
    );

}

export default GridCell;
