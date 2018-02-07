import React from 'react';

import GameInitialise from './plain-js/GameInitialise';

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

			//load the next level
			const nextLevelState = GameInitialise.loadState("LEVEL_LOAD", props.state);
			if(nextLevelState){
			    props.setState(nextLevelState);
			}else{
			    props.setState({
				mode: "END_OF_LEVELS"
			    });
			}
		    }}>
		    GO!
		  </div>
		</div>
	    );
	}

	if(props.state.mode === "END_OF_LEVELS"){
	    return (
		<div>
		  <h2>
		    Game Completed!
		  </h2>
		  <div>
		    You have played all the levels written so far!
		  </div>
		  <div>
		    Reload the webpage to play again...
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
