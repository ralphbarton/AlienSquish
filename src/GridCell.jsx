import React from 'react';

import ImageA   from './asset/blk-A-a.png';
import ImageB   from './asset/blk-B-a.png';
import ImageC   from './asset/blk-C-a.png';
import ImageD   from './asset/blk-D-a.png';

const dim = 40;

function selImg(str) {
    if (str === "A"){return ImageA;}
    if (str === "B"){return ImageB;}
    if (str === "C"){return ImageC;}
    return ImageD;
    
}

function GridCell(props) {

    return (
	<img className="GridCell"
	     src={selImg(props.type)} 
	     alt=""
	     style={{
		 left: props.x*dim,
		 top: props.y*dim
	     }}
	     />
    );

}

export default GridCell;
