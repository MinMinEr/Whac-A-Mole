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
    //难度等级分为两级，与出现概率和出现时间有关
    this.setClockForShow();
	}
	getIndex(){
		let index = document.getElementsByClassName("holeBox").length;
		return index
	}
	getShowRate(difficultStep){
		if(difficultStep===1){
			return 0.07
		}else{
			return 0.1
		}
	}
	getShowTime(difficultStep){
		if(difficultStep===1){
			return 5
		}else{
			return 2.5
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
		document.getElementsByClassName("imgMouse")[this.index].classList.add("toShow");
		$(".toShow").fadeIn("slow");
		document.getElementsByClassName("imgMouse")[this.index].classList.remove("toShow");
		this.status = 'show';
		window.clearInterval(this.clock);
		let _this =this;
		this.timeOutClock = setTimeout(function(){
			_this.timeOut();
		},_this.showTime*1000);
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
			this.init();
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


var mousePic = "./img/mouse/B.png";
let score = 0;
let heartNum = 3;
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
window.onload = function(){
	var musicHit = document.getElementById("musicHit"); 
	let elementTime = document.getElementById("time");
	let remaindTime = 60;
	let countDownClock=self.setInterval ( function () {
		remaindTime--;
		elementTime.innerHTML = remaindTime;
	},1000);
	drawHeart(3);
	a = new Hole(1);
	b = new Hole(1);
	c = new Hole(1);
	d = new Hole(1);
	e = new Hole(1);
	f = new Hole(1);
	g = new Hole(1);
	h = new Hole(1);
	i = new Hole(1);
	j = new Hole(1);
}
