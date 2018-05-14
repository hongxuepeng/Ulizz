$(function () {
    var token=$.cookie('token');
    if(token == null || token == 'null' || token == undefined || token == ''){
        $(".close-img").hide();
        $("#LoginModal").modal({backdrop: 'static', keyboard: false});
    }else{
        $(".close-img").show();
    }
})