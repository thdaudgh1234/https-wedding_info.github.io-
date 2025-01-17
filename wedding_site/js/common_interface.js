var _LIB_URL = '/_root_inc/library/';
var _ACT_URL = '/cri/';


function chkUserInput(frm){
	var lng = frm.elements.length;
	for(i = 0; i < lng; i++){
		var Obj = frm.elements[i];		
		try{
			var name = Obj.getAttribute("name");							//  꾨뱶紐 
			var id = Obj.getAttribute("id");									//  꾨뱶 꾩씠  
			var inTitle = Obj.getAttribute("alt");						//  꾨뱶  쒕ぉ
			var required = Obj.getAttribute("required");			//  꾩닔  щ 
			var type = Obj.getAttribute("type");							//     
			var value = Obj.getAttribute("value");						// 媛 
			var flag = chkType(type);
			var ttype = chkInType(type);
			var tagName = Obj.tagName;												//  쒓렇     			
			if(name == null || inTitle == null) continue;

			if(id == 'pwd_ok'){
				var val1 = $("#pwd").val();
				var val2 = $("#pwd_ok").val();

				if(val1 != val2){
					alert('鍮꾨 踰덊샇媛   쇱튂 섏   딆뒿 덈떎.');
					$("#pwd_ok").focus();
					return false;
				}
			}

			if(inTitle != null){
				try{
					inBase =  inTitle.josa('  /瑜 ')
				}catch(e){
					alert(e.toString());
				}

				if(tagName == 'TEXTAREA'){
					try{
						if(oEditors.getById[id] != undefined){
							oEditors.getById[id].exec("UPDATE_CONTENTS_FIELD", []);
						}
					}catch(e){
						oEditors = null;
					}
				}
				if(required != null){
					if(ttype == 'chk'){
						if(!chkInputType(frm,name,inTitle + inBase,flag,ttype)) return false;	
					}else{
						if(!chkInputType(frm,name,inTitle + inBase,flag,ttype)) return false;	
					}

				}			
			}	
		}catch(e){
			
		}
	}
	return true;
}

function chkInputType(frm,name,txt,flag,type){
  var obj = document.getElementsByName(name);

  if(obj[0] == null) return true;
  msg = '';
  switch (flag){
    case 0:
      msg = ' 낅젰';
    break;
    case 1:
      msg = ' 좏깮';
    break;
  }  
  if(type == '') type = 'ipt';


switch(type){
    case 'ipt':
	try{
      if(eval("frm." +  name + ".value==''")){
        alert(txt + ' ' + msg + " 섏꽭  .");
        eval("frm." + name + ".focus()");
        return false;
      }
	}catch(e){
		alert( name+ " : " + e.toString() + $("#s_day").val());
		return false;
	}

    break;
    case 'rdo':
    case 'chk':
			var chk_name = name.replace('[]','');
			lng = eval("frm." +  chk_name + ".length");    
			
			chking = 0;

			for(_i = 0; _i < lng; _i++){
				if(eval("frm." +  chk_name + "[" + _i + "].checked == true")){
					chking = 1;
				}
			}
			
			if(chking == 0){
				alert(txt + ' ' + msg + " 섏꽭  .");
				eval("frm." + chk_name + "[0].focus()");
				return false;
			}
    break;
  }   
  return true;
}
function NumCheck(frm,strArg){
  var num ="0123456789,";
  for (var i=0; i<frm.value.length; i++){
    if(-1 == num.indexOf(frm.value.charAt(i))){
      alert(" レ옄留   낅젰媛  ν빀 덈떎!");
      frm.value = '';
      frm.focus();
      return;
    }
  }
}
function getCookie(name){
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length )
	{
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie )
		{
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
			break;
	}
	return "";
}
function setCookie( name, value, expiredays ){
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() +";" 
}

function closePopUp(pop_id,today_id,name,value,day) {

    var obj = $("#" + today_id);
    if(obj.prop("checked")){
        setCookie(name,value,day);
    }
    $("#" + pop_id).hide();
}

function openPopUp(pop_id,name,value){
	var cookie_v = getCookie(name);

	if(cookie_v != value){
		$("#" + pop_id).show();
	}
}

function number_format(input){ 
	var input = String(input); 
	var reg = /(\-?\d+)(\d{3})($|\.\d+)/; 
	if(reg.test(input)){ 
		return input.replace(reg, function(str, p1,p2,p3){ 
				return number_format(p1) + "," + p2 + "" + p3; 
			}     
		); 
	}else{ 
		return input; 
	} 
}



function viewQuest(flag,view){
	var objContain = document.getElementById("alimDDiv" + flag);
	if(objContain != null){
		if(view == 'n'){
			objContain.innerHTML = "";
		}else{		
			var childDiv = document.createElement("div");

			childDiv.setAttribute("style","position:absolute;border:1px solid #c04813;background:#f9f8f8;padding:10px;display:block;line-height:24px;");			
			$.ajax({
				type: "POST",
				url: _LIB_URL + "message/message.php",
				dataType:"html",
				data: "flag=" + flag,
				success:function(data){
					try{
						childDiv.innerHTML = data;
						objContain.appendChild(childDiv);
					}catch(e){
					}	
				},
				error:function(xhr){			
					//alert(xhr.toString());
				}
			});			
		}
	}
}

function chkedAll(checked){
	$("[name='chk[]']").attr("checked",checked);
}

function isChecked(){
	var chk = false;
	var obj = document.getElementsByName("chk[]");
	for(i = 0; i < obj.length; i++){
		chk = obj[i].checked;
		if(chk){
			break;
		}
	}

	return chk;
}

