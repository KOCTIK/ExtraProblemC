
var field = []; //an array of the nodes
var counter; //move counter

//constructor of nodes
function cell(x_pos, y_pos, color, col, row) {
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.color = color;
    this.step = 1; //step counter
	this.per = []; //parent coordinates
	this.color_1 = "white"; //node status label
	this.col = col; //node's x-position
	this.row = row; //node's y-position
	
}

//creates the nodes 
function drawFild(){
	var start_X = 40, start_Y = 40;
	var color;
	var check = true;
	
	for(let i = 0; i < 8 ; i++){
		field[i] = [];
		for(let j = 7; j >= 0; j--){			
			if(check == true){
				color = "#FAF0E6";
			}else{
				color = "#CADABA";
			}			
			field [i][j] = new cell (start_X, start_Y, color, i, j);			
			if(check == true){
				check = false;
			}else{
				check = true;
			}
			start_Y += 50;			
		}			
		if(check == true){
			check = false;
		}else{
			check = true;
		}		
		start_Y = 40;
	    start_X += 50;
	}	
}	

//calculate the shortest way
function steps(obj){
	var i = obj.x_s; //starting x-position
	var j = obj.y_s; //starting y-position
	var b1 = obj.x_f;//end x-position
	var e1 = obj.y_f;//end y-position
	var b, e;
	
	var ktmov1 = [-2, -1, 1, 2, 2, 1, -1, -2]; //possible moves along the x-axis
	var ktmov2 = [1, 2, 2, 1, -1, -2, -2, -1]; //possible moves along the y-axis
	var arr = []; //queue
	
	arr.push({col: i, row: j});	//add to the queue start node
	field[i][j].color_1 = "greay"; //change the open node label
	
outer:  		
		for(let a = 0; a < arr.length; a++){
		//pass the current node position
		i = arr[a].col;
		j = arr[a].row;

		//check the possible moves
		for (let a = 0 ; a <= 7 ; a++ ){            			
			b = i + ktmov1[a];
			e = j + ktmov2[a];
			//check the field borders
			if ( b < 0 || b > 7 || e < 0 || e > 7 ){
				continue; 
			}
			//check the open nodes
			if (field[b][e].color_1 == "greay"){
				continue;
			}
			
			field[b][e].per.push(i, j);	//add the coordinates of the parent node		
			field[b][e].step += field[i][j].step; //increment step counter
			field[b][e].color_1 = "greay"; //change the open node label
			
			arr.push({col: b, row: e});	//add to the queue current node				

			//check the position of the current node to the end coordinates
			if (b == b1 && e == e1){
				counter += field[b][e].step - 1; //increase the total step counter			
				break outer; //exit the loop
			}
		}		
    }
	return pos = [b,e]; //returns the node coordinates for further drawing steps on a blackboard
}


