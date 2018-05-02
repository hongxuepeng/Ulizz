jQuery(document).ready(function ($) {
    if ($("meta[name=toTop]").attr("content") == "true") {
        $("<div id='toTop'></div>").appendTo('body');
        // if ($(this).scrollTop() == 0) {
        //     $("#toTop").hide();
        // }
        // $(window).scroll(function (event) {
        //     /* Act on the event */
        //     if ($(this).scrollTop() == 0) {
        //         $("#toTop").hide();
        //     }
        //     if ($(this).scrollTop() != 0) {
        //         $("#toTop").show();
        //     }
        // });
        $("#toTop").click(function (event) {
            /* Act on the event */
            $("html,body").animate({
                    scrollTop: "0px"
                },
                500
            )
        });
    }
    $(".my-order").click(function () {
       location.href="order.html";
    });
    $(".personal-information").click(function () {
        location.href="personal.html";
    });
    $(".message-notification").click(function () {
        location.href="message-notification.html";
    });
    $(document).on('click','.security-setting',function () {
        location.href="setting.html";
    });
    $(document).on('click','.my-collection',function () {
        location.href="collection.html";
    });
});