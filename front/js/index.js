$(function () {

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});

function search() {
	$('#tb_departments').bootstrapTable('refresh');
}

function change_password() {
  if ($("#txt_new_password").val() == null) {
    alert("密码不能为空");
  } else {

    var requestData = {
      "newpass": $("#txt_new_password").val(),
    };

    $.ajax({
      type : "get",
      contentType : "text/html;charset=utf-8",
      url : "../back/change_password.php",
      data : requestData,
      dataType : "json",
      success : function(data) {
        console.log(data);
        var rt_code = data.rt_code;
        if (rt_code == -1) {
          alert("Something wrong, please contact dev.")
        } else if (rt_code == 0) {
          alert("Something wrong, please contact dev.")
        } else if (rt_code == -2) {
          location.href="./login.html";
        } else if (rt_code == 1) {
          alert("密码修改成功");
          location.href="./login.html";
        }
      },
      error : function() {
        toastr.error('Error');
      },
      complete : function() {
      }
    });
  }
}

function set_show_urls() {
  console.log($("#txt_set_show_appids").val());
  console.log($("#txt_set_show_url").val());
  if ($("#txt_set_show_appids").val() == '') {
    alert("AppID不能为空");
  } else {
    var requestData = {
      "appids": $("#txt_set_show_appids").val(),
      "show_url": $("#txt_set_show_url").val(),
    };

    $.ajax({
      type : "get",
      contentType : "text/html;charset=utf-8",
      url : "../back/set_appids_url.php",
      data : requestData,
      dataType : "json",
      success : function(data) {
        console.log(data);
        var rt_code = data.rt_code;
        if (rt_code == -1) {
          alert("Something wrong, please contact dev.")
        } else if (rt_code == 0) {
          alert("Something wrong, please contact dev.")
        } else if (rt_code == -2) {
          location.href="./login.html";
        } else if (rt_code == 1) {
          alert("设置跳转网址成功");
          $('#tb_departments').bootstrapTable('refresh');
        }
      },
      error : function() {
        toastr.error('Error');
      },
      complete : function() {
      }
    });
  }
}

function set_not_show() {
  console.log($("#txt_set_not_show_appids").val());
  if ($("#txt_set_not_show_appids").val() == '') {
    alert("AppID不能为空");
  } else {
    var requestData = {
      "appids": $("#txt_set_not_show_appids").val(),
    };

    $.ajax({
      type : "get",
      contentType : "text/html;charset=utf-8",
      url : "../back/set_appids_not_show.php",
      data : requestData,
      dataType : "json",
      success : function(data) {
        console.log(data);
        var rt_code = data.rt_code;
        if (rt_code == -1) {
          alert("Something wrong, please contact dev.")
        } else if (rt_code == 0) {
          alert("Something wrong, please contact dev.")
        } else if (rt_code == -2) {
          location.href="./login.html";
        } else if (rt_code == 1) {
          alert("设置不跳转成功");
          $('#tb_departments').bootstrapTable('refresh');
        }
      },
      error : function() {
        toastr.error('Error');
      },
      complete : function() {
      }
    });
  }
}

var responseHandler = function (data) {
    console.log(data);
    if (data.rt_code == 1) {
      data.rt_data.rows = data.rt_data.rows || [];
      return data.rt_data;
    } else {
      location.href="./login.html";
    }
};

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: '../back/get_app_data.php',    //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                    //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            // search: true,                    //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                  //是否显示父子表
            responseHandler: responseHandler,   // 返回数据回调函数
            columns: [{
              field : 'checked',
              checkbox : true,
            }, {
                field: 'id',
                title: 'ID'
            }, {
                field: 'url',
                title: '跳转链接'
            }, {
                field: 'type',
                title: '应用平台'
            }, {
                field: 'show_url',
                title: '是否跳转'
            }, {
                field: 'appid',
                title: '应用ID'
            }, {
                field: 'comment',
                title: '备注'
            }, {
                field: 'request_num',
                title: '请求次数'
            }, {
                field: 'createAt',
                title: '创建时间'
            }, {
                field: 'updateAt',
                title: '更新时间'
            }, ]
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            search_text: $("#txt_search").val(),
        };
        return temp;
    };
    return oTableInit;
};

function check_add_params_empty() {
  // alert($("input[name='add_type']:checked").val());
  var flag = true;
  if ($("#txt_add_app_id").val() == '') {
    flag = false;
  } else if ($("input[name='add_show']:checked").val() == null) {
    flag = false;
  } else if ($("#txt_add_url").val() == '') {
    flag = false;
  } else if ($("input[name='add_type']:checked").val() == null) {
    flag = false;
  } else if ($("#txt_add_comment").val() == '') {
    flag = false;
  }

  return flag;
}

function get_add_params() {
  var requestData = {
    "url": $("#txt_add_url").val(),
    "appid": $("#txt_add_app_id").val(),
    "type": $("input[name='add_type']:checked").val() == 'android' ? "android" : 'ios',
    "show": $("input[name='add_show']:checked").val() == 'Yes' ? 1 : 0,
    "comment": $("#txt_add_comment").val(),
  };

  return requestData;
}

function check_edit_params_empty() {
  var flag = true;
  if ($("#txt_edit_app_id").val() == '') {
    flag = false;
  } else if ($("input[name='edit_show']:checked").val() == null) {
    flag = false;
  } else if ($("#txt_edit_url").val() == '') {
    flag = false;
  } else if ($("input[name='edit_type']:checked").val() == null) {
    flag = false;
  } else if ($("#txt_edit_comment").val() == '') {
    flag = false;
  }

  return flag;
}

