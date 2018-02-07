

import React from 'react'; // note: 'React' must be in scope when using JSX

import GameInitialise from './plain-js/GameInitialise';

const Modal_Messages = [
    {   // 1. Welcome player to the Game
	id: "START",
	action: (props)=>{props.setState({mode: "PLAY"});},
	actionText: "GO!",
	jsx: (props)=>{
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
		</div>
	    );
	}
    },
    {   // 2. Level Complete
	id: "COMPLETE",
	action: (props)=>{
	    //load the next level
	    const nextLevelState = GameInitialise.loadState("LEVEL_LOAD", props.state);
	    if(nextLevelState){
		props.setState(nextLevelState);
	    }else{
		props.setState({
		    mode: "END_OF_LEVELS"
		});
	    }
	},
	actionText: "GO!",
	jsx: (props)=>{
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
		</div>
	    );
	}
    },
    {   //3. Game Completed
	id: "END_OF_LEVELS",
	action: (props)=>{},
	actionText: null,
	jsx: (props)=>{
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
    },
    {   //4. Lost a Life
	id: "LIFE_LOST",
	action: (props)=>{
	    if(props.state.player.lives >= 0){
		props.setState({mode: "PLAY"});
	    }else{
		const freshState = GameInitialise.loadState("LEVEL_LOAD");
		//don't show the welcome message (really, should be controlled in GameInitialise.loadState)
		freshState.mode = "PLAY"; 
		props.setState(freshState);
	    }
	},
	actionText: "Continue",
	jsx: (props)=>{
	    if(props.state.player.lives >= 0){
		return (
		    <div>
		      <h2>
			An Alien got you!
		      </h2>
		      <div>
			You lose a life. You have {props.state.player.lives} lives remaining.
		      </div>
		    </div>
		);
	    }
	    else{
		return (
		    <div>
		      <h1>
			Game Over!
		      </h1>
		      <div>
			You lost all of your lives.
		      </div>
		      <div>
			Play again?
		      </div>
		    </div>
		);
	    }
	}
    },
    {
	id: "ENUM",
	action: (props)=>{},
	actionText: "ACTION",
	jsx: (props)=>{
	    return (
		<div>
		  (wrap)
		</div>
	    );
	}
    },
    {
	id: "ENUM",
	action: (props)=>{},
	actionText: "ACTION",
	jsx: (props)=>{
	    return (
		<div>
		  (wrap)
		</div>
	    );
	}
    }
];

export default Modal_Messages;
