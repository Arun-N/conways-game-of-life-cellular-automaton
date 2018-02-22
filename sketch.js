let grid;
let cols;	//x
let rows;	//y
let status;
let neighbors;
let resolution = 20;
var frame_rate = 15;
//let slider;
//let DOM_para_speed;
let DOM_para_generations;
let generation_count = 0;
var gui;

function createGrid() {
	cols = width/resolution;
	rows = height/resolution;
	let arr = new Array(cols);
	for(let i=0; i<cols; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

function setup() {
	frameRate(30);
	createCanvas(800, 800);
	grid = createGrid();
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			grid[i][j] = floor(random(2));
		}
	}
	DOM_para_generations = document.getElementById("gencount");

	sliderRange(1, 30, 1);
	gui = createGui('settings', 900, 100);
	gui.addGlobals('frame_rate');
}

function getNeighborsCount(x, y) {
	let count=0;

	for(let i=-1; i<=1; i++){
		for(let j=-1; j<=1; j++){
			count+=grid[(x+i+cols)%cols][(y+j+rows)%rows];
		}
	}
	count-=grid[x][y];
	return count;
}

function draw() {
	//frame_rate = slider.value();
	frameRate(frame_rate);
	DOM_para_generations.innerHTML = "Generation Count = " + generation_count + " generations";
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			let x = i*resolution;
			let y = j*resolution;
			if(grid[i][j] == 1){
				fill('#000000');
			}
			else{
				fill('#ffffff');
			}
			rect(x, y, resolution, resolution);
		}
	}

	let new_grid = createGrid();
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			status = grid[i][j];
			neighbors = getNeighborsCount(i, j);
			if(status == 0 && neighbors == 3){
				new_grid[i][j] = 1;
			}
			else if(status == 1 && (neighbors>3 || neighbors<2)){
				new_grid[i][j] = 0;
			}
			else{
				new_grid[i][j] = status;
			}
		}
	}
	grid = new_grid;
	generation_count += 1;
}