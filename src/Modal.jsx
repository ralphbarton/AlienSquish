import React from 'react';

import Modal_Messages from './Modal_Messages';



function Modal(props) {
    
    function Message(){

	var MSG = null;

	Modal_Messages.forEach( MSGobj => {
	    if(MSGobj.id === props.state.mode){

		MSG = (
		    <div>
		      {MSGobj.jsx(props)}
		      <div className="action" onClick={MSGobj.action.bind(null,props)}>
			{MSGobj.actionText}
		      </div>
		    </div>		    
		);

	    }
	});

	return MSG;
    };
    
    return (
	<div className={"Modal " + props.state.mode}>

	  {Message()}

	</div>
    );

}

export default Modal;
