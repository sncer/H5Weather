var rainTimer = null;
var rippleTimer = null;
var snowTimer = null;
var particles = [];		//雪花颗粒

//开始下雨
function startRain(index){

	
	//获取雨层div
	var rainLayer = $("#rain_page"+index);
	//最大雨滴数量
	var max = 60;
	//往雨层div里面添加雨滴img，利用CSS3做雨滴掉落动画
	var flag = 0;
	rainTimer = setInterval(function(){
		if (flag < max) {
			var raindrop = '<img class="raindrops" style="left: '+random(0,100)+'%; height: '+random(5,15)+'%;" src="img/page4/small-raindrop.png"/>';
			rainLayer.append(raindrop);
			flag++;
		} else{
			clearInterval(rainTimer) 
		}
		
	},100)
	
}

//清空雨滴
function clearRain(index){
	clearInterval(rainTimer);
	$("#rain_page"+index).empty();
}

//产生涟漪动画（第7页）
function startRipples(){
	//获取涟漪层div
	var ripplesLayer = $("#ripples_layer");
	//最大涟漪数量
	var max = 10;
	//往雨层div里面添加涟漪img，利用CSS3做涟漪放大动画
	var flag = 0;
	rippleTimer = setInterval(function(){
		if (flag < max) {
			var ripple = '<img class="ripple" style="left: '+random(0,100)+'%; top: '+random(0,100)+'%;" src="img/page7/ripple.png"/>';
			ripplesLayer.append(ripple);
			flag++;
		} else{
			clearInterval(rippleTimer) 
		}
		
	},1000)
	
	
}

//清空涟漪
function clearRipples(){
	clearInterval(rippleTimer);
	$("#ripples_layer").empty();
}

//计算随机数
function random(min, max) {
    return Math.random() * (max - min) + min;
}

//开始下雪动画
function startSnow(index){
	//canvas init
	var canvas = document.getElementById("snow_page"+index);
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = canvas.offsetWidth;
	var H = canvas.offsetHeight;
	canvas.width = W;
	canvas.height = H;
	
	
	//snowflake particles
	var mp = 50; //max particles
	particles = [];	//清空之前的雪花粒子
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*4+1, //radius
			d: Math.random()*mp //density
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
	
	//animation loop
	snowTimer = setInterval(draw, 33);
}

//清空下雪
function clearSnow(index){
	clearInterval(snowTimer);
	//canvas init
	var canvas = document.getElementById("snow_page"+index);
	var ctx = canvas.getContext("2d");
	//canvas dimensions
	var W = canvas.offsetWidth;
	var H = canvas.offsetHeight;
	canvas.width = W;
	canvas.height = H;
	
	ctx.clearRect(0, 0, W, H);
}
