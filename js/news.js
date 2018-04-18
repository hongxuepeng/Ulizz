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
    init:function () {
        this.pageLoad();
    }
}