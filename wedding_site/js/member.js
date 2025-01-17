var Member = function()
{
	/* 泥섎━  섏씠吏  二쇱냼 */
	if(GNB_PROCESS == null || GNB_PROCESS == undefined) {
		var GNB_PROCESS = "/cri";
	}
	var process = GNB_PROCESS + "/process/member/member_manager.php";
	if(_GLB_POSITION == 'admin'){
		var returnPage = GNB_PROCESS + "/index.php";		// 濡쒓렇 명썑  대룞    섏씠吏  二쇱냼
	}else{
		var returnPage = "/";		// 濡쒓렇 명썑  대룞    섏씠吏  二쇱냼
	}

	return {
		login : function(frm,prelogin)
		{

			if(!chkInputType(frm,'id',' 꾩씠 붾 ',0,'')) return false;
			if(!chkInputType(frm,'pwd','鍮꾨 踰덊샇瑜 ',0,'')) return false;
			var param = $(frm).serialize();
			var rPage = $("#returnURL").val();
			if(rPage == undefined){
				if(returnPage == "") returnPage = "/";
				rPage = returnPage;
			}else{
				if(rPage == "") rPage = "/";
			}
			$.ajax({
				type: "POST",
				url: process,
				dataType:"json",
				data:param + "&memMode=login&relogin=" + prelogin,
				success:function(data){
					if(data.result == 'not'){
						alert(' 낅젰 섏떊  뺣낫媛   쇱튂 섏   딆뒿 덈떎.');
					}else if(data.result == 'ok'){
						window.document.location.replace(rPage);
						return;
					}else if(data.result == 'relogin'){
						if(confirm(' 낅젰 섏떊  꾩씠 붽   대  濡쒓렇    섏뼱  덉뒿 덈떎.\r\n媛뺤젣濡  濡쒓렇 몄떆  묒냽 섏뼱  덈뒗 怨녹뿉 쒕뒗 濡쒓렇 꾩썐  ⑸땲  .\r\n濡쒓렇    섏떆寃좎뒿 덇퉴?')){
							Member.login(frm,'y');
						}
					}
				},
				error:function(xhr){
					alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
					return false;
				}
			});
			return false;
		},
		logout : function(){
			if(confirm('濡쒓렇 꾩썐  섏떆寃좎뒿 덇퉴?')){
				$.ajax({
					type: "POST",
					url: process,
					dataType:"json",
					data:"memMode=logout",
					success:function(data){
						window.document.location.href = returnPage;
					},
					error:function(xhr){			
						alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
						return false;
					}
				});		
				return ;
			}
		},
        chk_id : function(){
			var id = $("#id").val();
			if(id == ""){
				alert(' 꾩씠 붾   낅젰 댁＜ 몄슂.');
                $("#id").focus();
				return;
			}
            $.ajax({
                type: "POST",
                url: process,
                dataType:"json",
                data:"memMode=chk_id&id=" + id,
                success:function(data){
					var result = data.result;
					if(result == 'yes'){
						alert(' 대떦  꾩씠 붾뒗  대   ъ슜以묒엯 덈떎.');
                        $("#chk_id").val('n');
                        $("#id").focus();
                        $("#id").select();

						return;
					}else if(result == 'no'){
                        alert(' 대떦  꾩씠 붾뒗  ъ슜媛  ν빀 덈떎.');
						$("#chk_id").val('y');
                        $("#id").attr("readOnly",true);
                        return;
                    }else if(result == 'none'){
                        alert(' 꾩씠 붾   낅젰 댁＜ 몄슂.');
                        return;
                    }
                },
                error:function(xhr){
                    alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                    return false;
                }
            });
        },
        chk_nickname : function(){
            var nickname = $("#nickname").val();
            if(nickname == ""){
                alert(' 됰꽕 꾩쓣  낅젰 댁＜ 몄슂.');
                $("#nickname").focus();
                return;
            }
            $.ajax({
                type: "POST",
                url: process,
                dataType:"json",
                data:"memMode=chk_nickname&nickname=" + nickname,
                success:function(data){
                    var result = data.result;
                    if(result == 'yes'){
                        alert(' 대떦  됰꽕 꾩   대   ъ슜以묒엯 덈떎.');
                        $("#chk_nickname").val('n');
                        $("#nickname").focus();
                        $("#nickname").select();

                        return;
                    }else if(result == 'no'){
                        alert(' 대떦  됰꽕 꾩   ъ슜媛  ν빀 덈떎.');
                        $("#chk_nickname").val('y');
                        $("#nickname").attr("readOnly",true);
                        return;
                    }else if(result == 'none'){
                        alert(' 됰꽕 꾩쓣  낅젰 댁＜ 몄슂.');
                        return;
                    }
                },
                error:function(xhr){
                    alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                    return false;
                }
            });
        },
        sameInfo : function(checked){
            if(checked){
                $("#manager").val($("#name").val());
                $("#mng_tel1").val($("#hp1").val());
                $("#mng_tel2").val($("#hp2").val());
                $("#mng_tel3").val($("#hp3").val());
            }else{
                $("#manager").val("");
                $("#mng_tel1").val("");
                $("#mng_tel2").val("");
                $("#mng_tel3").val("");
            }
        },
        reg: function(){
            var frm = document._zzWriteF;
            if(!chkInputType(frm,'id',' 꾩씠 붾 ',0,'')) return ;
            if(!chkInputType(frm,'pwd','鍮꾨 踰덊샇瑜 ',0,'')) return ;
            if(!chkInputType(frm,'name',' 대쫫  ',0,'')) return ;
            if(confirm('媛     섏떆寃좎뒿 덇퉴?')){
                var param = $("#_zzWriteF").serialize();

                $.ajax({
                    type: "POST",
                    url: process,
                    dataType:"json",
                    data:"memMode=register_com&" + param,
                    success:function(data){
                        var result = data.result;
                        var rurl = data.returnURL;
                        if(result == 'ok'){
                            alert(' 뺤긽 곸쑝濡   깅줉 섏뿀 듬땲  .');
                            window.document.location.replace(rurl);
                        }else{
                            alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                            return;
                        }
                    },
                    error:function(xhr){
                        alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                        return false;
                    }
                });
            }
        },
        regMember: function(){
            var frm = document._zzWriteF;
            if(!chkInputType(frm,'id',' 꾩씠 붾 ',0,'')) return ;
            if(!chkInputType(frm,'pwd','鍮꾨 踰덊샇瑜 ',0,'')) return ;
            if(confirm(' 섏젙  섏떆寃좎뒿 덇퉴?')){
                var param = $("#_zzWriteF").serialize();

                $.ajax({
                    type: "POST",
                    url: process,
                    dataType:"json",
                    data:"memMode=mod_planner_id&" + param,
                    success:function(data){
                        var result = data.result;
                        var rurl = data.returnURL;
                        if(result == 'ok'){
                            alert(' 뺤긽 곸쑝濡  蹂 寃쎈릺 덉뒿 덈떎.');
                        }else if(result == 'same'){
													alert(' 대떦  꾩씠 붾뒗  ъ슜以묒엯 덈떎.');
													return;
												}else{
                            alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                            return;
                        }
                    },
                    error:function(xhr){
                        alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                        return false;
                    }
                });
            }
        },
		join : function(){
			var frm = document._memFrm;
            var obj = document.getElementsByName("u_city[]");

            /*
            if($("#id").val() == ''){

                alert(' 꾩씠 붾   낅젰 댁＜ 몄슂');
                $("#id").focus();
            }
            */
            if(!chkInputType(frm,'id',' 꾩씠 붾 ',0,'')) return ;
            if(!chkInputType(frm,'pwd','鍮꾨 踰덊샇瑜 ',0,'')) return ;
            if(!chkInputType(frm,'pwd_ok','鍮꾨 踰덊샇  뺤씤    ',0,'')) return ;

            if(!chkInputType(frm,'name',' 대쫫  ',0,'')) return ;
            if(!chkInputType(frm,'hp1',' 대  곕쾲 몃 ',1,'')) return ;
            if(!chkInputType(frm,'hp2',' 대  곕쾲 몃 ',0,'')) return ;
            if(!chkInputType(frm,'hp3',' 대  곕쾲 몃 ',0,'')) return ;

            if(!chkInputType(frm,'b_year',' 앸뀈 붿씪(  )  ',1,'')) return ;
            if(!chkInputType(frm,'b_month',' 앸뀈 붿씪(  )  ',0,'')) return ;
            if(!chkInputType(frm,'b_day',' 앸뀈 붿씪(  )  ',0,'')) return ;
            if(!chkInputType(frm,'sex',' 깅퀎  ',1,'rdo')) return ;

            if($("#member_type").val() == '1'){
                if(obj.length == 0){
                    alert(' 쒕룞媛  μ   쓣  좏깮 섏꽭  .');
                    return;
                }
            }

			if(frm.pwd.value != frm.pwd_ok.value){
				alert('鍮꾨 踰덊샇媛   쇱튂 섏   딆뒿 덈떎.');
				frm.pwd_ok.focus();
				return;
			}
            if(frm.chk_id.value != "y"){
				alert(' 꾩씠   以묐났 뺤씤    뺤씤 댁＜ 몄슂.');
				return;
			}
            if(!frm.agree.checked){
                alert(' 댁슜 쎄     숈쓽 섏뀛   媛  낆씠 媛  ν빀 덈떎.');
                frm.agree.focus();
                return;
            }
            if(!frm.privacy.checked){
                alert('媛쒖씤蹂댄샇 痍④툒諛⑹묠    숈쓽 섏뀛   媛  낆씠 媛  ν빀 덈떎.');
                frm.privacy.focus();
                return;
            }

			if(confirm('媛     섏떆寃좎뒿 덇퉴?')){

                var param = $("#_memFrm").serialize();
                $("#memMode").val('register');
                //$.ajax({
                $("#_memFrm").ajaxForm({
                    type: "POST",
                    url: process,
                    dataType:"json",
                    beforeSubmit:function(data,frm,opt){
                        return true;
                    },
                    success:function(data,status){
                        var result = data.result;
                        if(result == 'ok'){
                            window.document.location.replace("/join_complete.php");
                        }else{
                            alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                            return;
                        }
                    },
                    error:function(xhr){
                        alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                        return false;
                    }
                }).submit();
			}
		}
	}	
}();