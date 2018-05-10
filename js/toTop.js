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
    $(document).on('click','.my-order',function () {
        location.href="order.html";
    });
    $(document).on('click','.personal-information',function () {
        location.href="personal.html";
    });
    $(document).on('click','.message-notification',function () {
        location.href="message-notification.html";
    });
    $(document).on('click','.security-setting',function () {
        location.href="setting.html";
    });
    $(document).on('click','.my-collection',function () {
        location.href="collection.html";
    });
});