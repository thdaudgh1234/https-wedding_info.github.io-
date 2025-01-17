var VisitBoard = function()
{
    /* 泥섎━  섏씠吏  二쇱냼 */
    if(GNB_PROCESS == null || GNB_PROCESS == undefined) {
        var GNB_PROCESS = "/cri";
    }
    var process = GNB_PROCESS + "/process/weddingboard/board_manager.php";
    if(_GLB_POSITION == 'admin'){
        var returnPage = GNB_PROCESS + "/index.php";		// 濡쒓렇 명썑  대룞    섏씠吏  二쇱냼
    }else{
        var returnPage = "/";		// 濡쒓렇 명썑  대룞    섏씠吏  二쇱냼
    }

    var chkId = false;
	var refCode = "";
	var refPage = 1;
	var cPage = 1;
    return {
        delPrev: function(code){
            if(code == '') return;
            if(confirm(' 대떦  곗씠 곕    젣  섏떆寃좎뒿 덇퉴?')){
                var param = "code=" + code;

                $.ajax({
                    type: "POST",
                    url: process,
                    dataType:"json",
                    data:"mode=del&" + param,
                    success:function(data){
                        var result = data.result;
                        var rurl = data.returnURL;
                        if(result == 'ok'){
                            alert(' 뺤긽 곸쑝濡    젣  섏뿀 듬땲  .');
                            window.document.location.reload();
                        }else if(result == 'not'){
                            alert('鍮꾨 踰덊샇媛   쇱튂 섏   딆뒿 덈떎.');
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
       
        reg: function(){
            var frm = document._zzWriteF;
            var mode = $("#mode").val();
            var mcode = $("#mcode").val();

            if(!chkInputType(frm,'name',' 대쫫  ',0,'')) return ;
						if(!chkInputType(frm,'pwd','鍮꾨 踰덊샇瑜 ',0,'')) return ;
            if(!chkInputType(frm,'memo',' 댁슜  ',0,'')) return ;


            if(mode == 'reg') msg = ' 깅줉';
            else if(mode == 'mod') msg = ' 섏젙';
            if(confirm(msg + '  섏떆寃좎뒿 덇퉴?')){
            var param = $("#_zzWriteF").serialize();

            $("#_zzWriteF").ajaxForm({
                type: "POST",
                url: process,
                dataType:"json",
                beforeSubmit:function(data,frm,opt){
                    return true;
                },
                success:function(data,status){
                    var result = data.result;
                    if(result == 'ok'){
                        var index = data.index;
                        VisitBoard.callList(0,mcode);
                    }else{
                        alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                        return;
                    }

										frm.reset();
                },
                error:function(xhr){
                    alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                    return false;
                }
            }).submit();
            }
        },
				viewDel: function(code){
					if(code == '') return;
					$("#pwd_btn" + code).hide();
					$("#pwd_div" + code).show();					
				},
				delCancel: function(code){
					if(code == '') return;
					$("#pwd_btn" + code).show();
					$("#pwd_div" + code).hide();					
				},
				del: function(code){
					if(code == '') return;
					if($("#pwd" + code).val() == ""){
						alert('鍮꾨 踰덊샇瑜   낅젰 댁＜ 몄슂.');
						$("#pwd" + code).focus();
						return;
					}
					if(confirm(' 대떦  곗씠 곕    젣 섏떆寃좎뒿 덇퉴.?')){
						var param = "code=" + code + "&pwd=" + $("#pwd" + code).val();
						$.ajax({
								type: "POST",
								url: process,
								dataType:"json",
								data:"mode=del&" + param,
								success:function(data){
										var result = data.result;
										var rurl = data.returnURL;
										if(result == 'ok'){
											VisitBoard.callList(refPage,refCode);
										}else if(result == 'not_pwd'){
											alert('鍮꾨 踰덊샇媛   쇱튂 섏   딆뒿 덈떎.');
										}else{
											
										}
								},
								error:function(xhr){
										alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
										return false;
								}
						});
						//$("#list_visit_div" + code).remove();
					}
				},
				admin_del: function(code){
					if(code == '') return;
					if(confirm(' 대떦  곗씠 곕    젣 섏떆寃좎뒿 덇퉴.?')){
						var param = "code=" + code;
						$.ajax({
								type: "POST",
								url: process,
								dataType:"json",
								data:"mode=admin_del&" + param,
								success:function(data){
										var result = data.result;
										var rurl = data.returnURL;
										if(result == 'ok'){
											alert(' 뺤긽 곸쑝濡    젣 섏뿀 듬땲  .');
											window.document.location.reload();
										}else if(result == 'not_pwd'){
											alert('鍮꾨 踰덊샇媛   쇱튂 섏   딆뒿 덈떎.');
										}else{
											
										}
								},
								error:function(xhr){
										alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
										return false;
								}
						});
						//$("#list_visit_div" + code).remove();
					}
				},
				search: function(param){
            var skey = $("#skey").val();
            var sword = $("#sword").val();
            window.document.location.replace("/cri/_card/index.php?_pd=comment&_pg=index&skey=" + skey + "&sword=" + sword);
        },
		callCommentMore: function(ref_code){
			cPage++;
			var param = "ref_code=" + ref_code + "&page=" + cPage;
            $.ajax({
                type: "POST",
                url: process,
                dataType:"json",
                data:"mode=call_list&" + param,
                success:function(data){
                    var result = data.result;
                    if(result == 'ok'){
                        var list = data.list;
                        var num = data.num;
                        var HTML = '';
	
                        if(num > 0){
                            for(i = 0; i < num; i++){
                                var code = list[i].code;
                                var name = list[i].name;
                                var memo = list[i].memo;
                                var register_day = list[i].register_day;
                                var join_yn = list[i].join_yn;
                                HTML += "<div class='list-data' id='list_visit_div" + code + "'>";
                                HTML += "<div style='padding:10px;'><span style='font-weight:bold;'>" + name + "</span> <span style='font-weight:bold;'>" + join_yn + "</span> <span style='float:right'>" + register_day + "</span></div>";
                                HTML += "<div style='padding:10px;font-size:1.8em;'>" + memo + "</div>";
                                HTML += "<div style='padding:10px;'>";
                                HTML += "<span style='padding:10px;display:none;' id='pwd_div" + code + "'><span style='margin-top:3px'>鍮꾨 踰덊샇 </span><span><input type='password' name='pwd" + code + "' id='pwd" + code + "' style='font-size:1em;width:30%;border:1px solid #DEDEDE;height:40px;margin-top:-3px;'></span> ";
                                HTML += "<a href=\"javascript:VisitBoard.del('" + code + "');\"><span style='background:purple;color:#FFFFFF;padding:2px 10px;'> 뺤씤</span></a> ";
                                HTML += "<a href=\"javascript:VisitBoard.delCancel('" + code + "');\"><span style='background:#DEDEDE;color:#666666;padding:2px 10px;'>痍⑥냼</span></span></a>";
                                HTML += "<span style='float:right;' id='pwd_btn" + code + "'><a href=\"javascript:VisitBoard.viewDel('" + code + "');\"><span style='background:#DEDEDE;color:#666666;padding:2px 10px;font-size:.9em;'>  젣</span></a></span></div>";
                                HTML += "</div>";
                            }
                        }else{
							alert(' 붿씠    곗씠 곌   놁뒿 덈떎.');
						}

						preHTML = $("#visit_item_list").html();
                        $("#visit_item_list").html(preHTML + HTML);
                    }
                },
                error:function(xhr){
                    alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                    return false;
                }
            });
		},
        callList: function(flag,ref_code){
			refCode = ref_code;
			
			if(flag == 0){
                page = 1;
            }
			refPage = page;
            var param = "ref_code=" + ref_code + "&page=" + page;
            $.ajax({
                type: "POST",
                url: process,
                dataType:"json",
                data:"mode=call_list&" + param,
                success:function(data){
                    var result = data.result;
                    if(result == 'ok'){
                        var list = data.list;
                        var num = data.num;
                        var HTML = '';

                        if(num > 0){
                            for(i = 0; i < num; i++){
                                var code = list[i].code;
                                var name = list[i].name;
                                var memo = list[i].memo;
                                var register_day = list[i].register_day;
                                var join_yn = list[i].join_yn;
                                HTML += "<div class='list-data' id='list_visit_div" + code + "'>";
                                HTML += "<div style='padding:10px;'><span style='font-weight:bold;'>" + name + "</span> <span style='font-weight:bold;'>" + join_yn + "</span> <span style='float:right'>" + register_day + "</span></div>";
                                HTML += "<div style='padding:10px;font-size:1.8em;'>" + memo + "</div>";
                                HTML += "<div style='padding:10px;'>";
                                HTML += "<span style='padding:10px;display:none;' id='pwd_div" + code + "'><span style='margin-top:3px'>鍮꾨 踰덊샇 </span><span><input type='password' name='pwd" + code + "' id='pwd" + code + "' style='font-size:1em;width:30%;border:1px solid #DEDEDE;height:40px;margin-top:-3px;'></span> ";
                                HTML += "<a href=\"javascript:VisitBoard.del('" + code + "');\"><span style='background:purple;color:#FFFFFF;padding:2px 10px;'> 뺤씤</span></a> ";
                                HTML += "<a href=\"javascript:VisitBoard.delCancel('" + code + "');\"><span style='background:#DEDEDE;color:#666666;padding:2px 10px;'>痍⑥냼</span></span></a>";
                                HTML += "<span style='float:right;' id='pwd_btn" + code + "'><a href=\"javascript:VisitBoard.viewDel('" + code + "');\"><span style='background:#DEDEDE;color:#666666;padding:2px 10px;font-size:.9em;'>  젣</span></a></span></div>";
                                HTML += "</div>";
                            }
                        }


                        $("#visit_item_list").html(HTML);
                    }
                },
                error:function(xhr){
                    alert('泥섎━以   ㅻ쪟媛  諛쒖깮 덉뒿 덈떎.');
                    return false;
                }
            });
        }
    }
}();
