/**
*	
*	Communicate about cookies
*	
*	@author:	Dmitrij Waśkowski
*	@email:		dima@waskowscy.pl
*
*/

let createCookiesBox = {
	browser: '',
	domainName: '',
	cookieName: '',
	cookiesBoxCss: '',
	cookiesBoxHtml: '',
	beginCommunicate: '',
	browsersDisplay: false,
    endCommunicate: '',

	init: function(beginCommunicate, browsersDisplay = false, endCommunicate = '') {
		this.beginCommunicate = beginCommunicate;
		this.browsersDisplay = browsersDisplay;
		this.endCommunicate = endCommunicate;

		this.setDomainCookie();
		if (this.rCookie(this.cookieName+'_cookies_info')!=1) {
			let intervalCookiesBox = setInterval(
				function () {
					if (document.body != null) {
						createCookiesBox.initComunicate();
						window.clearInterval(intervalCookiesBox);
					}
				},
				1
			);
		}
	},

	initComunicate: function() {
		this.browser = this.detectBrowser() || "An unknown browser";
		
		this.cookiesBoxCss = '#cookies_box_info { border-bottom:1px solid #000; z-index:1000; position:relative; width:100%; text-align:center; margin-bottom:5px; }'
		+' #cookies_box_info .cbi-bgr { position:absolute; z-index:1; width:100%; height:100%; filter:alpha(opacity=80);opacity:0.8;-moz-opacity:0.8; -webkit-border-bottom-left-radius: 5px; -khtml-border-radius-bottomleft: 5px; -moz-border-radius-bottomleft: 5px; border-bottom-left-radius: 5px; -webkit-border-bottom-right-radius: 5px; -khtml-border-radius-bottomright: 5px; -moz-border-radius-bottomright: 5px; border-bottom-right-radius: 5px; } '
		+' #cookies_box_info .cbi-content { position:relative; z-index:10; width:100%; margin:0 auto; text-align:left; }'
		+' #cookies_box_info .cbi-content .cbic-text { position:relative; z-index:10; padding:5px 10px 10px 10px; color:#000; width:92%; font:normal 11px/14px Tahoma, Verdana, Arial; text-align:justify; }'
		+' #cookies_box_info .cbi-content .cbic-text a { font:normal 11px/14px Tahoma, Verdana, Arial; text-decoration:underline; color:#000; }'
		+' #cookies_box_info .cbi-content .cbic-text a:hover { text-decoration:none; }'
		+' #cookies_box_info .cbic-close { position:absolute; right:20px; z-index:1010; color: #000; padding:1px 6px 2px 7px; cursor:pointer; font:bold 14px Tahoma, Verdana, Arial; border-radius:5px;  -moz-border-radius:5px; -icab-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; }';
		
		this.cookiesBoxHtml  = ''
		+'<div class="cbic-close" onclick="createCookiesBox.closeCookiesBox();">x</div>'
		+'<div class="cbi-content"><div class="cbi-bgr"></div><div class="cbic-text">'
		+ this.beginCommunicate
		+ this.generateBrowsersLinks()
		+ this.endCommunicate
		+'</div></div>';
		this.insertCss();
		this.insertHtml();
	},

	setDomainCookie: function () {
		this.domainName = document.domain;
		this.domainName = this.domainName.replace(/www./,'');
		this.cookieName = this.domainName.replace(/\./gi,'_');
	},

	generateBrowsersLinks: function () {
		if (this.browsersDisplay !== true) {
			return '';
		}

		return ((this.browser=='Chrome' || this.browser=='An unknown browser') ? '<a href="http://support.google.com/chrome/bin/answer.py?hl=pl&amp;answer=95647" target="_blank">Chrome</a>, ' : 'Chrome, ')
			+((this.browser=='Firefox' || this.browser=='An unknown browser') ? '<a href="http://support.mozilla.org/pl/kb/W%C5%82%C4%85czanie%20i%20wy%C5%82%C4%85czanie%20obs%C5%82ugi%20ciasteczek" target="_blank">Firefox</a>, ' : 'Firefox, ')
			+((this.browser=='Explorer' || this.browser=='An unknown browser') ? '<a href="http://windows.microsoft.com/pl-pl/internet-explorer/change-ie-settings" target="_blank">Internet Explorer</a>, ' : 'Internet Explorer, ')
			+((this.browser=='Opera' || this.browser=='An unknown browser') ? '<a href="http://help.opera.com/Linux/12.10/pl/cookies.html" target="_blank">Opera</a> i ' : 'Opera, ')
			+((this.browser=='Safari' || this.browser=='An unknown browser') ? '<a href="http://support.apple.com/kb/ph5042" target="_blank">Safari</a>' : 'Safari');
	},
	
	insertCss: function () {
		let this_head = document.getElementsByTagName('head')[0];
		let styles = document.createElement('style');
		styles.setAttribute('type','text/css');
		if (styles.styleSheet){
			styles.styleSheet.cssText = this.cookiesBoxCss;
		} else {
			styles.appendChild(document.createTextNode(this.cookiesBoxCss));
		}
		this_head.appendChild(styles);				
	},
	
	insertHtml: function() {
		let thisBody = document.body;
		let div = document.createElement('div');
		div.id = 'cookies_box_info';
		div.innerHTML = this.cookiesBoxHtml;
		thisBody.insertBefore(div, thisBody.firstChild);
	},
	
	closeCookiesBox: function() {
		let date = new Date();
		date.setTime(date.getTime()+(1095*86400000));
		let expires = ";expires="+date.toGMTString();
		document.cookie= this.cookieName+"_cookies_info=1"+expires;
		document.cookie= this.cookieName+"_cookies_info=1"+expires+";domain=."+this.domainName+";path=/";
		let this_body = document.body;
		let div = document.getElementById('cookies_box_info');
		this_body.removeChild(div);
	},
	
	detectBrowser: function () {
		let dataBrowser = [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera",
				versionSearch: "Version"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			}
		];

		for (let i=0;i<dataBrowser.length;i++)	{
			let dataString = dataBrowser[i].string;
			let dataProp = dataBrowser[i].prop;
			if (dataString) {
				if (dataString.indexOf(dataBrowser[i].subString) != -1) {
					return dataBrowser[i].identity;
				}
			} else if (dataProp) {
				return dataBrowser[i].identity;
			}
		}
	},
	
	rCookie: function(n) { let nEQ=n+"=";let ca=document.cookie.split(';');for(let i=0;i<ca.length;i++){let c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nEQ)==0)return c.substring(nEQ.length,c.length);}return null; }
}
