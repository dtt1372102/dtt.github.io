$(function(){
	
	var main = {
		lis: $('.time-menu li'),
		mincate: $('.mincate'),
		init: function(){
			this.close();
			this.enter();
			this.leave();
			this.mouseenter();
			this.mouseleave();
			this.move();
			this.surprise();
			this.surpriseImg();
			this.surImg();
		},
		//关闭刚打开出现的模态框
		close: function(){			
			$('.close').click(function(){
				$('.big').hide();
			});
		},
		//main右边的滑动
		enter: function(){
			$('.imgBox').find('img').mouseenter(function(){
				$(this).stop(true).animate({
					right:15
				},500);
			});
		},
		leave: function(){
			$('.imgBox').find('img').mouseleave(function(){
				$(this).stop(true).animate({
					right:0
				},500);
			});
		},
		//tab切换
		mouseenter: function(){
			var that = this;
			$('.goods-con li').mouseenter(function(){
				var index = $('.goods-con li').index($(this));
			     $(this).children().show().css({
			     	top: -42 * index
			     });
			});
		},
		mouseleave: function(){
			var that = this;
			$('.goods-con li').mouseleave(function(){
			     $(this).children().hide();
			});
		},
		//天天惊喜中的tab切换
		move: function(){
			var that = this;
			this.lis.mouseenter(function(){
				$(this).addClass('hover').siblings().removeClass('hover');
				that.surprise();
				that.surpriseImg();
			    that.surImg();
			});
		},
		surprise: function(){
			var content = '';
				for(var i=1;i<5;i++){
					var key = parseInt(Math.random()*11);
					content += '<div class="menu-item">'
		 					+ '<div class="surprise-img">'
		 					+	'<img src="img/h'+ key +'.jpg" />'
		 					+ '</div>'
		 					+ '<div class="spec">'
                            +    '<span class="dib">营养均衡</span>'
                            +    '<span class="dib">增强免疫力</span>'
                            +'</div>'
                            +'<div class="surprise-name">顽皮Wanpy 牛肉+蔬菜配方 狗罐头 375g 牛肉蔬菜</div>'
                            +'<div class="surprise-prices">'
                            +	'¥'
                            +	'<span class="now-prices">17.50</span>'
                            +	'<span class="through">25.00</span>'
                            + '</div>'
                            + '<div class="jdt">'
                            +    '<span class="dib"></span>'
                            + '</div>'
                            + '<div class="status">'
                            +	'<a href="#" class="rush-buy">立即抢购</a>'
                            +'</div>'
		 				+'</div>';
				}
				$('.menu-wrapper').html(content);
		},
		surpriseImg: function(){
			$('.surprise-img').find('img').mouseenter(function(){
				$(this).stop(true).animate({
					top: -12
				},500);
			});
		},
		surImg: function(){
			$('.surprise-img').find('img').mouseleave(function(){
				$(this).stop(true).animate({
					top: 0
				},500);
			});
		}
	};
	main.init();
	$('.footer-wrapper').load('footer.html');
});
