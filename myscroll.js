//====================================================================================================
// [插件名称] 全屏滚动简易插件
// [作者网名] webjackchen（阿飞）
// [邮    箱] webkackchen@163.com
// [QQ交流] 602071930
// [版 本 号] ver0.0.1
//====================================================================================================
(function($){
    var menuLi = $("#menu li"),
        section = $("#page .section"),
        nowIndex = 0,
        lastIndex = 0,
        winH = $(window).height(),
        canScroll = true,
        footer = $("#footer"),
        up = $("#up"),
        logo = $("#logo");
    var settings = {
        afterFnArr : [],
        leaveFnArr :[],
        start:0
    }
    $.MyScroll = function(){}
    $.MyScroll.prototype.init = function(opt){
        $.extend(settings,opt || {});
        nowIndex = settings.start;
        lastIndex = nowIndex;

        nowIndex = settings.start;
        menuLi.removeClass("active").html("");
        menuLi.eq(nowIndex).addClass("active").html(menuLi.eq(nowIndex).attr("data-text"));
        settings.afterFnArr[nowIndex]();
        section.eq(nowIndex).fadeIn(200);
        if(nowIndex != section.length-1){
            up.fadeIn(8000);
        }
        logo.animate({
            top:22,
            left:30
        },1000)
        footer.animate({bottom:0},3000);

        this.handleClick();
        this.MouseWheelHandler();
        this.handleUpClick();
    }
    var sp = $.MyScroll;
    $.MyScroll.prototype.handleClick = function(){
        var This = this;
        menuLi.on("click",function(){
            lastIndex = nowIndex;
            nowIndex = $(this).index();
            settings.leaveFnArr[lastIndex]();
            menuLi.removeClass("active").html("");
            $(this).addClass("active").html($(this).attr("data-text"));
            section.eq(lastIndex).fadeOut(1000);
            if(nowIndex == menuLi.length-1){
                up.hide();
            }else{
                up.fadeIn(2500);
            }
            section.eq(nowIndex).delay(1000).fadeIn(200,function(){
                settings.afterFnArr[nowIndex]();
            })
        })
    }

    var flag = true;
    $.MyScroll.prototype.MouseWheelHandler = function mouseWheelHandler(e){
        addEvent(document, "mousewheel", function(event) {
            if(flag){
                flag = false;
                var status = true;
                if (event.delta < 0) {
                    lastIndex = nowIndex;
                    if(nowIndex == menuLi.length-1){
                        status = false;
                    }else{
                        nowIndex ++;
                    }
                    if( status ){
                        settings.leaveFnArr[lastIndex]();
                        menuLi.removeClass("active").html("");
                        menuLi.eq(nowIndex).addClass("active").html(menuLi.eq(nowIndex).attr("data-text"));
                        section.eq(lastIndex).fadeOut(1000);
                        if(nowIndex == menuLi.length-1){
                            up.hide();
                        }else{
                            up.fadeIn(2500);
                        }
                        section.eq(nowIndex).delay(1000).fadeIn(200,function(){
                            settings.afterFnArr[nowIndex]();
                        })
                    }
                }else{
                    lastIndex = nowIndex;
                    if(nowIndex == 0){
                        status = false;
                    }else{
                        nowIndex --;
                    }
                    if( status ){
                        settings.leaveFnArr[lastIndex]();
                        menuLi.removeClass("active").html("");
                        menuLi.eq(nowIndex).addClass("active").html(menuLi.eq(nowIndex).attr("data-text"));
                        section.eq(lastIndex).fadeOut(1000);
                        if(nowIndex == menuLi.length-1){
                            up.hide();
                        }else{
                            up.fadeIn(2500);
                        }
                        section.eq(nowIndex).delay(1000).fadeIn(200,function(){
                            settings.afterFnArr[nowIndex]();
                        })
                    }
                }
                setTimeout(function () {
                    flag = true;
                }, 1000);
            }
        });
    }

    $.MyScroll.prototype.handleUpClick = function(){
        up.on("click",function(){
            var status = true;
            lastIndex = nowIndex;
            if(nowIndex == menuLi.length-1){
                status = false;
            }else{
                nowIndex ++;
            }
            if( status ){
                settings.leaveFnArr[lastIndex]();
                menuLi.removeClass("active").html("");
                menuLi.eq(nowIndex).addClass("active").html(menuLi.eq(nowIndex).attr("data-text"));
                section.eq(lastIndex).fadeOut(1000);
                if(nowIndex == menuLi.length-1){
                    up.hide();
                }else{
                    up.fadeIn(2500);
                }
                section.eq(nowIndex).delay(1000).fadeIn(200,function(){
                    settings.afterFnArr[nowIndex]();
                })
            }
        })
    }
    var addEvent = (function(window, undefined) {
        var _eventCompat = function(event) {
            var type = event.type;
            if (type == 'DOMMouseScroll' || type == 'mousewheel') {
                event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
            }
            //alert(event.delta);
            if (event.srcElement && !event.target) {
                event.target = event.srcElement;
            }
            if (!event.preventDefault && event.returnValue !== undefined) {
                event.preventDefault = function() {
                    event.returnValue = false;
                };
            }
            /*......其他一些兼容性处理 */
            return event;
        };
        if (window.addEventListener) {
            return function(el, type, fn, capture) {
                if (type === "mousewheel" && document.mozHidden !== undefined) {
                    type = "DOMMouseScroll";
                }
                el.addEventListener(type, function(event) {
                    fn.call(this, _eventCompat(event));
                }, capture || false);
            }
        } else if (window.attachEvent) {
            return function(el, type, fn, capture) {
                el.attachEvent("on" + type, function(event) {
                    event = event || window.event;
                    fn.call(el, _eventCompat(event));
                });
            }
        }
        return function() {};
    })(window);
})($)

