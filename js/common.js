//<a href="javascript:void(0)" onclick="SetHome(this,window.location)">设为首页</a>
//<a href="javascript:void(0)" onclick="shoucang(document.title,window.location)">加入收藏</a>
// 设置为主页
function SetHome(obj,vrl){
	try{
		obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
	}
	catch(e){
		if(window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}
			catch (e) {
				alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage',vrl);
		}else{
			alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+vrl+"点击确定。");
		}
	}
}
// 加入收藏 兼容360和IE6
function shoucang(sTitle,sURL)
{
	try
	{
		window.external.addFavorite(sURL, sTitle);
	}
	catch (e)
	{
		try
		{
			window.sidebar.addPanel(sTitle, sURL, "");
		}
		catch (e)
		{
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}
function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=$("#"+name+i);
		var con=$("#con_"+name+"_"+i);
		if(i==cursel)
		{
			$(menu).addClass("hover");
			$(con).removeClass("hidden");
		}
		else
		{
			$(menu).removeClass("hover");
			$(con).addClass("hidden");
		}
	}
}
/**
 *屏幕保护代码
 * @param time 多长时间不操作，出现屏保（单位：秒）
 * @param id 屏保显示的内容
 * 850018628@qq.com
 * 2017-03-24
 */
function setScreenSaver(time,id){
	var delay = time * 1000,timer;
	function startTimer() {
		clearTimeout(timer);
		timer = setTimeout(TimerHandler, delay);
	}
	function TimerHandler() {
		document.onmousemove = function(){
			document.getElementById(id).style.display = 'none';
			startTimer();
		};//锁定后鼠标移动事件
		ShowContent();
	}
	function ShowContent() {
		document.getElementById(id).style.display = 'block';
	}
	window.onload = function () {
		window.onmousemove = startTimer;
		startTimer();
	};
}