let deleteMany=$('#deleteMany');
// 当分类发生表单提交行为的时候
$('#addCategory').on('submit',function(){
    // 获取用户在表单中输入的内容
    let formData =$(this).serialize();
    // 向服务端发送请求 添加分类
    $.ajax({
        type:'post',
        url:'/categories',
        data: formData,
        success:function(){
            location.reload();
        }

    })
    return false
    // 阻止表单默认提交行为
     

});

// 发送ajax请求 向服务器端所有分类列表数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        // 将服务器端返回的数据和HTML模板进行拼接
        let html =template('categoryListTpl',{data:response});
        // 将拼接好的内容放到页面当中
        $('#categoryBox').html(html);
    }
});

// 为编辑按钮添加点击事件
$('#castgoryBox').on('click','edit',function(){
    // 获取要修改的分类数据id 
    let id =$(this).attr('data-id');
    // 根据id获取分类数据的详细信息

    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(response){
            console.log(response);
            let html = template('modifyCategoryTpl',response);
            $('#formBox').html(html);
            
        }
    })
});

// 当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit','#modifyCategory',function(){
    // 获取管理员在表单中输入的内容
    let formData =$(this).serialize();
    // 获取要修改的分类ID
    let id =$(this).attr('data-id');
    // 发送请求 修改分类数据
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:formData,
        seccess:function(){
            location.reload();
        }
    })
    // 阻止表单默认的提交行为
    return false

});

// 当删除按钮被点击的时候
$('#categoryBox').on('click','.delete',function(){
    if(confirm('您真的要执行删除操作吗')){
        // 获取要删除的分类数据ID
        let id=$(this).attr('data-id');
        // 想服务器端发送请求 删除分类数据
        $.ajax({
            type:'delete',
            url:'/categories/'+id,
            success:function(){
                location.reload();
            }
        })
    }
});

// 点击全选按钮事件
$('#selectAll').on('change',function(){
     // 获取全选按钮的状态
     let status =$(this).prop('checked');
     console.log(status);
     

     $('#categoryBox').find('input').prop('checked',status);
     if(status==true){
        deleteMany.show();
     }else if(status==false){
        deleteMany.hide();
     }

});
$('#categoryBox').on('change','.userStatus',function(){
  
    // 如果选中用户大于等于2 就显示批量删除按钮
    // 如果没有就隐藏起来
    let inputs =$('#categoryBox').find('input');
          
        if(inputs.filter(':checked').length>1){
            deleteMany.show();
        }else{
            deleteMany.hide();
        }
});


$('.btn-sm').on('click', function () {
    var ids = [];
    // 想要获取被选中的元素的id属性值 
    var checkUser = $('tbody input:checked');
    // 对checkUser对象进行遍历
    checkUser.each(function (k, v) {
        // console.log(v);
        
      var id = v.parentNode.parentNode.children[3].getAttribute('data-id');
    //console.log(id);
      
      ids.push(id);
    });

    // 发送ajax
    $.ajax({
      type: 'delete',
      url: '/categories/' + ids.join('-'),
      success: function (res) {
        // res是这一个数组 数组里面放的被删除的元素 元素是一个对象 
        // res.forEach(e => {
        //   var index = userArr.findIndex(item => item._id == e._id);
        //   // 调用splice()
        //   userArr.splice(index, 1);
        //   render(userArr);
        // })

        location.reload();

      }
    });
});







// 彭老师 11:34:01 (多人发送)
//  // 这个数组是专用于存放 分类
//     var cArr = new Array();
//     //添加分类功能 
//     $('#cAdd').on('click', function () {
//       $.ajax({
//         type: 'post',
//         url: '/categories',
//         data: $('#cForm').serialize(),
//         success: function (res) {
//           cArr.push(res);
//           render(cArr);
//         }
//       });
//     });

//     // 展示分类
//     $.ajax({
//       type: 'get',
//       url: '/categories',
//       success: function (res) {
//         cArr = res;
//         render(cArr);
//       }
//     })


//     // 用于调用template方法 
//     function render(arr) {
//       var str = template('cTpl', {
//         list: arr
//       });
//       // console.log(str);
//       $('tbody').html(str);
//     }
    
// 彭老师 11:48:11 (多人发送)
// // 编辑功能 
//     var cId;
//     $('tbody').on('click', '.edit', function () {
//       cId = $(this).parent().attr('data-id');
//       $('#cForm > h2').text('修改分类');
//       var title = $(this).parents('tr').children().eq(1).text();
//       var className = $(this).parents('tr').children().eq(2).text();
//       $('#title').val(title);
//       $('#className').val(className);
//       $('#cAdd').hide();
//       $('#cEdit').show();
//     });

//     $('#cEdit').on('click', function () {
//       $.ajax({
//         type: 'put',
//         url: '/categories/' + cId,
//         data: $('#cForm').serialize(),
//         success: function (res) {
//           var index = cArr.findIndex(item => item._id == cId);
//           // 根据这个index找到数组的这个元素 将它的数据更新 
//           cArr[index] = res;
//           // 调用render方法 重新渲染页面 
//           render(cArr);
//           $('#title').val('');
//           $('#className').val('');
//           $('#cAdd').show();
//           $('#cEdit').hide();
//         }
//       })
//     });