function isVal(val){
	if(val == null || val == undefined){
		return false;
	}	
	return true;
}
function delCommonData(info){
	var chk = isChecked();
	if(chk){
	}else{
		alert(' 좏깮    곗씠 곌   놁뒿 덈떎.');
		return;
	}
	
	var table = info.table;
	var frm = info.form;

	if(!isVal(table)){
		alert(' 뚯씠釉붾챸    뺤쓽 섏뼱  덉   딆뒿 덈떎.');
		return;
	}
	if(!isVal(frm)){
		alert(' 쇱씠由꾩씠  뺤쓽 섏뼱  덉   딆뒿 덈떎.');
		return;
	}
	var param = $("#" + frm).serialize() + "&table=" + table;
	$.ajax({
		type: "POST",
		url: _ACT_URL + "/process/common/common_delete.php",
		dataType:"json",
		data: param,
		success:function(data){
			try{
				if(data.result == 'success'){
					alert(' 곗씠 곌    젣 섏뿀 듬땲  .');
					window.document.location.reload();
				}else if(data.result == 'fail'){
					alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
					return false;
				}
			}catch(e){
			}	
		},
		error:function(xhr){			
			//alert(xhr.toString());
		}
	});
}

function callDataExist(info){
	var mode = info.mode;
	var table = info.table;
	var chk_field = info.chk_field;
	var chk_value = info.chk_value;
	var result = false;
	
	if(!isVal(table)){
		alert(' 뚯씠釉붾챸    뺤쓽 섏뼱  덉   딆뒿 덈떎.');
		return false;
	}
	if(!isVal(chk_field)){
		alert('以묐났 뺤씤    꾨뱶紐낆씠  뺤쓽 섏뼱  덉   딆뒿 덈떎.');
		return false;
	}
	if(!isVal(chk_value)){
		alert('以묐났 뺤씤   媛믪씠  뺤쓽 섏뼱  덉   딆뒿 덈떎.');
		return false;
	}
	var param = "mode=" + mode + "&table=" + table + "&chk_field=" + chk_field + "&chk_value=" + chk_value;
	$.ajax({
		type: "POST",
		url: _ACT_URL + "/process/common/chk_exist_value.php",
		dataType:"json",
		data: param,
		success:function(data){
			try{
				if(data.result == 'success'){
					alert(' ъ슜媛  ν븳  꾩씠 붿엯 덈떎.');
			
					if($("#id_chk") != null) $("#id_chk").val('y');
					return true;
				}else if(data.result == 'exist'){
					alert(' 대   ъ슜以묒씤  꾩씠 붿엯 덈떎.');
					if($("#id_chk") != null) $("#id_chk").val('n');
					return false;
				}else if(data.result == 'fail'){
					alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
					if($("#id_chk") != null) $("#id_chk").val('n');
					return false;
				}
			}catch(e){
			}	

		},
		error:function(xhr){			
			//alert(xhr.toString());
		}
	});
}

function initSelect(name){
	var lng = $("#" + name + " option").size();

	for(i = lng - 1; i >= 1; i--){
		$("#" + name + " option:eq(" + i + ")").remove();
	}

}

function setUserEmail(objId,value){
	if(objId == '') return;
	var val = $("#" + objId +"2").val(value); 
}



function chgDivFn(objName,flag){
	if($("." + objName) == null || $("." + objName) == undefined){
		return;
	}
	var lng = $("." + objName).length;

	$("." + objName).attr("style","display:none;");
	for(i = 0; i < lng; i++){
		var obj = $("." + objName)[i];
		
	}
	$("#" + objName + flag).attr("style","display:block;");
}

function schBoardList(){
	$("#_zzbrdFrm").submit();
}

function viewContent(code,obj){
	if($("#content" + code) != null){
		if($("#content" + code).css('display') == 'none'){
			$("#content" + code).show();
		}else{
			$("#content" + code).hide();
		}
	}
	if($("#contentLine" + code) != null){
		if($("#contentLine" + code).css('display') == 'none'){
			$("#contentLine" + code).show();
		}else{
			$("#contentLine" + code).hide();
		}
	}
}

function addBtnFavorite() {
	if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
		window.sidebar.addPanel(document.title,window.location.href,'');
	} else if(window.external && ('AddFavorite' in window.external)) { // IE Favorite
		window.external.AddFavorite(location.href,document.title); 
	} else if(window.opera && window.print) { // Opera Hotlist
		this.title=document.title;
		return true;
	} else { // webkit - safari/chrome
		alert((navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + " + D  ㅻ   꾨Ⅴ硫  遺곷쭏 ъ뿉    λ맗 덈떎.");
	}
}

function sendSMS(code,flag,manflag,hp){
	var wMode = 0;
	
	
	var win = window.open('../_popup/sms_flag.php?code=' + code + '&flag=' + flag + "&manflag=" + manflag + "&hp=" + hp,'phone','width=400,height=300');
	try{
		win.focus();
	}catch(e){
		alert(' 앹뾽 李⑤떒    댁젣    댁슜 섏뿬 二쇱떆湲  諛붾엻 덈떎');
	}
}


function compareValue(obj1,obj2,msg){
	if(obj1.value != obj2.value){
		alert(msg);
		return false;
	}

	return true;
}

function goPage(url){
	window.document.location.replace(decodeURIComponent(url));
}
function downFile(file,rfile,bid){
	if(typeof(bid) == undefined) bid = '';
	window.document.location.href= _ACT_URL + "/process/download.php?file=" + file + "&rfile=" + rfile + "&bid=" + bid;
}