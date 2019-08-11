// 主要是操作用户的

// 将用户列表展示出来
let userArr =new Array();

$.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        userArr = res;
        render(userArr);
        
    }
})
// 用于调用template方法
function render(arr){
    let str =template('userTpl',{
        list:arr
    });
    $('tbody').html(str);
}

$('#userAdd').on('click',function(){
    $.ajax({
        url:'/users',
        type:'post',
        data:$('#userForm').serialize(),
        success:function(res){
            userArr.push(res);
            render(userArr);
        }
    });
});

$('#avatar').on('change',function(){
    // 用户选择文件
    let formData =new FormData()
    formData.append('avatar',this.files[0]);

    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 告诉$.ajax方法不要解析请求的参数
        processData:false,
        // 告诉$.ajax不要设置请求参数类型
        contentType:false,
        success:function(response){
            // 实现头像预览功能
            $('#preview').attr('src',response[0].avatar);
            // 将图片的地址添加到表单里的隐藏域
            $('#hiddenAvatar').val(response[0].avatar)

        }
    });
});

let userId;

// 编辑用户功能
// 点击编辑事件
$('tbody').on('click','.edit',function(){
    // 保存当前被修改的这个用户的id
    userId =$(this).parent().attr('data-id');
    console.log(userId);
    
    $('#hh').text('修改用户信息');
    // 获取当面被点击的这个元素的祖先 tr
    let trObj = $(this).parents('tr');
    // 获取图片的地址
    let imgSrc =trObj.children().eq(1).children().attr('src');
    // 将图片的地址写入隐藏域
    $('#hiddenAvatar').val(imgSrc);

    // 如果imgSrc有值
    if(imgSrc){
        $('#preview').attr('src',imgSrc);

    }else{
        $('#preview').attr('src',"../assets/img/default.png");
    }
    // 将对应的内容写入到左边的输入框里
    $('#email').val(trObj.children().eq(2).text());
    $('#nickName').val(trObj.children().eq(3).text());


    let status = trObj.children().eq(4).text();
    if(status == '激活'){
        $('#jh').prop('checked',true);
    }else{
        $('#wjh').prop('checked',true);
    }

    let role = trObj.children().eq(5).text();

    
    if(role == '超级管理员'){
        $('#admin').prop('checked',true);
    }else{
        $('#normal').prop('checked',true)
    }


    $('#userAdd').hide();
    $('#userEdit').show();
});

// 完成修改用户功能
$('#userEdit').on('click',function(){
    console.log(($('#userForm').serialize()));
   
    
    // 我们需要发送ajax给服务器时 需要传ID
    $.ajax({
        type:'put',
        url:'/users/'+userId,
        data:$('#userForm').serialize(),
        success:function(res){
            // 我们只是将数据库里面的数据给修改 但是我们将userArr这个数组里的元素修改
            // 要从userArr这个数组中 将要修改的这个数组元素找出来
            let index = userArr.findIndex(item=>item._id==userId);
            // 根据这个index找到数组的这个元素 将它的数据更新
            userArr[index]=res;
            // 调用render方法 重新渲染页面
            render(userArr);

            // // 修改用户以后将表单数据还原
            // $('#userForm > h2').text('添加新用户');
            // $('#hiddenAvatar').val("");
            // $('#preview').attr('src',"../assets/img/default.png");
            // $('#userAdd').show();
            // $('#userEdit').hide();
            // $('#email').val("");
            // $('#nickName').val("");
            // $('#admin').prop('checked',false);
            // $('#normal').prop('checked',false);
            // $('#jh').prop('checked',false);
            // $('#wjh').prop('checked',false);
        }


    });
});


// 当删除按钮被点击的时候
$('#userBox').on('click','.delete',function(){
    if(confirm('您真的要删除用户吗')){
        // 如果管路员确认要删除
        let id = $(this).attr('data-id');
        console.log(id);
        
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                // 删除接口
                location.reload()
            }
        })
    }

})
let selectAll=$('#selectAll');
let deleteMany=$('#deleteMany');

// 点击全选按钮事件
selectAll.on('change',function(){
    // 获取全选按钮的状态
    let status =$(this).prop('checked');
   
    // 让所有input都跟全选按钮的状态一样
    $('#userBox').find('input').prop('checked',status);
    if(status==true){
        deleteMany.show();
     }else if(status==false){
        deleteMany.hide();
     }
});
$('#userBox').on('change','.userStatus',function(){
    // 先获取所有用户 在所有用户中过滤出选中用户
    // 判断选中用户的数量和所有用户的数量
    // 如果选中用户大于等于2 就显示批量删除按钮
    // 如果没有就隐藏起来
    let inputs =$('#userBox').find('input');
          
        if(inputs.filter(':checked').length>=2){
            deleteMany.show();
        }else{
            deleteMany.hide();
        }
});

// $('thead input').on('click',function(){
//     // 他的选中状态直接决定下面的复选框选中状态
//     // prop('参数')  获取某个元素的指定属性值
//     // prop('key',value) 向某个元素设置属性
//     //先获取上面这个复选框的checked属性值
//     let flag =$(this).prop('checked',flag);
// });

// 给复选框注册点击事件
$('tbody').on('click','input',function(){
    // 如果下面的复选框选中的个数 等于下面复选框的总个数 就表示全都选中了
    if($('tbody input').length==$('tbody input:checked').length){
        $('thead input').prop('checked',true);
    }else{
        $('thead input').prop('checked',false);
    }
});
 // 给批量删除按钮注册点击事件 
$('.btn-sm').on('click', function () {
    var ids = [];
    // 想要获取被选中的元素的id属性值 
    var checkUser = $('tbody input:checked');
    // 对checkUser对象进行遍历
    checkUser.each(function (k, v) {
      var id = v.parentNode.parentNode.children[6].getAttribute('data-id');
      ids.push(id);
    });

    // 发送ajax
    $.ajax({
      type: 'delete',
      url: '/users/' + ids.join('-'),
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
