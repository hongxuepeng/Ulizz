$(".change-modal-phone").click(function () {
    changeTime();
});
var waitChange=60;
function changeTime() {
    if (waitChange == 0) {
        $(".change-modal-phone").removeClass("default");
        $(".change-modal-phone").text("重新发送");
        waitChange = 60;
    } else {
        $(".change-modal-phone").addClass("default");
        $(".change-modal-phone").text( waitChange + " 秒");
        waitChange--;
        setTimeout(function () {
            changeTime();
        },1000);
    }
}
$(".change-modal-email").click(function () {
    emaliTime();
});
var emaliWait=60
function emaliTime() {
    if (emaliWait == 0) {
        $(".change-modal-email").removeClass("default");
        $(".change-modal-email").text("重新发送");
        emaliWait = 60;
    } else {
        $(".change-modal-email").addClass("default");
        $(".change-modal-email").text( emaliWait + " 秒");
        emaliWait--;
        setTimeout(function () {
            emaliTime();
        },1000);
    }
}