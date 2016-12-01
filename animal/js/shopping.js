/*
 	详情页面js

 	1、包装的切换（颜色的切换）
 	2、杂类的切换（颜色的切换）
 	3、增加数量
 	4、减少数量
 	5、直接修改input
 	6、加入购物车
*/
$(function(){
	var shopping = {
		init: function(){
			this.main = $('.goods-detail');
			this.packCon = this.main.find('.packCon');
			this.typeCon = this.main.find('.typeCon');
			this.stock = this.main.find('.stock-num');
			this.addCart = this.main.find('.addCart-buycart');
			//增加数量按钮
			this.addCartNum = this.main.find('.addCart-buynum');
			//减少数量按钮
			this.limNum = this.main.find('.lim-buynum');
			//数量
			this.inputCon = this.main.find('.inputCon');
			
			this.data = {};
			this.initData();
		},
		initData: function(){
			var gid = this.main.attr('data-gid');
			var that = this;
			$.getJSON('js/data.json',function(result){
				that.data = result[gid];
				//填充包装
				that.createPake();
				//填充杂类
				that.createType();
				//点击包装
				that.clickPake();
				//点击杂类
				that.clickType();
				//点击增加按钮
				that.increase();
				//点击减少按钮
				that.decrease();
				//直接输入
				that.input();
				//添加到购物车
				that.addC();
			});
		},
		//填充包装
		createPake: function(){
			var pack = this.data.pack;
			var packStr = '';
			for(var key in pack){
				packStr += '<a href="#" class="norms-a"  data-pack="'+ key +'">'+ pack[key]
						+	'</a>'
			}
			this.packCon.html(packStr);
			var span = $('<span class="goods-selected"></span>');
			$('.packCon:first').children().eq(0).append(span);
		},
		
		//填充杂类
		createType: function(){
			var type = this.data.type;
			var typeStr = '';
			for(var key in type){
				typeStr += '<a href="#" class="norms-a" data-type="'+ key +'">'+ type[key]
						+	'</a>'
			}
			this.typeCon.html(typeStr);
			var span = $('<span class="goods-selected"></span>');
			$('.typeCon:first').children().eq(0).append(span);
		},
		//点击包装
		clickPake: function(){
			this.packCon.on('click','a',function(){
				var span = $('<span class="goods-selected"></span>');
				$(this).append(span).siblings().children().remove();
			});
		},
		//点击杂类
		clickType: function(){
			this.typeCon.on('click','a',function(){
				var span = $('<span class="goods-selected"></span>');
				$(this).append(span).siblings().children().remove();
			});
		},
		//数量增加点击
		increase: function(){
			var that = this;
			this.addCartNum.click(function(){
				var amount = parseInt(that.inputCon.val());
				var stock = that.stock.html();
				//是否超出库存
				if(amount>=stock){
					return;
				}
				amount++;
				that.inputCon.val(amount);
			});
		},
		//数量减少点击
		decrease: function(){
			var that = this;
			this.limNum.click(function(){
				var amount = parseInt(that.inputCon.val());
				if(amount<=1){
					return;
				}
				amount--;
				that.inputCon.val(amount);
			});
		},
		//直接输入
		input: function(){
			var that = this;
			this.inputCon.on('input',function(){
				var amount = parseInt(that.inputCon.val());
				var stock = that.stock.html();
				if(isNaN(amount) || amount==0 ){
				    that.inputCon.val('');
					return;
				}
				if(amount>=stock){
					that.inputCon.val(stock);
					return;
				}
				that.inputCon.val(amount);
			});
			this.inputCon.blur(function(){
				var amount = that.inputCon.val();
				//如果是空，不做处理
				if(amount == ''){
					that.inputCon.val(1);
				}
			});
		},
		//添加到购物车
		addC: function(){
			var that = this;
			this.main.find('.add-buycart').click(function(){
				//获取所选的杂类和包装
				var packId = that.packCon.find('.goods-selected').parent().data('pack');
				var typeId = that.typeCon.find('.goods-selected').parent().data('type');
				var gid = that.main.data('gid');
				
				var amount = parseInt( that.inputCon.val() );
				var cart = $.cookie('ec_cart') || '{}';
				var cart = JSON.parse(cart);
				if(!cart[packId]){
					cart[packId] = {
						"goods-id": gid,
						"type-id": packId,
						"amount": amount
					};
				}else{
					cart[packId].amount += amount;
				}
				//重新写到cookie中
				$.cookie('ec_cart',JSON.stringify(cart),{expires:365,path:'/'})
			    alert('添加成功');
			});
		}
	};
	shopping.init();
});
