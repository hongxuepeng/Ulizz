var Load  = function () {
    this.init();
};
Load.prototype = {
    pageLoad:function () {
        var GG = {
            "kk":function(mm){
                console.log(mm);
            }
        }
        $("#page").initPage(100,1,GG.kk);
    },
    ViewDetail:function () {
        $(".news-recommend,.news-list>li").click(function () {
           location.href="news-detail.html";
        });
    },
    init:function () {
        this.pageLoad();
        this.ViewDetail();
    }
}