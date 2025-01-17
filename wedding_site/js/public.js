var hangulToJaso = function (text){  
	var ChoSeong = new Array (   
			0x3131, 0x3132, 0x3134, 0x3137, 0x3138, 0x3139,   
			0x3141, 0x3142, 0x3143, 0x3145, 0x3146, 0x3147,   
			0x3148, 0x3149, 0x314a, 0x314b, 0x314c, 0x314d, 0x314e   
	);  
	var JungSeong = new Array (   
		 0x314f, 0x3150, 0x3151, 0x3152, 0x3153, 0x3154,   
		 0x3155, 0x3156, 0x3157, 0x3158, 0x3159, 0x315a,   
		 0x315b,0x315c, 0x315d, 0x315e, 0x315f, 0x3160,   
		 0x3161, 0x3162, 0x3163   
	);  
	var JongSeong = new Array (   
			0x0000, 0x3131, 0x3132, 0x3133, 0x3134,0x3135,   
			0x3136, 0x3137, 0x3139, 0x313a, 0x313b, 0x313c,   
			0x313d, 0x313e, 0x313f, 0x3140, 0x3141, 0x3142,   
			0x3144, 0x3145, 0x3146, 0x3147, 0x3148, 0x314a,   
			0x314b, 0x314c, 0x314d, 0x314e   
	);  
	var chars = new Array()  
	var v = new Array();  
	for (var i = 0; i < text.length; i++){  
			chars[i] = text.charCodeAt(i);  
			if (chars[i] >= 0xAC00 && chars[i] <= 0xD7A3){  
				 var i1, i2, i3;  
				 i3 = chars[i] - 0xAC00;  
				 i1 = i3 / (21 * 28);  
				 i3 = i3 % (21 * 28);  
				 i2 = i3 / 28;  
				 i3 = i3 % 28;  
				 v.push(String.fromCharCode(ChoSeong[parseInt(i1)]));  
				 v.push(String.fromCharCode(JungSeong[parseInt(i2)]));  
				 if (i3 != 0x0000)  
						 v.push(String.fromCharCode(JongSeong[parseInt(i3)]));  
			}else {  
				 v.push(String.fromCharCode(chars[i] ));  
			}  
	 }  
	return v;  
} 
function chkType(type){
	if(type == 'checkbox' || type == 'radio'){
		return 1;
	}else{
		return 0;
	}
}
function chkInType(type){
	if(type == 'checkbox'){
		return 'chk';
	}else if(type == 'radio'){
		return 'rdo';
	}else{
		return '';
	}
}

function chkCommonForm(frm){
	var lng = frm.elements.length;	
	for(i = 0; i < lng; i++){
		var Obj = frm.elements[i];
		var name = Obj.getAttribute("name");							//  꾨뱶紐 
		var inTitle = Obj.getAttribute("inTitle");						//  꾨뱶  쒕ぉ
		var inBase = Obj.getAttribute("inBase");						//   (瑜 ) 援щ텇
		var required = Obj.getAttribute("required");					//  꾩닔  щ 
		var type = Obj.getAttribute("type");							//     
		
		var flag = chkType(type);
		var ttype = chkInType(type);
		inBase = inBase == 0 ? '瑜 ' : '  ';
		if(required != null){
			if(!chkInputType(frm,name,inTitle + inBase,flag,ttype)) return false;	
		}
	}
}
String.prototype.trim = function(){
	return this.replace(/^\s*/,"").replace(/\s*$/,"");
}
String.prototype.josa = function(nm) {
	try{
	var nm1 = nm.trim().substring(0, nm.trim().indexOf("/"));
	var nm2 = nm.trim().substring(nm.trim().indexOf("/") + 1, nm.trim().length);
	var a = this.substring(this.length - 1, this.length).charCodeAt();
	a = a - 44032;
	}catch(e){
		alert('e : ' + e.toString());
	}
	var jongsung = a % 28;
	return (jongsung) ? nm1 : nm2;
	//<?=_SITE_PROGRAM_HOME?>/_common_lib/script/prototype.js
	// var fname = ' 앸뀈 붿씪';
	// alert(fname + fname.josa('  /  '));
}
function setEmail(objName,value){
	var objEmail2 = document.getElementById(objName + "2");
	objEmail2.value = value;
}

function viewMenu(flag){
	var frm = document.writeF;
	var totalCnt = 4;
	
	for(i = 1; i <= totalCnt; i++){
		var tabMenu = document.getElementById("tabMenu0" + i);
		var tabCotent = document.getElementById("tabCotent0" + i);

		if(tabMenu != null) tabMenu.setAttribute('class',null);
		if(tabCotent != null) tabCotent.style.display = 'none';
	}

	var objTab =  document.getElementById("tabMenu" + flag);
	var objContent =  document.getElementById("tabCotent" + flag);

	if(objTab != null) objTab.setAttribute('class','on');
	if(objContent != null) objContent.style.display = "inline";

	if(frm.tap_num != null) frm.tap_num.value = flag;
}

function addEvent(obj, type, fn)
{
	if (obj.addEventListener)
		obj.addEventListener(type, fn, false);
	else if (obj.attachEvent)
	{
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
		obj.attachEvent("on"+type, obj[type+fn]);
	}
}