//开始下雨
function startRain(page){
	//先清空之前页面的雨滴
	$(".raindrops").remove();
	//获取雨层div
	var rainLayer = $("#rain_"+page);
	//最大雨滴数量
	var max = 30;
	//往雨层div里面添加雨滴img，利用CSS3做雨滴掉落动画
	for(var i = 0; i < max; i++){
		(function(j){
			setTimeout(function(){
				var raindrop = '<img class="raindrops" style="left: '+random(0,100)+'%;" src="img/page4/small-raindrop.png"/>';
				rainLayer.append(raindrop);
			}, j * 200)
		}(i));
	}
}
//计算随机数
function random(min, max) {
    return Math.random() * (max - min) + min;
}

