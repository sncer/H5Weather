var c = document.getElementById("rain_page4");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var max = 30;	//雨滴个数
var drops = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function O() {}

O.prototype = {
	init: function() {
		this.x = random(0, w);		//雨滴的位置x
		this.y = 0;					//雨滴的位置y
		this.color = 'rgb(255, 255, 255)';	//雨滴颜色 长方形的填充色
		this.w = 2;					//椭圆形涟漪宽
		this.h = 1;					//椭圆涟漪高
		this.vy = random(4, 5);		//雨滴下落速度
		this.vw = 3;				//涟漪宽度增长速度
		this.vh = 1;				//涟漪高度增长速度
		this.size = 2;				//雨滴宽度
		this.hit = random(h * .8, h * .9);	//雨滴下落的最大值
		this.a = 1;				//涟漪透明度
		this.va = .96;			//涟漪消失的渐变速度
	},
	draw: function() {
		if (this.y > this.hit) {
			ctx.beginPath();
			ctx.moveTo(this.x, this.y - this.h / 2);

			ctx.bezierCurveTo(
				this.x + this.w / 2, this.y - this.h / 2,
				this.x + this.w / 2, this.y + this.h / 2,
				this.x, this.y + this.h / 2);

			ctx.bezierCurveTo(
				this.x - this.w / 2, this.y + this.h / 2,
				this.x - this.w / 2, this.y - this.h / 2,
				this.x, this.y - this.h / 2);

			ctx.strokeStyle = 'rgba(255, 255, 255, '+this.a+')';
			ctx.stroke();
			ctx.closePath();
			
		} else {
			ctx.fillStyle = 'rgba(255,255,255,0.5)';
			ctx.fillRect(this.x, this.y, this.size, this.size * 10);		//绘制长方形，通过多次叠加长方形，形成雨滴下落效果
		}
		this.update();
	},
	update: function() {
		if(this.y < this.hit){
			this.y += this.vy;
		} else {
			if(this.a > .03){
				this.w += this.vw;
				this.h += this.vh;
				if(this.w > 100){
					this.a *= this.va;
					this.vw *= .98;
					this.vh *= .98;
				}
			} else {
				this.init();
			}
		}
		
	}
}

function resize(){
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
}

function setup(){
	for(var i = 0; i < max; i++){
		(function(j){
			setTimeout(function(){
				var o = new O();
				o.init();
				drops.push(o);
			}, j * 200)
		}(i));
	}
}


function anim() {
	ctx.fillStyle = "rgba(100,100,100,0.1)";//每一帧都填充背景色
	ctx.globalAlpha = 0.5;
	ctx.clearRect(0,0,w,h);
	
	for(var i in drops){
		drops[i].draw();
	}
	
	requestAnimationFrame(anim);
}


window.addEventListener("resize", resize);

setup();
anim();