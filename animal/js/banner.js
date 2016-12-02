$(function(){
	var banner = {
		banner: $('.banner'),
		imgWrapper: $('.img-wrapper'),
		imgItem: $('.img-item'),
		imgs: $('.img'),
		circles: null,
		index: 0,
		now: null,
		init: function(){
			this.autoPlay();
			this.creat();
			this.click();
			this.enter();
			this.leave();
			
		},
		//小圆圈初始化
		creat: function(){
			 for(var i=1;i<=this.imgs.length;i++){
	        	$('.circle-content').append($('<div class="circle-item">'+ i +'</div>'));
	        }
			$('.circle-content :first-child').addClass('active');
			this.circles = $('.circle-content').find('.circle-item');
		},
		//小圆圈点击
		click: function(){
		 	var _this = this;
			 this.circles.click(function(){
 				_this.index = _this.circles.index( $(this) );
 				_this.imgSwitch();
 		 });
		},
		autoPlay: function(){
			var _this = this;
			timer = setInterval(function(){
			_this.index++;
            _this.imgSwitch();
		},1400);
		},
		imgSwitch: function(){
			if(this.index< 0){
				this.index=this.imgs.length-1;
			}
			if(this.index >= this.imgs.length){
				this.index = 0;
			}
			
			this.imgWrapper.eq(this.now).fadeOut();
			this.imgWrapper.eq(this.index).fadeIn();
			this.imgs.eq(this.now).fadeOut();
			this.imgs.eq(this.index).fadeIn();
			this.circles.eq(this.now).removeClass('active');
			this.circles.eq(this.index).addClass('active');
			this.now = this.index;
		},
		enter: function(){
			$('.banner').mouseenter(function(){
				clearInterval(timer);
			});
		},
		leave: function(){
			var _this = this;
			$('.banner').mouseleave (function(){
				_this.autoPlay();
			});
		}
	};
	banner.init();
});
		   
