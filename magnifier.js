(function($){
	$.fn.fangda=function(options){
		var defaults={
			floatSize:'0.3',
			expand:'3',
		}
		var op=$.extend(defaults,options)
		return this.each(function(i){
			//获取容器大小
			var height=$(this).height();
			var width=$(this).width();
			//创建float和cover
			var float=$('<div></div>')
			var cover=$('<div></div>')
			

			//设置float和cover的css属性
			float.height(height*op.floatSize);
			float.width(width*op.floatSize);
			cover.height(height);
			cover.width(width);
			$(this).css('position','relative')

			float.css({
				backgroundColor:'blue',
				opacity:'0.5',
				position:'absolute',
				'z-index':'7',
			})
			cover.css({
				position:'absolute',
				top:'0',
				left:'0',
				'z-index':'10',
			})
			//创建bigdiv并设置样式
			var bigdiv=$(this).clone(false);
			var bigTop=$(this).position().top;
			var bigLeft=$(this).position().left+width+100;
			bigdiv.children().each(function(){
				$(this).css({
					position:'absolute',
					width:width*(op.expand),
					height:height*(op.expand),
				})
			})
			bigdiv.css({
				position: 'absolute',
				'z-index': 20,
				overflow:'hidden',
			})
			//将cover插入到容器，把大图div放进文档
			$(this).hover(function(){
				$(this).append(cover);
				bigdiv.css({top:bigTop,left:bigLeft});
				bigdiv.appendTo($('body'))

			},function(){
				$(this).remove(cover);
				bigdiv.remove();
			})
			//cover的mousemove事件
			cover.mousemove(function(ev){
				//插入float层
				$(this).parent().append(float);
				var floatLeft=ev.clientX-$(this).parent().position().left-width*op.floatSize*0.5;
				var floatTop=ev.clientY-$(this).parent().position().top-height*op.floatSize*0.5;
				if (floatLeft<0) {
					floatLeft=0;
				}
				if (floatTop<0) {
					floatTop=0;
				}
				if (floatLeft>width-width*op.floatSize) {
					floatLeft=width-width*op.floatSize;
				}
				if (floatTop>height-height*op.floatSize) {
					floatTop=height-height*op.floatSize;
				}
				float.css({
					left:floatLeft,
					top:floatTop,
				})
				var bigchildren_Left=-floatLeft/(width-width*op.floatSize)*(width*(op.expand)-width);
				var bigchildren_Top=-floatTop/(height-height*op.floatSize)*(height*(op.expand)-height);
				bigdiv.children().each(function(){
					$(this).css({
						left:bigchildren_Left,
						top:bigchildren_Top,
					})
				})
			})
			//cover的mouseout事件
			cover.mouseout(function(){
				float.remove();
				bigdiv.remove();
			})
			
		})
	}
})(jQuery)