function get_edit_params() {
  var arrselections = $("#tb_departments").bootstrapTable(
      'getSelections');
  var requestData = {
    "id": arrselections[0].id,
    "url": $("#txt_edit_url").val(),
    "appid": $("#txt_edit_app_id").val(),
    "type": $("input[name='edit_type']:checked").val() == 'android' ? "android" : 'ios',
    "show": $("input[name='edit_show']:checked").val() == 'Yes' ? 1 : 0,
    "comment": $("#txt_edit_comment").val(),
  };

  return requestData;
}

var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //初始化页面上面的按钮事件
        $("#btn_add").click(
    				function() {
    					$('#myModal1').modal();
    				});
        $("#btn_add_submit").click(
    				function() {
              if (!check_add_params_empty()) {
                alert("请填写完整");
              } else {
                var requestData = get_add_params();
                $.ajax({
                  type : "get",
                  contentType : "text/html;charset=utf-8",
                  url : "../back/add.php",
                  data : requestData,
                  dataType : "json",
                  success : function(data) {
                    var rt_code = data.rt_code;
                    if (rt_code == -1) {
                      alert("Something wrong, please contact dev.")
                    } else if (rt_code == 0) {
                      alert("Something wrong, please contact dev.")
                    } else if (rt_code == 2) {
                      // 有重复的appid
                      alert("Appid 重复");
                    } else if (rt_code == -2) {
                      location.href="./login.html";
                    } else {
                      console.log("Add success");
                      $('#myModal1').modal('hide');
                      $('#tb_departments').bootstrapTable('refresh');
                    }
                  },
                  error : function() {
                    toastr.error('Error');
                  },
                  complete : function() {

                  }

                });
              }
    				});

        $("#btn_edit").click(
    				function() {
    					var arrselections = $("#tb_departments").bootstrapTable(
    							'getSelections');
    					if (arrselections.length > 1) {
    						alert("只能选择一个编辑");
    						return;
    					}
    					if (arrselections.length <= 0) {
    						alert("请选择需要编辑的条目");
    						return;
    					}
    					$("#txt_edit_app_id").val(arrselections[0].appid);
              if (arrselections[0].show_url == 1) {
                $('input[id=optradio_edit_show_yes]').prop('checked', true);
                $('input[id=optradio_edit_show_false]').prop('checked', false);
              } else {
                $('input[id=optradio_edit_show_yes]').prop('checked', false);
                $('input[id=optradio_edit_show_false]').prop('checked', true);
              }
              $("#txt_edit_url").val(arrselections[0].url);

              if (arrselections[0].type == 'android') {
                $('input[id=optradio_edit_ios]').prop('checked', false);
                $('input[id=optradio_edit_android]').prop('checked', true);
              } else {
                $('input[id=optradio_edit_ios]').prop('checked', true);
                $('input[id=optradio_edit_android]').prop('checked', false);
              }

              $("#txt_edit_comment").val(arrselections[0].comment);

    					postdata.ROLE_ID = arrselections[0].ROLE_ID;
    					$('#myModal2').modal();
    				});

        $("#btn_edit_submit").click(
    				function() {
              if (!check_edit_params_empty()) {
                alert("请填写完整");
              } else {
                var requestData = get_edit_params();
                $.ajax({
                  type : "get",
                  contentType : "text/html;charset=utf-8",
                  url : "../back/update.php",
                  data : requestData,
                  dataType : "json",
                  success : function(data) {
                    var rt_code = data.rt_code;
                    if (rt_code == -1) {
                      alert("Something wrong, please contact dev.")
                    } else if (rt_code == 0) {
                      alert("Something wrong, please contact dev.")
                    } else if (rt_code == -2) {
                      location.href="./login.html";
                    } else {
                      console.log("Update success");
                    }
                    $('#myModal2').modal('hide');
                    $('#tb_departments').bootstrapTable('refresh');
                  },
                  error : function() {
                    toastr.error('Error');
                  },
                  complete : function() {

                  }

                });
              }
    				});
        $("#btn_delete").click(
    				function() {
    					var arrselections = $("#tb_departments")
    							.bootstrapTable('getSelections');
    					if (arrselections.length <= 0) {
    						alert("至少选择一个");
    						return;
    					}
              var ids = "";
              console.log(arrselections.length);
              for (var i = 0; i < arrselections.length; i++) {
                ids = ids + arrselections[i].id + ",";
              }

    					var requestData = {
    						"ids": ids.substring(0, ids.length - 1),
    					};

    					$.ajax({
    						type : "get",
    						contentType : "text/html;charset=utf-8",
    						url : "../back/del.php",
    						data : requestData,
    						dataType : "json",
    						success : function(data) {
                  var rt_code = data.rt_code;
                  if (rt_code == -1) {
                    alert("Something wrong, please contact dev.")
                  } else if (rt_code == 0) {
                    alert("Something wrong, please contact dev.")
                  } else if (rt_code == -2) {
                    location.href="./login.html";
                  } else {
                    console.log("Delete success");
                  }
                  $('#myModal2').modal('hide');
                  $('#tb_departments').bootstrapTable('refresh');
    						},
    						error : function() {
    							toastr.error('Error');
    						},
    						complete : function() {
    						}

    					});

    				});
    };

    return oInit;
};
