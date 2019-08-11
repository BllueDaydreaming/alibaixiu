// 像服务器发送请求 获取文章列表数据
$.ajax({
    type:'get',
    url:'/posts',
    success:function(response){
            
        let html = template('postsTpl',response);
       
        
     
        $('#postsBox').html(html);

        let page =template('pageTpl',response);

        $('#page').html(page);
        
        
    }
    
});
// 处理日期时间格式
function formateDate(date){
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2,0)+'-' + date.getDate()
}

// 分页
function changePage(page){
    // 向服务器端发哦送请求 获取文章列表数据

    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:page
        },
        success:function(response){
            let html=template('postsTpl',response);

            $('#postsBox').html(html);

            let page =template('pageTpl',response)

        }
    })
}