var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.name = check(0);
	$scope.name1 = check(1);
	$scope.name2 = check(2);
	$scope.name3 = check(3);
	$scope.name4 = result[0];
	$scope.name5 = result[1];
	$scope.name6 = result[2];
	$scope.name7 = result[3];    
});

//---------------------------
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function drawBoard(){
	var start_X = 40, start_Y = 40;
	for(let i = 0; i < 8 ; i++){		
		for(let j = 0; j < 8; j++){
						
			ctx.fillStyle = field[i][j].color;
	        ctx.fillRect(field[i][j].x_pos,field[i][j].y_pos,50,50);	
		}		
	}
	
	ctx.font = "10px Arial";
	for (let i=0; i<8; i++){
		ctx.strokeText(i,start_X+25,25);
		ctx.strokeText(i,start_X+25,465);
		start_X +=50;
	}

	for (let i=7; i>=0; i--){
		ctx.strokeText(i,20,start_Y+25);
		ctx.strokeText(i,460,start_Y+25);
		start_Y +=50;
	}
}

function drawNumber(i, j){		
    ctx.font = '40pt Calibri';
	ctx.fillStyle = 'blue';
    ctx.fillText(field[i][j].step-1, field[i][j].x_pos + 10, field[i][j].y_pos + 40);	
}
	
drawFild();
drawBoard();

//---------------------------
//manipulation of input data
var data1 = [];

function add(){
	var count = 0;						
	for(let i = 0; i < data.length; i++){						
		for(let j = 0; j < data[i].length; j++){			
			if (count == 0){
				data1.push({num: i, x_s: 0,	y_s: 0,	x_f: 0,	y_f: 0});
				data1[data1.length-1].x_s = data[i][j];
				count++;
			} else if (count == 1){
				data1[data1.length-1].y_s = data[i][j];
				count++;
			}else if (count == 2){
				data1[data1.length-1].x_f = data[i][j];
				count++;
			}else if (count == 3){
				data1[data1.length-1].y_f = data[i][j];
				count = 0;			
			}	 			
	   }
	}	
}
add();

//manipulation of output data
function check(x){
	var test = [];
	for(let i = 0; i < data1.length; i++){
		if(data1[i].num == x){
		test.push(data1[i]);
		}			
	}
	return test;
}

//counts the total number of steps
function sumSteps(){
	var result = [];	
	var test;	
	for(let i = 0; i < 4; i++){		
		counter = 0;
		test = check(i);
		for(let j = 0; j < test.length; j++){
			drawFild();
			steps(test[j]);	
		}
		result.push(counter);
	}
	return result;	
}

var result = sumSteps();

//---------------------------
document.getElementById("EnterDate").onmouseover = function(event) {
  var target = event.target;  
  while (target != this) {
	if (target.parentNode.tagName == 'THEAD'){
		return;
	} 
    if (target.tagName == 'TR') {      
	   i = target.childNodes[3].innerHTML ;
	   j = target.childNodes[5].innerHTML ;
	   b = target.childNodes[7].innerHTML ;
	   e = target.childNodes[9].innerHTML ;
	  
	  ctx.fillStyle = "#FA8072";		
	  ctx.fillRect(field[i][j].x_pos,field[i][j].y_pos,50,50);
	  ctx.fillRect(field[b][e].x_pos,field[b][e].y_pos,50,50);		
    }
    target = target.parentNode;
  }
}

document.getElementById("EnterDate").onmouseout = function(event) {
  var target = event.target;  
  while (target != this) {
	if (target.parentNode.tagName == 'THEAD'){
		return;
	} 
    if (target.tagName == 'TR') {  	  
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  drawBoard();	  
    }
    target = target.parentNode;
  }
}

document.getElementById("EnterDate").onclick = function(event) {
  var target = event.target;  
  while (target != this) {
	if (target.parentNode.tagName == 'THEAD'){
		return;
	} 
    if (target.tagName == 'TR') {      
	   i = +target.childNodes[3].innerHTML ;
	   j = +target.childNodes[5].innerHTML ;
	   b = +target.childNodes[7].innerHTML ;
	   e = +target.childNodes[9].innerHTML ;
	   
	  
	  
	   drawFild();
	   ctx.clearRect(0, 0, canvas.width, canvas.height);
	   drawBoard();
	   
	   ctx.fillStyle = "#FA8072";		
	   ctx.fillRect(field[i][j].x_pos,field[i][j].y_pos,50,50);
	   ctx.fillRect(field[b][e].x_pos,field[b][e].y_pos,50,50);
	   
	   counter = 0;
	   
	   var obj = {x_s: i, y_s: j, x_f: b, y_f: e};
	   pos = steps(obj);
	   b = pos[0];
	   e = pos[1];
					
					drawNumber(b, e);
					
					while(field[b][e].step != 1){
						i = field[b][e].per[0];
						j = field[b][e].per[1];
						drawNumber(i, j);
						b = i;
						e = j;
					}
    }
    target = target.parentNode;
  }
}