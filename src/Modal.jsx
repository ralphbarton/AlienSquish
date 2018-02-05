import React from 'react';


function Modal(props) {

    function Message(){
	if(props.state.mode === "START"){
	    return (
		<div>
		  <h1>
		    Alien Squish
		  </h1>
		  <div>
		    Ferocious aliens are marauding. They're all around the district! The aliens must be exterminated!
		  </div>
		  <div>
		    Kill all the aliens by squishing them with boulders.
		  </div>
		  <div>
		    Don't let the aliens get you first!
		  </div>
		  <div className="action" onClick={ ()=>{
		    props.setState({mode: "PLAY"});
		    }}>
		    GO!
		  </div>


		</div>
	    );
	}

	if(props.state.mode === "COMPLETE"){
	    return (
		<div>
		  <h2>
		    Level Completed!
		  </h2>
		  <div>
		    All the aliens were exterminated.
		  </div>
		  <div>
		    You advance to the next level!
		  </div>
		  <div className="action" onClick={ ()=>{
		    props.setState({mode: "PLAY"});
		    }}>
		    GO!
		  </div>
		</div>
	    );
	}

	return null;
    };
    
    return (
	<div className={"Modal " + props.state.mode}>

	  {Message()}

	</div>
    );

}

export default Modal;
