import React from 'react';

import ImageA   from './asset/blk-A.png';
import ImageB   from './asset/blk-B.png';
import ImageC   from './asset/blk-C.png';
import ImageD   from './asset/blk-D.png';

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
