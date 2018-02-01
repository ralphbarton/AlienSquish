
//  INITIALISATION STUFF  //
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img_A = document.getElementById('blk-A');
var img_B = document.getElementById('blk-B');
var img_C = document.getElementById('blk-C');
var img_D = document.getElementById('blk-D');

var cPX = 40;// this is the cell size (cells are square) in pixels	
var max_X = 20;
var max_Y = 15;
var plr_score =0;

var debugHTML = document.getElementById("debug");
var statsHTML = document.getElementById("stats");

var playerX = parseInt(max_X/2);
var playerY = parseInt(max_Y/2);

var player_speed = 10;// how many frames per move of the player
var player_speed_countdown=0;

alert("checkpoint 1");

//create an array of cells. Initialise randomly with stones and balls
var cells = [];
var alien_indices = [];
for(x=0; x<max_X; x++) {
    cells[x] = [];
    alien_indices[x] = [];
    for(y=0; y<max_Y; y++) {

	var Q = 100.0 * Math.random();
	var ctype;

	if (Q<3.5)	{ctype=2;}
	else if (Q<35.0){ctype=3;}
	else		{ctype=0;}
	
	cells[x][y] = ctype;
	alien_indices[x][y] = 999;
    }
}

//place the player on the array center screen
cells[playerX][playerY] = 1;

//create random aliens
var N_aliens_start = 7;
var aliens = [];
var AlienSpeedFactor = 0.1;
var AlienHomingFactor = 0.5;
for(n=0; n<N_aliens_start; n++) {
    var mons_X = Math.floor(max_X*Math.random());
    var mons_Y = Math.floor(max_Y*Math.random());
    var p_move = Math.random()*0.1;//generate a distribution of periodicity of movement
    if(cells[mons_X][mons_Y] == 0)
    {
	//add the alien into the array
	aliens.push({
	    x:	mons_X,
	    y:	mons_Y,
	    p_move:	AlienSpeedFactor*Math.random(),//in a given execution of the game loop, what is the probability that this alien shall move
	    p_homing:	AlienHomingFactor*Math.random()//given that this alien is moving, what is the probability it should attempt to move directly towards the player (i.e. how evil is it)
	});
	cells[mons_X][mons_Y] = 4;

	//add the index of the alient in he array
    }
    else{n--;}//do not count up because placement failed with those random values...
}

//add detection of up/down/left/right keystrokes
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
rightPressed = false;
leftPressed = false;
upPressed = false;
downPressed = false;

function keyDownHandler(e) {
    if(e.keyCode == 39) {
	rightPressed = true;
    }
    else if(e.keyCode == 37) {
	leftPressed = true;
    }
    else if(e.keyCode == 38) {
	upPressed = true;
    }
    else if(e.keyCode == 40) {
	downPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
	rightPressed = false;
    }
    else if(e.keyCode == 37) {
	leftPressed = false;
    }
    else if(e.keyCode == 38) {
	upPressed = false;
    }
    else if(e.keyCode == 40) {
	downPressed = false;
    }
}


function drawCells() {

    for(x=0; x<max_X; x++) {
	for(y=0; y<max_Y; y++) {
	    var myimg=null;
	    if(cells[x][y] == 1){myimg = img_A;}
	    if(cells[x][y] == 2){myimg = img_B;}
	    if(cells[x][y] == 3){myimg = img_C;}
	    if(cells[x][y] == 4){myimg = img_D;}

	    if(myimg){ctx.drawImage(myimg, cPX*x, cPX*y);}

	}
    }
}

//  LOOPED STUFF  //	

