/*!
 * 车牌输入键盘
 * author: qiuyd
 * date: 2018/07/11 v1.0
 */
//点击车牌号输入框
var currentPlatePos=0;
initPlateipdClick();
function initPlateipdClick(){
	$("#plateipDID ul li").unbind("click");
	$("#plateipDID ul li").click(function(){
		showPlateKeyboard($(this).index());
	});
}
function showPlateKeyboard(index){
	currentPlatePos=index;
	$("#plateipDID ul li a").removeClass("on");
	$("#plateipDID ul li a").eq(index).addClass("on");
	
	$(".platekeyd").slideDown(0);
	if(index==0){
		$("#plateProvDID").show();
		$("#plateRoutDID").hide();
	}else{
		$("#plateProvDID").hide();
		$("#plateRoutDID").show();
	}
	var sval=$("#plateipDID ul li a").eq(0).html();
	initPlateKeydClick();
	if(index==1 && sval!="使" && sval!="无"){
		$("#plateNumDID").addClass("lock");
		$("#plateNumDID li a").unbind("click");
		$("#plateNumDID li a").removeAttr("href");
	}else{
		$("#plateNumDID").removeClass("lock");
		$("#plateNumDID li a").attr("href","javascript:;");
	}
	if(index<6){
		$("#plateLastDID").addClass("lock");
		$("#plateLastDID li a").unbind("click");
		$("#plateLastDID li a").removeAttr("href");
	}else{
		$("#plateLastDID").removeClass("lock");
		$("#plateLastDID li a").attr("href","javascript:;");
	}
	if(index==7){
		var neweHtml=$("#plateipDID #neweDID a").html();
		if(neweHtml.indexOf("新能源")!=-1){
			$("#plateipDID #neweDID a").html("&nbsp;");
		}
		$("#plateipDID #neweDID").removeClass("newe");
	}else{
		var neweHtml=$("#plateipDID #neweDID a").html();
		if(neweHtml==null || neweHtml=="" || neweHtml=="&nbsp;" || neweHtml.indexOf("新能源")!=-1){
			$("#plateipDID #neweDID a").html("<i>+</i><br>新能源");
			$("#plateipDID #neweDID").addClass("newe");
		}
	}
}
//获取车牌号
function getPlateipDIDVal(){
	var plateNum='';
	var iHtml='';
	$("#plateipDID ul li a").each(function(index, element) {
        iHtml=$(this).html();
		if(iHtml!=null && iHtml!="&nbsp;" && iHtml.indexOf("新能源")==-1){
			plateNum+=iHtml;
		}
    });
	return plateNum;
}
//车牌号选中后赋值
function plateKeySel(val){
	$("#plateipDID ul li a").eq(currentPlatePos).html(val);
	if(currentPlatePos==6){
		closePalteKeyd();
	}else if(currentPlatePos!=7){
		showPlateKeyboard(currentPlatePos+1);
	}
}
function delPalteKey(){
	$("#plateipDID ul li a").eq(currentPlatePos).html("");
	if(currentPlatePos>0){
		showPlateKeyboard(currentPlatePos-1);
	}
}
//车牌号选项键盘
function closePalteKeyd(){
	$(".platekeyd").slideUp(200);
	$("#plateipDID li a").removeClass("on");
	var neweHtml=$("#plateipDID #neweDID a").html();
	if(neweHtml==null || neweHtml=="" || neweHtml=="&nbsp;" || neweHtml.indexOf("新能源")!=-1){
		$("#plateipDID #neweDID a").html("<i>+</i><br>新能源");
		$("#plateipDID #neweDID").addClass("newe");
	}	
}
$(".platekeyd .linkd .closed").click(function(){
    closePalteKeyd();
});
function initPlateKeydClick(){
	$(".platekeyd ul li a").unbind("click");
	$(".platekeyd ul li a").click(function(){
		var val = $(this).html();
		plateKeySel(val);
	});
}

//根据传入的车牌号给车牌输入框赋值
function setPlateKeyboardVal(plateNum){
  try{
		console.log(plateNum)
	var plate0 = plateNum.substr(0,1);
	var plate1 = plateNum.substr(1,1);
	var plate2 = plateNum.substr(2,1);
	var plate3 = plateNum.substr(3,1);
	var plate4 = plateNum.substr(4,1);
	var plate5 = plateNum.substr(5,1);
	var plate6 = plateNum.substr(6,1);
	var plate7 = plateNum.substr(7,1);
	$("#plateipDID ul li a").eq(0).html(plate0);
	$("#plateipDID ul li a").eq(1).html(plate1);
	$("#plateipDID ul li a").eq(2).html(plate2);
	$("#plateipDID ul li a").eq(3).html(plate3);
	$("#plateipDID ul li a").eq(4).html(plate4);
	$("#plateipDID ul li a").eq(5).html(plate5);
	$("#plateipDID ul li a").eq(6).html(plate6);	
	if(plate7!=null && plate7.length>0){
		$("#plateipDID ul li a").eq(7).html(plate7);
		$("#plateipDID #neweDID").removeClass("newe");
	}else{
		$("#plateipDID #neweDID a").html("<i>+</i><br>新能源");
		$("#plateipDID #neweDID").addClass("newe");
	}
  }catch(e){}
}

