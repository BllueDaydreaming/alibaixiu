      
    // 向服务器端获取文章分类数据

$.ajax({
    url:'/categories',
    type:'get',
    success:function(response){
       let html =template('categoryTpl',{data:response});
       $('#category').html(html);
        
    }
})

// 当用户点击上传按钮的时候
$('#feature').on('change',function(){
    // 获取用户选择到的文件
    let fileData=this.files[0];
    // 创建formData对象 实现二进制文件上传
    let formData = new FormData();
    // 将管理员选择的文件追加到formData对象中
    formData.append('file',fileData);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        // 告诉$.ajax不要设置参数类型 不要处理data属性对应参数
        success:function(res){
            $('#thumbnail').val(res[0].file);
            $('#preview').attr('src',res[0].file).show()
        }
    })
});

// 当添加文章表单提交的时候
$('#pAdd').on('click',function(){
    // 获取管理员在表单中输入的内容
    // let formData=$(this).serialize();
    // 向服务器端发送请求 实现添加文章的功能
    $.ajax({
        type:'post',
        url:'/posts', //接口
        data:$('#pForm').serialize(),
        success:function(){
            // 文章添加成功 跳转到文章列表页面
            location.href ='/admin/posts.html'
        }
    })
     
 
})