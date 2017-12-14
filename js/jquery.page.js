(function ($) {
    var ms = {
        init: function (obj, args) {
            return (function () {
                ms.fillHtml(obj, args);
                ms.bindEvent(obj, args);
            })();
        },
        //填充html
        fillHtml: function (obj, args) {
            return (function () {
                obj.empty();
                //信息总数
                obj.append('<span>'+'共'+'<b>'+args.infoSize+'</b>'+'条信息'+'</span>');
                //上一页
                if (args.current > 1) {
                    obj.append('<a href="' + args.url+(args.current-1) + '" class="prevPage">上一页</a>');
                } else {
                    obj.remove('.prevPage');
                    obj.append('<span class="disabled">上一页</span>');
                }
                //中间页码
                if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
                    obj.append('<a href="' + args.url + 1 + '" class="tcdNumber">' + 1 + '</a>');
                }
                if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
                    obj.append('<span>...</span>');
                }
                var start = args.current - 2, end = args.current + 2;
                if ((start > 1 && args.current < 4) || args.current == 1) {
                    end++;
                }
                if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
                    start--;
                }
                for (; start <= end; start++) {
                    if (start <= args.pageCount && start >= 1) {
                        if (start != args.current) {
                            obj.append('<a href="' + args.url+start + '" class="tcdNumber">' + start + '</a>');
                        } else {
                            obj.append('<span class="current">' + start + '</span>');
                        }
                    }
                }
                if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
                    obj.append('<span>...</span>');
                }
                if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
                    obj.append('<a href="' + args.url + args.pageCount + '" class="tcdNumber">' + args.pageCount + '</a>');
                }
                //下一页
                if (args.current < args.pageCount) {
                    obj.append('<a href="' + args.url + (args.current + 1) + '" class="nextPage">下一页</a>');
                } else {
                    obj.remove('.nextPage');
                    obj.append('<span class="disabled">下一页</span>');
                }
                /*尾部*/
                obj.append('<span>'+'到第'+'<input type="text" class="tz" value="'+args.current+'"/>'+'页'+'</span>');
                obj.append('<span class="btn"><a href="">'+'确定'+'</a></span>');
            })();
        },
        //绑定事件
        bindEvent: function (obj, args) {
            return (function () {
                obj.on("click", "a.tcdNumber", function () {
                    var current = parseInt($(this).text());
                    ms.fillHtml(obj, {"current": current, "pageCount": args.pageCount, "url": args.url});
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current);
                    }
                });
                //上一页
                obj.on("click", "a.prevPage", function () {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, {"current": current - 1, "pageCount": args.pageCount, "url": args.url});
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current - 1);
                    }
                });
                //下一页
                obj.on("click", "a.nextPage", function () {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, {"current": current + 1, "pageCount": args.pageCount, "url": args.url});
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current + 1);
                    }
                });
                //跳转
                obj.on("click","span.btn",function(){
                    var current = parseInt($(".tz").val());
                    $(this).find("a").attr("href",args.url+current);
                    ms.fillHtml(obj, {"current": current, "pageCount": args.pageCount, "url": args.url});
                    if (typeof(args.backFn)=="function") {
                        args.backFn(current);
                    }
                });
                obj.on("keydown","input",function(){
                    if (event.keyCode == "13") {
                        $(".btn").click();
                    }
                });
            })();
        }
    };
    $.fn.createPage = function (options) {
        var args = $.extend({
            infoSize:100,//信息总数
            pageCount: 15,//总页数
            current: 1,//当前页
            url: "javascript:;",//跳转url
            backFn: function () {
            }
        }, options);
        ms.init(this, args);
    }
})(jQuery);