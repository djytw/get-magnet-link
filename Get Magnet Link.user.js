// ==UserScript==
// @name         Get Magnet Link
// @namespace    http://blog.djytw.tk/
// @version      1.0
// @description  在种子搜索页面上显示磁力链地址！现在支持btso.pw和www.torrentkitty.tv！
// @author       djytw
// @match        https://btso.pw/search*
// @match        https://btso.pw/tags*
// @match        https://www.torrentkitty.tv/search*
// @grant        none
// ==/UserScript==

(function() {
    switch(location.hostname){
        case "btso.pw":
            $("h3").next().remove();
            $("h3").next().remove();
            $("h3").remove();
            $(".data-list").next().remove();

            $("head").append("<style>@media (max-width: 991px){.oper{padding:0px;}}@media (min-width: 992x){.oper{padding:0 30px;}}.oper{color:#fff;margin:5px 0;font-stretch:condensed;}.oper>button{padding:0;float:left;width:33%;text-align:center;border:0;}.oper>button:nth-child(1){background:#4ce;border-radius:7px 0 0 7px;}.oper>button:nth-child(2){background:#ad7;border-radius:0;}.oper>button:nth-child(3){background:#ec7;border-radius: 0 7px 7px 0;}}</style>");
            $("head").append("<style>#sel{position:fixed;border-radius:7px 7px 0 0;background:rgba(255,255,255,0.8);z-index:999;width:75%;margin:auto;height:25%;bottom:0px;left:12.5%;padding:20px;}#seltext{border:0;background:transparent;width:100%;height:calc(100% - 30px);overflow:auto}#sel button{width:60px;margin:0 10px;border:0;background:#ec8;border-radius:7px;</style>");

            $.getScript("https://cdn.jsdelivr.net/clipboard.js/1.6.0/clipboard.min.js",function(){new Clipboard('.copybtn');});
            $("body").append('<div id="sel"><p style="float:left;margin:0">已选中的项目</p><div style="float:right;margin:0 0 5px"><button>清空</button><button class="copybtn" data-clipboard-target="#seltext">复制</button><button>关闭</button></div><div style="clear:both;height:1px;width:100%;background:#aaa;margin:0 0 5px 0;"></div><textarea id="seltext" wrap="off"></textarea></div>');
            $("footer").before('<div style="height:40px;"></div>');
            $("#sel").css("bottom","-25%");
            $(".data-list").children(".row:not('.hidden-xs')").children("a").children(".file").removeClass("col-sm-8").removeClass("col-lg-9").addClass("col-sm-6").addClass("col-lg-7");
            $(".data-list").children(".row:not('.hidden-xs')").children("a").after('<div class="col-sm-2 col-lg-2 hidden-xs text-right oper"><button>下载</button><button class="copybtn">复制</button><button>选中</button></div>');
            $(".oper>button:nth-child(1)").click(function(){
                location.href="magnet:?xt=urn:btih:"+$(this).parent().prev().attr("href").substr(-40);
            });
            $(".oper>button:nth-child(2)").mouseover(function(e){
                var str="magnet:?xt=urn:btih:"+$(this).parent().prev().attr("href").substr(-40);
                $(this).attr("data-clipboard-text",str);
            });
            $(".oper>button:nth-child(3)").click(function(){
                str="magnet:?xt=urn:btih:"+$(this).parent().prev().attr("href").substr(-40)+"\n";
                $("#sel").animate({"bottom":"0%"},'fast');
                $("#seltext").val( $("#seltext").val() + str );
            });
            $("#sel button:nth-child(1)").click(function(){
                $("#seltext").val("");
            });
            $("#sel button:nth-child(3)").click(function(){
                $("#sel").animate({"bottom":"-25%"},'fast');
            });
            break;
        case "www.torrentkitty.tv":
            $.getScript("https://cdn.jsdelivr.net/clipboard.js/1.6.0/clipboard.min.js",function(){new Clipboard('.copybtn');});
            $("#archiveResult").prev().remove();
            $("#archiveResult").prev().remove();
            $("#archiveResult").prev().remove();
            $("#archiveResult").prev().remove();
            $("#archiveResult").next().next().remove();
            $("#archiveResult tr:not(:first) .action").children(":nth-child(3)").remove();
            $("#archiveResult tr:not(:first) .action").append('<a href="#" class="copybtn">Copy</a><a href="#">Select</a>');
            $("head").append("<style>#sel{position:fixed;border-radius:7px 7px 0 0;background:rgba(255,255,255,0.8);z-index:999;width:75%;margin:auto;height:25%;bottom:0px;left:12.5%;padding:20px;}#seltext{border:0;background:transparent;width:100%;height:calc(100% - 30px);overflow:auto}#sel button{width:60px;margin:0 10px;border:0;background:#ec8;border-radius:7px;</style>");
            $("body").append('<div id="sel"><p style="float:left;margin:0">已选中的项目</p><div style="float:right;margin:0 0 5px"><button>清空</button><button class="copybtn" data-clipboard-target="#seltext">复制</button><button>关闭</button></div><div style="clear:both;height:1px;width:100%;background:#aaa;margin:0 0 5px 0;"></div><textarea id="seltext" wrap="off"></textarea></div>');
            $("#sel").css("bottom","-30%");
            $("a.copybtn").mouseover(function(){
                var str=$(this).prev().attr("href");
                $(this).attr("data-clipboard-text",str);
            });
            $("#archiveResult td a:nth-child(4)").click(function(){
                var str=$(this).prev().prev().attr("href")+"\n";
                $("#sel").animate({"bottom":"0%"},'fast');
                $("#seltext").val( $("#seltext").val() + str );
            });
            $("#sel button:nth-child(1)").click(function(){
                $("#seltext").val("");
            });
            $("#sel button:nth-child(3)").click(function(){
                $("#sel").animate({"bottom":"-30%"},'fast');
            });
            break;
    }
})();