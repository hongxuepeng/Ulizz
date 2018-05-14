function BindUser() {
    var url= 'http://47.106.83.149:8081/api';
    $.ajax({
        url:url+'/user/info',
        type:'GET',
        async:true,//或false,是否异步,
        timeout:5000,//超时时间
        dataType:'json',
        data:{token:$.cookie('token')},
        success:function(data){
            //console.log(data)
            if(data.code=="0"){
                $(".login-group").hide();
                $(".user-content").show();
                $(".user-name").text(data.info.nickname);
            }else{
                $
            }
        },
        error:function(){
            console.log('错误')
        }
    });
}
var token=$.cookie('token');
if(token!=null && token!=undefined && token!=''){
    BindUser();
}