var count=3;
alert("got to the main loop...");
//the function generates a frame
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCells();
    if(player_speed_countdown){player_speed_countdown--;}
    
    //the logic below must make transformaions to the visual array to implement the next 		frame

    //keystroke handling
    if((upPressed || downPressed || leftPressed || rightPressed) && (player_speed_countdown==0))
    {
	var playerX_next = playerX;
	var playerY_next = playerY;
	player_speed_countdown = player_speed;

	//player moves to this position
	if(upPressed && playerY>0){playerY_next--;}
	if(downPressed && playerY<max_Y){playerY_next++;}
	if(leftPressed && playerX>0){playerX_next--;}
	if(rightPressed && playerX<max_X){playerX_next++;}

	if(cells[playerX_next][playerY_next]==0)//simply moving into empty space
	{
	    cells[playerX_next][playerY_next]=1;
	    cells[playerX][playerY]=0;
	    playerX=playerX_next;
	    playerY=playerY_next;
	}
	

	if(cells[playerX_next][playerY_next]==3)// moving into a ball...
	{
	    //determine if a shuffle in the desired direction can happen...
	    //is there a blank at the end of a series of balls
	    eosX = playerX_next;
	    eosY = playerY_next;

	    var movement=true;
	    while(cells[eosX][eosY]==3){
		if(upPressed){eosY--;}
		if(downPressed){eosY++;}
		if(leftPressed){eosX--;}
		if(rightPressed){eosX++;}
		if(eosY<0)     {movement=false; break;}
		if(eosY>=max_Y){movement=false; break;}
		if(eosX<0)     {movement=false; break;}
		if(eosX>=max_X){movement=false; break;}
	    }

	    //this represents a series of balls moving into space
	    if(cells[eosX][eosY]==0){movement=true;}

	    //this represents a series of balls moving into an alien
	    if((movement)&&(cells[eosX][eosY]==4)){
		//determine what is beyond the alien
		var blueseaX = eosX;
		var blueseaY = eosY;
		if(upPressed){blueseaY--;}
		if(downPressed){blueseaY++;}
		if(leftPressed){blueseaX--;}
		if(rightPressed){blueseaX++;}

		//it is not whitespace. Alien is crused.
		if(cells[blueseaX][blueseaY]!=0){
		    plr_score++;
		    var THISalien = alien_indices[blueseaX][blueseaY];
		}
		
		//if it is whitespace, the alien just moves
		else{
		    cells[blueseaX][blueseaY]=4;
		}


		cells[eosX][eosY]=3;
		cells[playerX_next][playerY_next]=1;
		cells[playerX][playerY]=0;
		playerX=playerX_next;
		playerY=playerY_next;
	    }
	    
	    //This implements the movement of the ball row and player
	    if(movement){
		cells[eosX][eosY]=3;
		cells[playerX_next][playerY_next]=1;
		cells[playerX][playerY]=0;
		playerX=playerX_next;
		playerY=playerY_next;
	    }



	}
    }

    //cause all alien moves
    for(n=0; n<aliens.length; n++) {
	//unless a random number is generated within a probability bound, skip the step of moving this alien
	if(aliens[n].p_move<Math.random()){continue;}

	var Q_count=0;
	var valid=false;

	while(Q_count<200){//continue to attempt to move the alien up to a threshold
	    Q_count++;			
	    var movetype=Math.floor(Math.random()*8);
	    var ALnextX = aliens[n].x;
	    var ALnextY = aliens[n].y;

	    if(movetype==0){ALnextX--;ALnextY--;}
	    if(movetype==1){ALnextY--;}
	    if(movetype==2){ALnextX++;ALnextY--;}
	    if(movetype==3){ALnextX--;}
	    if(movetype==4){ALnextX++;}
	    if(movetype==5){ALnextX--;ALnextY++;}
	    if(movetype==6){ALnextY++;}
	    if(movetype==7){ALnextX++;ALnextY++;}
	    
	    valid=true;
	    //the 4 conditions below represent alien randomly moving beyond a wall boundary. Dont accept the random number in this case
	    if(ALnextX<0)     	{valid=false;}
	    if(ALnextX>=max_X)	{valid=false;}
	    if(ALnextY<0)     	{valid=false;}
	    if(ALnextY>=max_Y)   {valid=false;}

	    if(cells[ALnextX][ALnextY]!=0)     	{valid=false;}

	    if(cells[ALnextX][ALnextY]==1){valid=true;}//this is a player loss condition! (alien hits player).

	    if(valid){break;}

	}


	if(Q_count>190){
	    //this almost certainly means the alien has been confined!!
	}
	
	//the ALnext[X|Y] variable represent a valid move for the alien, so move it!
	if(valid){
/*	    
	    debugHTML.innerHTML+="<br>Moving::";
	    debugHTML.innerHTML+=String(n);	    
	    debugHTML.innerHTML+="alien old(";
	    debugHTML.innerHTML+=String(aliens[n].x);
	    debugHTML.innerHTML+=",";
	    debugHTML.innerHTML+=String(aliens[n].y);
	    debugHTML.innerHTML+=")<br>alien New(";
	    debugHTML.innerHTML+=String(ALnextX);
	    debugHTML.innerHTML+=",";
	    debugHTML.innerHTML+=String(ALnextY);
*/
	    cells[ALnextX][ALnextY]=4;
	    cells[aliens[n].x][aliens[n].y]=0;
	    aliens[n].x=ALnextX;
	    aliens[n].y=ALnextY;
	}
	

    }

    //this is the final bit of the game loop. Write the scores into the HTML zone (this is a little wasteful)
    statsHTML.innerHTML="[Score: ";
    statsHTML.innerHTML+=String(plr_score);	    
    statsHTML.innerHTML+="] [Remaining Aliens: ";
    statsHTML.innerHTML+=String(aliens.length);
    statsHTML.innerHTML+="] [Level: ";
    statsHTML.innerHTML+=String(aliens[n].y);
    statsHTML.innerHTML+="]";

    // requestAnimationFrame(draw);
}

setInterval(draw, 10);
//draw();

