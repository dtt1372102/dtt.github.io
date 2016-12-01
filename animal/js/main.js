$(function(){
	
	var main = {
		
		init: function(){
			this.close();
			this.enter();
			this.leave();
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
		}
		
	};
	main.init();
	$('.footer-wrapper').load('footer.html');
});
