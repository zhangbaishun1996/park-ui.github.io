/* 弹窗
setTitle = '';
setContents = '请确认您的开票内容';
setButton = '["确定"]';
$(this).openWindow(setTitle,setContents,setButton); 
*/
(function(){
	//弹窗公共部分js，所有弹窗已经写好，调用时按照页面中注释方法使用即可
	var $oMasking;
	var $oWindowContainer;
	//打开弹窗方法
	$.fn.openWindow = function(setTitle,setContents,setButton,fn){
		//拼接弹窗内容，并且在调用打开弹窗方法时将内容塞进body
		var _html ='<div class="window-masking"></div>'+
		'<div class="window-container fix" id="addNew">'+
			'<h2></h2>'+
			'<div class="window-content">'+
				'<p class="window-text"></p>'+
			'</div>'+
			'<div class="window-btn">'+
				'<button type="button" class="cancel-button fl" href="javascript:;"></button>'+
				'<button type="button" class="confirm-button fr" href="javascript:;"></button>'+
				'<button type="button" class="ack-button fr" href="javascript:;"></button>'+
			'</div>'+
		'</div>'; 
		//将拼接好的html塞进body里面
		$('body').append(_html);
		$oMasking = $('.window-masking');
		$oWindowContainer = $('.window-container');
		//点击取消按钮关闭弹窗
		$('.cancel-button,.window-masking,.ack-button').on('click',function(){
			closeWindow();
		});
		$('.confirm-button').on('click',function(){
			fn();
			closeWindow();
		});
		//设置蒙版展示
		modal = new Modal();
		modal.setTitle(setTitle);
		modal.setContents(setContents);
				//设置按钮个数和链接
		modal.setButton(setButton);
		$oMasking.show();
		//设置弹窗面板展示
		$oWindowContainer.show();
	}
	//关闭弹窗方法
	function closeWindow(){
		$oMasking = $('.window-masking');
		$oWindowContainer = $('.window-container');
		//关闭弹窗的时候将蒙版和html从页面中移除掉
		$oMasking.remove();
		$oWindowContainer.remove();
	}
	//初始化
	var Modal = function () {
	    thismodal = $('#addNew');
	};
	//修改内容方法
	Modal.prototype = {
		setContents:function(obj){
			//找到需要修改内容的标签p，获取调用中设置的提示语
	    	thismodal.find('p.window-text').html(obj);   
		},
		setTitle:function(obj){
			//找到需要修改的弹窗标题，获取调用中设置的弹窗标题
			if(obj!=""){
				thismodal.find('h2').show().html(obj); 
			}
		},
		setButton: function (obj){
		    //解析传过来的参数json
		    var json=eval(obj);
		    if(json.length==1){
		    	//一个按钮
		    	thismodal.find('button.ack-button').show().html(json[0]);
		    }
		    if(json.length==2){
		    	//两个按钮
				thismodal.find('button.cancel-button').css('borderRight','1px solid #eaeaea');
		    	thismodal.find('button.cancel-button').show().html(json[0]); 
		    	thismodal.find('button.confirm-button').show().html(json[1]);
		    }
		}
	}
})()
//地址展开方法
function addressUnfold(hcls,tcls){
	//hcls,tcls需要操作的元素
	var height =  $(hcls).height();
	if(height == 16){
		$(tcls).css('transform','rotate(0deg)')
		$(hcls).css({height:'0px',paddingBottom:'0px'});
	}else{
		$(tcls).css('transform','rotate(180deg)')
		$(hcls).css({height:'16px',paddingBottom:'9px'});
	}
}
//选项卡 切换样式 返回当前文本值
function chooseMonth(ele){
	if(ele == 'undefined' || ele == '')return
	var txt;
	$(ele).click(function(){
		$(ele).eq($(this).index()).addClass("on").siblings().removeClass('on');
	})
	$(ele).each(function(){
		if($(this).hasClass('on')){
			txt = ($(this).text());	
		}
	});
	return txt;
}
//点击历史车牌赋值
function historyCarPlate(eleTxt){
	var thisA = $('#plateipDID ul li a');
	for(var i=0;i<eleTxt.length;i++){
		if(i==6){
			thisA[i+1].innerHTML = "<i>+</i><br>新能源";
			$("#plateipDID #neweDID").addClass("newe");
		}
		if(i == 7){
			$("#plateipDID #neweDID").removeClass("newe");
		}
		thisA[i].innerText = eleTxt[i]
	}
}
//点击历史车牌删除
function delHistory(curEle){
	$(curEle).html('');
}