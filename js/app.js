class Hole{
	constructor(difficultStep) {
		this.init();
		this.difficultStep = difficultStep;
    this.showRate = this.getShowRate(difficultStep);
    this.showTime = this.getShowTime(difficultStep);
    this.index = this.getIndex();
    this.drawHole();
  }
	init(difficultStep){
		//hide表示躲在洞里，show表示出现而没有打到，hitted表示击中
    this.stutas = 'hide';
    this.setClockForShow();
	}
	getIndex(){
		let index = document.getElementsByClassName("holeBox").length;
		return index
	}
	getShowRate(difficultStep){
		if(difficultStep===1){
			return 0.1
		}else{
			return 0.2
		}
	}
	getShowTime(difficultStep){
		if(difficultStep===1){
			return 4
		}else{
			return 3
		}
	}
	drawHole(){
		let holeBox = document.createElement("div");
		let hole = document.createElement("img");
		let mouse = document.createElement("img");
		let hitted = document.createElement("img");
		//下面三行代码原本打算用来使图片不可拖动
//		mouse.draggable="false";
//		hole.draggable="false";
//		hitted.draggable="false";
		hole.src = "./img/hole.png";
		mouse.src = mousePic;
		let _this = this;
		mouse.onclick = function(){
			_this.hitted();
		}
		hitted.src = "./img/hitted.png";
		hole.classList.add("imgHole");
		mouse.classList.add("imgMouse");
		hitted.classList.add("imgHitted");
		mouse.style.display="none";
		hitted.style.display="none";
		holeBox.appendChild(hole);
		holeBox.appendChild(mouse);
		holeBox.appendChild(hitted);
		holeBox.classList.add("holeBox");
		$("#holeContent").append(
			holeBox
		);
	}
	showMouse(){
		window.clearInterval(this.clock);
		document.getElementsByClassName("imgMouse")[this.index].classList.add("toShow");
		$(".toShow").fadeIn("slow");
		document.getElementsByClassName("imgMouse")[this.index].classList.remove("toShow");
		this.status = 'show';
		let _this =this;
		this.timeOutClock = setTimeout(function(){
			_this.timeOut();
		},_this.showTime*1000);
	}
	clearClockForShow(){
		window.clearInterval(this.clock);
	}
	setClockForShow(){
		let _this = this;
		this.clock=self.setInterval(function(){
			let temp = Math.random();
			if(temp<_this.showRate){
				_this.showMouse();
			}
		},500);
	}
	timeOut(){
		if(this.status==='show'){
      clearTimeout(this.timeOutClock);
			document.getElementsByClassName("imgMouse")[this.index].classList.add("toHide");
			$(".toHide").fadeOut("slow");
			document.getElementsByClassName("imgMouse")[this.index].classList.remove("toHide");
			heartNum--;
			window.drawHeart(heartNum);
			if(heartNum<0){
				mapEnd('failure');
			}
			this.init();
			this.status === 'fail';
		}
	}
	hitted(){
		if(this.status==='show'){
      clearTimeout(this.timeOutClock);
			musicHit.play();
			document.getElementsByClassName("imgHitted")[this.index].style.display='block';
			document.getElementsByClassName("imgMouse")[this.index].classList.add("toHide");
			document.getElementsByClassName("imgHitted")[this.index].classList.add("toHide");
			document.getElementById("score").innerHTML++; 
			$(".toHide").fadeOut("slow");
			document.getElementsByClassName("imgMouse")[this.index].classList.remove("toHide");
			document.getElementsByClassName("imgHitted")[this.index].classList.remove("toHide");
			this.init();
		}
		this.status = 'hitted';
	}
}
let mousePic = "./img/mouse/A.png";
let score = 0;
let heartNum = 3;
let holeNum = 4;
let difficultStep = 1;
let holeArray = [];
let countDownClock;
let mapNum = 1 ;
let remaindTime;
function drawHeart(heartNumber = 3){
		let heartContent = document.getElementById("heartContent");
		heartContent.innerHTML = "";
		if(heartNumber>=0){
			for(let i = 0 ; i < heartNumber ; i++){
				let heart = document.createElement("img");
				heart.src = "./img/heart_full.png";
				heartContent.appendChild(heart);
			}
			for(let i = 0 ; i < 3-heartNumber ; i++){
				let heart = document.createElement("img");
				heart.src = "./img/heart_blank.png";
				heartContent.appendChild(heart);
			}
		}
		else{
			for(let i = 0 ; i < 3 ; i++){
				let heart = document.createElement("img");
				heart.src = "./img/heart_blank.png";
				heartContent.appendChild(heart);
			}
		}
}
function selectMap(num){
	let mapSettings = [
		{"holeNum":4,"difficultStep":1},
		{"holeNum":5,"difficultStep":1},
		{"holeNum":6,"difficultStep":1},
		{"holeNum":7,"difficultStep":1},
		{"holeNum":6,"difficultStep":2},
		{"holeNum":7,"difficultStep":2},
		{"holeNum":8,"difficultStep":2},
		{"holeNum":9,"difficultStep":2}
	];
	holeNum = mapSettings[num-1].holeNum;
	difficultStep = mapSettings[num-1].difficultStep;
	mapNum = num;
}
function selectMousePic(name){
	mousePic = "./img/mouse/"+name+".png";
  console.log(mousePic);	
}
function mapEnd(end){
//	console.log("ending");
	for (let i = 0 ; i < holeArray.length ; i++) {
		holeArray[i].clearClockForShow();
	}
	holeArray.splice(0,holeArray.length);
	document.getElementById("holeContent").innerHTML = "";
	$('#myModalEnd').modal('show');
	if(end==='successful'){
		document.getElementById("endPromptTop").innerHTML = "胜利";
		document.getElementById("endPrompt").innerHTML = "下一关";
	}
	if(end==='failure'){
		document.getElementById("endPromptTop").innerHTML = "失败";
		document.getElementById("endPrompt").innerHTML = "重新开始";
		clearInterval(countDownClock);
	}
}
function toMap(){
	$('#myModalEnd').modal('hide');
	$('#myModalMap').modal('show');
}
function begin(again = false,remainTimeTemp = 10,heartNumTemp = 3){
	heartNum = heartNumTemp;
	let elementTime = document.getElementById("time");
	remaindTime = remainTimeTemp;
	countDownClock = self.setInterval ( function () {
		remaindTime--;
		elementTime.innerHTML = remaindTime;
		if(remaindTime === 0){
			clearInterval(countDownClock);
			mapEnd('successful');
		}
	},1000);
	drawHeart(heartNum);
	if(!again){
		$('#myModalMap').modal('hide');
	}else{
		$('#myModalEnd').modal('hide');
	}

	createHole();
}
function createHole(){
	for(let i = 0 ; i < holeNum ; i++){
		holeArray[i] = new Hole(difficultStep);
//		holeArray.push(temp);
	}
}
function againOrNext(){
	if(document.getElementById("endPromptTop").innerHTML === "失败"){
		again(true);
		console.log('失败btnclick');
	}else if(document.getElementById("endPromptTop").innerHTML === "胜利"){
		console.log('胜利btnclick');
		next();
	}	
}
function again(isFailure){
	selectMap(mapNum);
	begin(isFailure);
}
function next(){
	mapNum++;
	again(true);
}
function pause(){
	if(document.getElementById('pausePrompt').innerHTML === "暂停"){
		document.getElementById('pausePrompt').innerHTML = "继续";
		begin(false,remaindTime,heartNum);//有bug
	}else{
		document.getElementById('pausePrompt').innerHTML = "暂停";
		for (let i = 0 ; i < holeArray.length ; i++) {
			holeArray[i].clearClockForShow();
		}
		holeArray.splice(0,holeArray.length);
		document.getElementById("holeContent").innerHTML = "";
		clearInterval(countDownClock);

		
		
		
	}
}
window.onload = function(){
	$('#myModalMap').modal('show');
	var musicHit = document.getElementById("musicHit"); 
	selectMap();
//	let elementTime = document.getElementById("time");
//	let remaindTime = 60;
//	let countDownClock=self.setInterval ( function () {
//		remaindTime--;
//		elementTime.innerHTML = remaindTime;
//	},1000);
//	drawHeart(3);
//	a = new Hole(1);
//	b = new Hole(1);
//	c = new Hole(1);
//	d = new Hole(1);
//	e = new Hole(1);
//	f = new Hole(1);
//	g = new Hole(1);
//	h = new Hole(1);
//	i = new Hole(1);
//	j = new Hole(1);
}
