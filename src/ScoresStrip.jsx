import React from 'react';


function ScoresStrip(props) {


    const stats = [
	["Level:", props.state.level],
	["Aliens:", props.state.aliens.length],
	["Lives:", props.state.player.lives],
	["Score:", props.state.player.score],
    ];
    
    return (
	<div className="ScoresStrip" style={{width: props.width + 16}}>
	  {stats.map( (KVP, i)=>{
	      return (
		  <div key={i}>
		    {
			KVP.map( (v, j) => {
			    return (
				<div key={j}>{v}</div>
			    );
			})
		    }
		  </div>
	      );
	  })}
	</div>
    );

}

export default ScoresStrip;
