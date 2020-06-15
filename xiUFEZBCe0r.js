if (self.CavalryLogger) { CavalryLogger.start_js(["8fIvJ"]); }

__d("camelize",[],(function(a,b,c,d,e,f){var g=/-(.)/g;function a(a){return a.replace(g,function(a,b){return b.toUpperCase()})}e.exports=a}),null);
__d("getOpacityStyleName",[],(function(a,b,c,d,e,f){var g=!1,h=null;function a(){if(!g){if(document.body&&"opacity"in document.body.style)h="opacity";else{var a=document.createElement("div");a.style.filter="alpha(opacity=100)";a.style.filter&&(h="filter")}g=!0}return h}e.exports=a}),null);
__d("hyphenate",[],(function(a,b,c,d,e,f){var g=/([A-Z])/g;function a(a){return a.replace(g,"-$1").toLowerCase()}e.exports=a}),null);
__d("getStyleProperty",["camelize","hyphenate"],(function(a,b,c,d,e,f){function g(a){return a==null?"":String(a)}function a(a,c){var d;if(window.getComputedStyle){d=window.getComputedStyle(a,null);if(d)return g(d.getPropertyValue(b("hyphenate")(c)))}if(document.defaultView&&document.defaultView.getComputedStyle){d=document.defaultView.getComputedStyle(a,null);if(d)return g(d.getPropertyValue(b("hyphenate")(c)));if(c==="display")return"none"}return a.currentStyle?c==="float"?g(a.currentStyle.cssFloat||a.currentStyle.styleFloat):g(a.currentStyle[b("camelize")(c)]):g(a.style&&a.style[b("camelize")(c)])}e.exports=a}),null);
__d("StyleCore",["invariant","camelize","containsNode","ex","getOpacityStyleName","getStyleProperty","hyphenate"],(function(a,b,c,d,e,f,g){function h(a,b){a=n.get(a,b);return a==="auto"||a==="scroll"}var i=new RegExp("\\s*([^\\s:]+)\\s*:\\s*([^;('\"]*(?:(?:\\([^)]*\\)|\"[^\"]*\"|'[^']*')[^;(?:'\"]*)*)(?:;|$)","g");function j(a){var b={};a.replace(i,function(a,c,d){b[c]=d;return d});return b}function k(a){var b="";for(var c in a)a[c]&&(b+=c+":"+a[c]+";");return b}function l(a){return a!==""?"alpha(opacity="+a*100+")":""}function m(a,c,d){switch(b("hyphenate")(c)){case"font-weight":case"line-height":case"opacity":case"z-index":case"animation-iteration-count":case"-webkit-animation-iteration-count":break;case"width":case"height":var e=parseInt(d,10)<0;e&&g(0,826,a,c,d);default:isNaN(d)||!d||d==="0"||g(0,827,a,c,d,d+"px");break}}var n={set:function(a,c,d){m("Style.set",c,d);if(a==null)return;a=a.style;switch(c){case"opacity":b("getOpacityStyleName")()==="filter"?a.filter=l(d):a.opacity=d;break;case"float":a.cssFloat=a.styleFloat=d||"";break;default:try{a[b("camelize")(c)]=d}catch(a){throw new Error(b("ex")('Style.set: "%s" argument is invalid: %s',c,d))}}},apply:function(a,c){var d;for(d in c)m("Style.apply",d,c[d]);"opacity"in c&&b("getOpacityStyleName")()==="filter"&&(c.filter=l(c.opacity),delete c.opacity);var e=j(a.style.cssText);for(d in c){var f=c[d];delete c[d];var g=b("hyphenate")(d);for(var h in e)(h===g||h.indexOf(g+"-")===0)&&delete e[h];c[g]=f}Object.assign(e,c);a.style.cssText=k(e)},get:b("getStyleProperty"),getFloat:function(a,b){return parseFloat(n.get(a,b),10)},getOpacity:function(a){if(b("getOpacityStyleName")()==="filter"){var c=n.get(a,"filter");if(c){c=/(\d+(?:\.\d+)?)/.exec(c);if(c)return parseFloat(c.pop())/100}}return n.getFloat(a,"opacity")||1},isFixed:function(a){while(b("containsNode")(document.body,a)){if(n.get(a,"position")==="fixed")return!0;a=a.parentNode}return!1},getScrollParent:function(a){if(!a)return null;while(a&&a!==document.body){if(h(a,"overflow")||h(a,"overflowY")||h(a,"overflowX"))return a;a=a.parentNode}return window}};e.exports=n}),null);
__d("Style",["StyleCore","$"],(function(a,b,c,d,e,f){a=babelHelpers["extends"]({},b("StyleCore"),{get:function(a,c){typeof a==="string"&&(a=b("$")(a));return b("StyleCore").get(a,c)},getFloat:function(a,c){typeof a==="string"&&(a=b("$")(a));return b("StyleCore").getFloat(a,c)}});e.exports=a}),null);
__d("DOMDimensions",["Style","getDocumentScrollElement"],(function(a,b,c,d,e,f){"use strict";a={getElementDimensions:function(a){var b=a?a.offsetHeight:0;a=a?a.offsetWidth:0;return{height:b,width:a}},getDocumentDimensions:function(a){a=b("getDocumentScrollElement")(a);var c=a.scrollWidth||0;a=a.scrollHeight||0;return{width:c,height:a}},measureElementBox:function(a,c,d,e,f){var g;switch(c){case"left":case"right":case"top":case"bottom":g=[c];break;case"width":g=["left","right"];break;case"height":g=["top","bottom"];break;default:throw Error("Invalid plane: "+c)}c=function(c,d){var e=0;for(var f=0;f<g.length;f++)e+=parseFloat(b("Style").get(a,c+"-"+g[f]+d))||0;return e};return(d?c("padding",""):0)+(e?c("border","-width"):0)+(f?c("margin",""):0)}};e.exports=a}),null);
__d("Log",[],(function(a,b,c,d,e,f){"use strict";a={DEBUG:3,INFO:2,WARNING:1,ERROR:0};b=function(a,b,c){for(var d=arguments.length,e=new Array(d>3?d-3:0),f=3;f<d;f++)e[f-3]=arguments[f];var h=0,i=c.replace(/%s/g,function(){return String(e[h++])}),j=window.console;j&&g.level>=b&&j[a in j?a:"log"](i)};var g={level:-1,Level:a,debug:b.bind(null,"debug",a.DEBUG),info:b.bind(null,"info",a.INFO),warn:b.bind(null,"warn",a.WARNING),error:b.bind(null,"error",a.ERROR),log:b};e.exports=g}),null);
__d("Queue",[],(function(a,b,c,d,e,f){var g={};a=function(){"use strict";function a(a){this._timeout=null,this._interval=(a==null?void 0:a.interval)||0,this._processor=a==null?void 0:a.processor,this._queue=[],this._stopped=!0}var b=a.prototype;b._dispatch=function(a){var b=this;a===void 0;if(this._stopped||this._queue.length===0)return;a=this._processor;if(a==null){this._stopped=!0;throw new Error("No processor available")}var c=this._interval;if(c!=null)a.call(this,this._queue.shift()),this._timeout=setTimeout(function(){return b._dispatch()},c);else while(this._queue.length)a.call(this,this._queue.shift())};b.enqueue=function(a){this._processor&&!this._stopped?this._processor(a):this._queue.push(a);return this};b.start=function(a){a&&(this._processor=a);this._stopped=!1;this._dispatch();return this};b.isStarted=function(){return!this._stopped};b.dispatch=function(){this._dispatch(!0)};b.stop=function(a){this._stopped=!0;a&&this._timeout!=null&&clearTimeout(this._timeout);return this};b.merge=function(a,b){if(b){(b=this._queue).unshift.apply(b,a._queue)}else{(b=this._queue).push.apply(b,a._queue)}a._queue=[];this._dispatch();return this};b.getLength=function(){return this._queue.length};a.get=function(b,c){var d;b in g?d=g[b]:d=g[b]=new a(c);return d};a.exists=function(a){return a in g};a.remove=function(a){return delete g[a]};return a}();e.exports=a}),null);
__d("resolveWindow",[],(function(a,b,c,d,e,f){function a(a){if(a==null)return null;var b=window;a=a.split(".");try{for(var c=0;c<a.length;c++){var d=a[c],e=/^frames\[[\'\"]?([a-zA-Z0-9\-_]+)[\'\"]?\]$/.exec(d);if(e)b=b.frames[e[1]];else if(d==="opener"||d==="parent"||d==="top")b=b[d];else return null}}catch(a){return null}return b}e.exports=a}),null);
__d("QueryString",[],(function(a,b,c,d,e,f){function a(a){var b=[];Object.keys(a).sort().forEach(function(c){var d=a[c];if(d===void 0)return;if(d===null){b.push(c);return}b.push(encodeURIComponent(c)+"="+encodeURIComponent(d))});return b.join("&")}function b(a,b){b===void 0&&(b=!1);var c={};if(a==="")return c;a=a.split("&");for(var d=0;d<a.length;d++){var e=a[d].split("=",2),f=decodeURIComponent(e[0]);if(b&&Object.prototype.hasOwnProperty.call(c,f))throw new URIError("Duplicate key: "+f);c[f]=e.length===2?decodeURIComponent(e[1]):null}return c}function c(a,b){return a+(a.indexOf("?")!==-1?"&":"?")+(typeof b==="string"?b:g.encode(b))}var g={encode:a,decode:b,appendToUrl:c};e.exports=g}),null);
__d("ObservableMixin",[],(function(a,b,c,d,e,f){function a(){this.__observableEvents={}}a.prototype={inform:function(a){var b=Array.prototype.slice.call(arguments,1),c=Array.prototype.slice.call(this.getSubscribers(a));for(var d=0;d<c.length;d++){if(c[d]===null)continue;try{c[d].apply(this,b)}catch(a){window.setTimeout(function(){throw a},0)}}return this},getSubscribers:function(a){return this.__observableEvents[a]||(this.__observableEvents[a]=[])},clearSubscribers:function(a){a&&(this.__observableEvents[a]=[]);return this},subscribe:function(a,b){a=this.getSubscribers(a);a.push(b);return this},unsubscribe:function(a,b){a=this.getSubscribers(a);for(var c=0;c<a.length;c++)if(a[c]===b){a.splice(c,1);break}return this}};e.exports=a}),null);
__d("ManagedError",[],(function(a,b,c,d,e,f){a=function(a){"use strict";babelHelpers.inheritsLoose(b,a);function b(b,c){var d;d=a.call(this,b!==null&&b!==void 0?b:"")||this;b!==null&&b!==void 0?d.message=b:d.message="";d.innerError=c;return d}return b}(babelHelpers.wrapNativeSuper(Error));e.exports=a}),null);
__d("AssertionError",["ManagedError"],(function(a,b,c,d,e,f){a=function(a){"use strict";babelHelpers.inheritsLoose(b,a);function b(b){return a.call(this,b)||this}return b}(b("ManagedError"));e.exports=a}),null);
__d("Assert",["AssertionError","sprintf"],(function(a,b,c,d,e,f){function g(a,c){if(typeof a!=="boolean"||!a)throw new(b("AssertionError"))(c);return a}function h(a,c,d){var e;if(c===void 0)e="undefined";else if(c===null)e="null";else{var f=Object.prototype.toString.call(c);e=/\s(\w*)/.exec(f)[1].toLowerCase()}g(a.indexOf(e)!==-1,d||b("sprintf")("Expression is of type %s, not %s",e,a));return c}function a(a,b,c){g(b instanceof a,c||"Expression not instance of type");return b}function i(a,b){j["is"+a]=b,j["maybe"+a]=function(a,c){a!=null&&b(a,c)}}var j={isInstanceOf:a,isTrue:g,isTruthy:function(a,b){return g(!!a,b)},type:h,define:function(a,b){a=a.substring(0,1).toUpperCase()+a.substring(1).toLowerCase(),i(a,function(a,c){g(b(a),c)})}};["Array","Boolean","Date","Function","Null","Number","Object","Regexp","String","Undefined"].forEach(function(a){i(a,h.bind(null,a.toLowerCase()))});e.exports=j}),null);
__d("Type",["Assert"],(function(a,b,c,d,e,f){function g(){var a=this.__mixins;if(a)for(var b=0;b<a.length;b++)a[b].apply(this,arguments)}function h(a,b){if(b instanceof a)return!0;if(b instanceof g)for(var c=0;c<b.__mixins.length;c++)if(b.__mixins[c]==a)return!0;return!1}function i(a,b){var c=a.prototype;Array.isArray(b)||(b=[b]);for(var a=0;a<b.length;a++){var d=b[a];typeof d==="function"&&(c.__mixins.push(d),d=d.prototype);Object.keys(d).forEach(function(a){c[a]=d[a]})}}function j(a,c,d){var e=c&&Object.prototype.hasOwnProperty.call(c,"constructor")?c.constructor:function(){this.parent.apply(this,arguments)};b("Assert").isFunction(e);if(a&&a.prototype instanceof g===!1)throw new Error("parent type does not inherit from Type");a=a||g;function f(){}f.prototype=a.prototype;e.prototype=new f();c&&Object.assign(e.prototype,c);e.prototype.constructor=e;e.parent=a;e.prototype.__mixins=a.prototype.__mixins?Array.prototype.slice.call(a.prototype.__mixins):[];d&&i(e,d);e.prototype.parent=function(){this.parent=a.prototype.parent,a.apply(this,arguments)};e.prototype.parentCall=function(b){return a.prototype[b].apply(this,Array.prototype.slice.call(arguments,1))};e.extend=function(a,b){return j(this,a,b)};return e}Object.assign(g.prototype,{instanceOf:function(a){return h(a,this)}});Object.assign(g,{extend:function(a,b){return typeof a==="function"?j.apply(null,arguments):j(null,a,b)},instanceOf:h});e.exports=g}),null);
__d("sdk.Model",["ObservableMixin","Type"],(function(a,b,c,d,e,f){"use strict";a=b("Type").extend({constructor:function(a){this.parent();var b={},c=this;Object.keys(a).forEach(function(d){b[d]=a[d],c["set"+d]=function(a){if(a===b[d])return c;b[d]=a;c.inform(d+".change",a);return c},c["get"+d]=function(){return b[d]}})}},b("ObservableMixin"));e.exports=a}),null);
__d("sdk.Runtime",["JSSDKRuntimeConfig","sdk.Model"],(function(a,b,c,d,e,f){var g={UNKNOWN:0,PAGETAB:1,CANVAS:2,PLATFORM:4},h=new(b("sdk.Model"))({AccessToken:"",AutoLogAppEvents:!1,ClientID:"",CookieUserID:"",EnforceHttps:!1,Environment:g.UNKNOWN,GraphDomain:"",Initialized:!1,IsVersioned:!1,KidDirectedSite:void 0,Locale:(a=b("JSSDKRuntimeConfig")).locale,LoggedIntoFacebook:void 0,LoginStatus:void 0,Revision:a.revision,Rtl:a.rtl,Scope:void 0,SDKAB:a.sdkab,SDKUrl:a.sdkurl,SDKNS:a.sdkns,UseCookie:!1,UseLocalStorage:!0,UserID:"",Version:void 0});Object.assign(h,{ENVIRONMENTS:g,isEnvironment:function(a){var b=this.getEnvironment();return(a|b)===b},isCanvasEnvironment:function(){return this.isEnvironment(g.CANVAS)||this.isEnvironment(g.PAGETAB)}});(function(){var a=/app_runner/.test(window.name)?g.PAGETAB:/iframe_canvas/.test(window.name)?g.CANVAS:g.UNKNOWN;(a|g.PAGETAB)===a&&(a|=g.CANVAS);h.setEnvironment(a)})();e.exports=h}),null);
__d("UrlMap",["invariant","UrlMapConfig","sdk.Runtime"],(function(a,b,c,d,e,f,g){a={resolve:function(a){var c="https";if(a==="graph_domain"){var d=b("sdk.Runtime").getGraphDomain();d?a="graph_".concat(d):a="graph"}if(a in b("UrlMapConfig"))return c+"://"+b("UrlMapConfig")[a];a in b("UrlMapConfig")||g(0,2511,a);return""}};e.exports=a}),null);
__d("sdk.Scribe",["QueryString","UrlMap","sdk.Runtime"],(function(a,b,c,d,e,f){function a(a,c){if(c.extra!=null&&typeof c.extra==="object"){var d=c.extra;d.revision=b("sdk.Runtime").getRevision()}new Image().src=b("QueryString").appendToUrl(b("UrlMap").resolve("www")+"/common/scribe_endpoint.php",{c:a,m:JSON.stringify(c)})}c={log:a};e.exports=c}),null);
__d("XD",["Arbiter","DOM","DOMDimensions","Log","PHPQuerySerializer","Queue","URI","isFacebookURI","isInIframe","resolveWindow","sdk.Scribe"],(function(a,b,c,d,e,f){var g,h,i={_callbacks:[],_opts:{autoResize:!1,allowShrink:!0,channelUrl:null,hideOverflow:!1,resizeTimeout:1e3,resizeWidth:!1},_lastResizeAckId:0,_resizeCount:0,_resizeTimestamp:0,_shrinker:null,_forcedMinWidth:100,init:function(a){this._opts=babelHelpers["extends"]({},this._opts,a),this._opts.autoResize&&this._startResizeMonitor(),b("Arbiter").subscribe("Connect.Unsafe.resize.ack",function(a,b){b.id||(b.id=this._resizeCount),b.id>this._lastResizeAckId&&(this._lastResizeAckId=b.id)}.bind(this))},getQueue:function(){this._queue||(this._queue=new(b("Queue"))());return this._queue},setChannelUrl:function(a){var b=this;this.getQueue().start(function(c){return b.send(c,a)})},send:function(a,c){a===void 0&&(a=null);c===void 0&&(c=null);c=c||this._opts.channelUrl;if(!c){this.getQueue().enqueue(a);return}var d={};c=new(g||(g=b("URI")))(c);Object.assign(d,a,(h||(h=b("PHPQuerySerializer"))).deserialize(c.getFragment()));c=new g(d.origin);if(c.getDomain()===""){b("Log").error("No valid domain for XD message target.");return}var e=c.getOrigin();if(typeof d.relation!=="string"){b("Log").error("No relation specified to resolve XD target window.");return}var f=b("resolveWindow")(d.relation.replace(/^parent\./,"")),i=1;c=function c(){try{f.postMessage((h||(h=b("PHPQuerySerializer"))).serialize(d),e)}catch(d){--i?window.setTimeout(c,200):b("sdk.Scribe").log("jssdk_error",{error:"POST_MESSAGE",extra:{message:d.message+", html/js/modules/XD.js:139",ancestor_origins:JSON.stringify(location.ancestorOrigins),referrer:document.referrer,data:a}})}};c()},_computeSize:function(){var a=b("DOMDimensions").getDocumentDimensions(),c=0;if(this._opts.resizeWidth){var d=document.body;if(d!=null){if(d.clientWidth<d.scrollWidth)c=a.width;else{d=d.lastElementChild;if(d!=null&&d instanceof HTMLElement){d=d;d=d.offsetLeft+d.offsetWidth;d>c&&(c=d)}}c=Math.max(c,i._forcedMinWidth)}else c=i._forcedMinWidth}a.width=c;this._opts.allowShrink&&(this._shrinker||(this._shrinker=b("DOM").create("div")),b("DOM").appendContent(document.body,this._shrinker),a.height=Math.max(this._shrinker.offsetTop,0));return a},_startResizeMonitor:function(){var a,c;a=(a=document.documentElement)!=null?a:{};if(this._opts.hideOverflow){a.style.overflow="hidden";((a=document.body)!=null?a:{}).style.overflow="hidden"}a=function(){var a=this._computeSize(),d=Date.now();if(!c||this._opts.allowShrink&&c.width!=a.width||!this._opts.allowShrink&&c.width<a.width||this._opts.allowShrink&&c.height!=a.height||!this._opts.allowShrink&&c.height<a.height){c=a;this._resizeCount++;this._resizeTimestamp=d;d={type:"resize",height:a.height,ackData:{id:this._resizeCount},width:0};a.width&&a.width!=0&&(d.width=a.width);try{if(b("isFacebookURI")(new(g||(g=b("URI")))(document.referrer))&&b("isInIframe")()&&window.name&&window.parent.location&&window.parent.location.toString&&b("isFacebookURI")(new(g||(g=b("URI")))(window.parent.location))){a=window.parent.document.getElementsByTagName("iframe");for(var e=0;e<a.length;e++)a[e].name==window.name&&(this._opts.resizeWidth&&(a[e].style.width=d.width+"px"),a[e].style.height=d.height+"px")}this.send(d)}catch(a){this.send(d)}}}.bind(this);a();window.setInterval(a,this._opts.resizeTimeout)}};c=babelHelpers["extends"]({},i);e.exports.UnverifiedXD=c;e.exports.XD=i;a.UnverifiedXD=c;a.XD=i}),null);
__d("UnverifiedXD",["XD"],(function(a,b,c,d,e,f){a=b("XD").UnverifiedXD;e.exports=a}),null);
__d("Banzai",["requireCond","cr:1454227"],(function(a,b,c,d,e,f){e.exports=b("cr:1454227")}),null);
__d("BanzaiODS",["invariant","Banzai","Random","gkx"],(function(a,b,c,d,e,f,g){a=function(){"use strict";function a(){this.$1={},this.$2={}}var c=a.prototype;c.setEntitySample=function(a,c){this.$2[a]=b("Random").random()<c?c:0};c.bumpEntityKey=function(a,b,c,d){d===void 0&&(d=1),this.$3(a,b,c,d)};c.bumpFraction=function(a,b,c,d,e){d===void 0&&(d=1),e===void 0&&(e=1),this.$3(a,b,c,d,e)};c.flush=function(a){if(Object.keys(this.$1).length===0)return;b("Banzai").post("categorized_ods",this.$1,a);this.$1={}};c.create=function(){return new a()};c.$3=function(a,b,c,d,e){var f;d===void 0&&(d=1);e===void 0&&(e=1);var g=(f=this.$2[b])!=null?f:null;if(g!=null&&g<=0)return;var h=this.$1[a]||(this.$1[a]={}),i=h[b]||(h[b]={}),j=i[c]||(i[c]=[0]);d=Number(d);e=Number(e);g>0&&(d/=g,e/=g);if(!isFinite(d)||!isFinite(e))return;j[0]+=d;arguments.length>=5&&(j[1]||(j[1]=0),j[1]+=e)};return a}();var h=new a();b("Banzai").subscribe(b("Banzai").SEND,function(){return h.flush()});e.exports=h}),null);
__d("BanzaiScuba",["Banzai","FBLogger"],(function(a,b,c,d,e,f){var g="scuba_sample";a=function(){"use strict";function a(a,c,d){this.posted=!1,a||b("FBLogger")("BanzaiScuba").warn("Can't post a sample without a dataset"),this.dataset=a,this.$1=c,this.options=d}var c=a.prototype;c.$2=function(a,c,d){if(this.posted){b("FBLogger")("BanzaiScuba").warn("Trying to add to an already posted sample");return a}a=a||{};a[c]=d;return a};c.addNormal=function(a,b){this.normal=this.$2(this.normal,a,b);return this};c.addInteger=function(a,b){this["int"]=this.$2(this["int"],a,b);return this};c.addDenorm=function(a,b){this.denorm=this.$2(this.denorm,a,b);return this};c.addTagSet=function(a,b){this.tags=this.$2(this.tags,a,b);return this};c.addNormVector=function(a,b){this.normvector=this.$2(this.normvector,a,b);return this};c.post=function(a){if(this.posted){b("FBLogger")("BanzaiScuba").warn("Trying to re-post");return}if(!this.dataset)return;var c={};c._ds=this.dataset;c._options=this.options;this.normal&&(c.normal=this.normal);this["int"]&&(c["int"]=this["int"]);this.denorm&&(c.denorm=this.denorm);this.tags&&(c.tags=this.tags);this.normvector&&(c.normvector=this.normvector);this.$1!==null&&this.$1!==""&&this.$1!==void 0&&(c._lid=this.$1);b("Banzai").post(g,c,a);this.posted=!0};return a}();e.exports=a}),null);
__d("Deferred",["Promise"],(function(a,b,c,d,e,f){"use strict";b("Promise").resolve();a=function(){function a(a){var c=this;a=a||b("Promise");this.$1=!1;this.$2=new a(function(a,b){c.$3=a,c.$4=b})}var c=a.prototype;c.getPromise=function(){return this.$2};c.resolve=function(a){this.$1=!0,this.$3(a)};c.reject=function(a){this.$1=!0,this.$4(a)};c.isSettled=function(){return this.$1};return a}();e.exports=a}),null);
__d("StrSet",[],(function(a,b,c,d,e,f){a=function(){"use strict";function a(a){this.$2={},this.$1=0,a&&this.addAll(a)}var b=a.prototype;b.add=function(a){Object.prototype.hasOwnProperty.call(this.$2,a)||(this.$2[a]=!0,this.$1++);return this};b.addAll=function(a){a.forEach(this.add,this);return this};b.remove=function(a){Object.prototype.hasOwnProperty.call(this.$2,a)&&(delete this.$2[a],this.$1--);return this};b.removeAll=function(a){a.forEach(this.remove,this);return this};b.toArray=function(){return Object.keys(this.$2)};b.toMap=function(a){var b={};Object.keys(this.$2).forEach(function(c){b[c]=typeof a==="function"?a(c):a||!0});return b};b.contains=function(a){return Object.prototype.hasOwnProperty.call(this.$2,a)};b.count=function(){return this.$1};b.clear=function(){this.$2={};this.$1=0;return this};b.clone=function(){return new a(this)};b.forEach=function(a,b){Object.keys(this.$2).forEach(a,b)};b.map=function(a,b){return Object.keys(this.$2).map(a,b)};b.some=function(a,b){return Object.keys(this.$2).some(a,b)};b.every=function(a,b){return Object.keys(this.$2).every(a,b)};b.filter=function(b,c){return new a(Object.keys(this.$2).filter(b,c))};b.union=function(a){return this.clone().addAll(a)};b.intersect=function(a){return this.filter(function(b){return a.contains(b)})};b.difference=function(a){var b=this;return a.filter(function(a){return!b.contains(a)})};b.equals=function(a){var b=function(a,b){return a===b?0:a<b?-1:1},c=this.toArray();a=a.toArray();if(c.length!==a.length)return!1;var d=c.length;c=c.sort(b);a=a.sort(b);while(d--)if(c[d]!==a[d])return!1;return!0};return a}();e.exports=a}),null);
__d("getVendorPrefixedName",["invariant","ExecutionEnvironment","UserAgent","camelize"],(function(a,b,c,d,e,f,g){var h={},i=["Webkit","ms","Moz","O"],j=new RegExp("^("+i.join("|")+")"),k=b("ExecutionEnvironment").canUseDOM?document.createElement("div").style:{};function l(a){for(var b=0;b<i.length;b++){var c=i[b]+a;if(c in k)return c}return null}function m(a){switch(a){case"lineClamp":return b("UserAgent").isEngine("WebKit >= 315.14.2")?"WebkitLineClamp":null;default:return null}}function a(a){var c=b("camelize")(a);if(h[c]===void 0){var d=c.charAt(0).toUpperCase()+c.slice(1);j.test(d)&&g(0,957,a);b("ExecutionEnvironment").canUseDOM?h[c]=c in k?c:l(d):h[c]=m(c)}return h[c]}e.exports=a}),null);
__d("shield",[],(function(a,b,c,d,e,f){function a(a,b){for(var c=arguments.length,d=new Array(c>2?c-2:0),e=2;e<c;e++)d[e-2]=arguments[e];if(typeof a!=="function")throw new TypeError("shield expects a function as the first argument");return function(){return a.apply(b,d)}}e.exports=a}),null);
__d("BrowserSupportCore",["getVendorPrefixedName"],(function(a,b,c,d,e,f){a={hasCSSAnimations:function(){return!!b("getVendorPrefixedName")("animationName")},hasCSSTransforms:function(){return!!b("getVendorPrefixedName")("transform")},hasCSS3DTransforms:function(){return!!b("getVendorPrefixedName")("perspective")},hasCSSTransitions:function(){return!!b("getVendorPrefixedName")("transition")}};e.exports=a}),null);
__d("BrowserSupport",["BrowserSupportCore","ExecutionEnvironment","UserAgent_DEPRECATED","getVendorPrefixedName","memoize"],(function(a,b,c,d,e,f){var g=null;function h(){if(b("ExecutionEnvironment").canUseDOM){g||(g=document.createElement("div"));return g}return null}c=function(a){return b("memoize")(function(){var b=h();return!b?!1:a(b)})};d={hasCSSAnimations:(d=b("BrowserSupportCore")).hasCSSAnimations,hasCSSTransforms:d.hasCSSTransforms,hasCSS3DTransforms:d.hasCSS3DTransforms,hasCSSTransitions:d.hasCSSTransitions,hasPositionSticky:c(function(a){a.style.cssText="position:-moz-sticky;position:-webkit-sticky;position:-o-sticky;position:-ms-sticky;position:sticky;";return/sticky/.test(a.style.position)}),hasScrollSnapPoints:c(function(a){return"scrollSnapType"in a.style||"webkitScrollSnapType"in a.style||"msScrollSnapType"in a.style}),hasScrollBehavior:c(function(a){return"scrollBehavior"in a.style}),hasPointerEvents:c(function(a){if(!("pointerEvents"in a.style))return!1;a.style.cssText="pointer-events:auto";return a.style.pointerEvents==="auto"}),hasFileAPI:(f=b("memoize"))(function(){return!(b("UserAgent_DEPRECATED").webkit()&&!b("UserAgent_DEPRECATED").chrome()&&b("UserAgent_DEPRECATED").windows())&&"FileList"in window&&"FormData"in window}),hasBlobFactory:f(function(){return!!a.blob}),hasSVGForeignObject:f(function(){return b("ExecutionEnvironment").canUseDOM&&document.createElementNS&&document.createElementNS("http://www.w3.org/2000/svg","foreignObject").toString().includes("SVGForeignObject")}),hasMutationObserver:f(function(){return!!window.MutationObserver}),getTransitionEndEvent:f(function(){var a={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"mozTransitionEnd",OTransition:"oTransitionEnd"},c=b("getVendorPrefixedName")("transition");return a[c]||null}),hasCanvasRenderingContext2D:function(){return!!window.CanvasRenderingContext2D}};e.exports=d}),null);
__d("requestAnimationFrame",["TimerStorage","TimeSlice","requestAnimationFrameAcrossTransitions"],(function(a,b,c,d,e,f){function a(a,c){function d(c){b("TimerStorage").unset(b("TimerStorage").ANIMATION_FRAME,e),a(c)}b("TimeSlice").copyGuardForWrapper(a,d);d.__originalCallback=a;var e=b("requestAnimationFrameAcrossTransitions")(d,c);b("TimerStorage").set(b("TimerStorage").ANIMATION_FRAME,e);return e}e.exports=a}),null);
__d("PlatformVersioning",["invariant","PlatformVersions","StrSet","getObjectValues"],(function(a,b,c,d,e,f,g){var h=new(b("StrSet"))(b("getObjectValues")(b("PlatformVersions").versions)),i=location.pathname;i=i.substring(1,i.indexOf("/",1));var j=h.contains(i)?i:b("PlatformVersions").versions.UNVERSIONED;function k(a,c){if(c==b("PlatformVersions").versions.UNVERSIONED)return a;h.contains(c)||g(0,3769);a=a.indexOf("/")!==0?"/"+a:a;return"/"+c+a}function a(){return b("PlatformVersions").LATEST}function c(a){return a.setPath(k(a.getPath(),j))}function d(a){return k(a,j)}function f(a){return h.contains(a.substring(1,a.indexOf("/",1)))?a.substring(a.indexOf("/",1)):a}i={addVersionToPath:k,getLatestVersion:a,versionAwareURI:c,versionAwarePath:d,getUnversionedPath:f};e.exports=i}),null);
__d("PlatformWidgetEndpoint",["PlatformVersioning"],(function(a,b,c,d,e,f){function a(a,c){return b("PlatformVersioning").versionAwarePath("/dialog/"+a+(c?"/"+c:""))}function c(a,c){return b("PlatformVersioning").versionAwarePath("/plugins/"+a+(c?"/"+c:""))}function d(a){return/^\/plugins\//.test(b("PlatformVersioning").getUnversionedPath(a))}function f(a){return/^\/dialog\//.test(b("PlatformVersioning").getUnversionedPath(a))}a={dialog:a,plugins:c,isPluginEndpoint:d,isDialogEndpoint:f};e.exports=a}),null);
__d("getCrossOriginTransport",["invariant","ExecutionEnvironment","ex"],(function(a,b,c,d,e,f,g){function h(){if(!b("ExecutionEnvironment").canUseDOM)throw new Error(b("ex")("getCrossOriginTransport: %s","Cross origin transport unavailable in the server environment."));try{var a=new XMLHttpRequest();!("withCredentials"in a)&&typeof XDomainRequest!=="undefined"&&(a=new XDomainRequest());return a}catch(a){throw new Error(b("ex")("getCrossOriginTransport: %s",a.message))}}h.withCredentials=function(){var a=h();"withCredentials"in a||g(0,5150);var b=a.open;a.open=function(){b.apply(this,arguments),this.withCredentials=!0};return a};e.exports=h}),null);
__d("ZeroRewrites",["URI","ZeroRewriteRules","getCrossOriginTransport","getSameOriginTransport","isFacebookURI"],(function(a,b,c,d,e,f){var g,h={rewriteURI:function(a){if(!b("isFacebookURI")(a)||h._isWhitelisted(a))return a;var c=h._getRewrittenSubdomain(a);c!==null&&c!==void 0&&(a=a.setSubdomain(c));return a},getTransportBuilderForURI:function(a){return h.isRewritten(a)?b("getCrossOriginTransport").withCredentials:b("getSameOriginTransport")},isRewriteSafe:function(a){if(Object.keys(b("ZeroRewriteRules").rewrite_rules).length===0||!b("isFacebookURI")(a))return!1;var c=h._getCurrentURI().getDomain(),d=new(g||(g=b("URI")))(a).qualify().getDomain();return c===d||h.isRewritten(a)},isRewritten:function(a){a=a.getQualifiedURI();if(Object.keys(b("ZeroRewriteRules").rewrite_rules).length===0||!b("isFacebookURI")(a)||h._isWhitelisted(a))return!1;var c=a.getSubdomain(),d=h._getCurrentURI(),e=h._getRewrittenSubdomain(d);return a.getDomain()!==d.getDomain()&&c===e},_isWhitelisted:function(a){a=a.getPath();a.endsWith("/")||(a+="/");return b("ZeroRewriteRules").whitelist&&b("ZeroRewriteRules").whitelist[a]===1},_getRewrittenSubdomain:function(a){a=a.getQualifiedURI().getSubdomain();return b("ZeroRewriteRules").rewrite_rules[a]},_getCurrentURI:function(){return new(g||(g=b("URI")))("/").qualify()}};e.exports=h}),null);
__d("getAsyncHeaders",["ZeroCategoryHeader","isFacebookURI"],(function(a,b,c,d,e,f){function a(a){var c={};b("isFacebookURI")(a)&&b("ZeroCategoryHeader").value&&(c[b("ZeroCategoryHeader").header]=b("ZeroCategoryHeader").value);return c}e.exports=a}),null);
__d("regeneratorRuntime",["Promise"],(function(a,b,c,d,e,f){"use strict";var g=Object.prototype.hasOwnProperty,h=typeof Symbol==="function"&&(typeof Symbol==="function"?Symbol.iterator:"@@iterator")||"@@iterator",i=e.exports;function j(a,b,c,d){b=Object.create((b||q).prototype);d=new z(d||[]);b._invoke=w(a,c,d);return b}i.wrap=j;function k(a,b,c){try{return{type:"normal",arg:a.call(b,c)}}catch(a){return{type:"throw",arg:a}}}var l="suspendedStart",m="suspendedYield",n="executing",o="completed",p={};function q(){}function r(){}function s(){}var t=s.prototype=q.prototype;r.prototype=t.constructor=s;s.constructor=r;r.displayName="GeneratorFunction";function a(a){["next","throw","return"].forEach(function(b){a[b]=function(a){return this._invoke(b,a)}})}i.isGeneratorFunction=function(a){a=typeof a==="function"&&a.constructor;return a?a===r||(a.displayName||a.name)==="GeneratorFunction":!1};i.mark=function(a){Object.setPrototypeOf?Object.setPrototypeOf(a,s):Object.assign(a,s);a.prototype=Object.create(t);return a};i.awrap=function(a){return new u(a)};function u(a){this.arg=a}function v(a){function c(c,f){var g=a[c](f);c=g.value;return c instanceof u?b("Promise").resolve(c.arg).then(d,e):b("Promise").resolve(c).then(function(a){g.value=a;return g})}typeof process==="object"&&process.domain&&(c=process.domain.bind(c));var d=c.bind(a,"next"),e=c.bind(a,"throw");c.bind(a,"return");var f;function g(a,d){var e=f?f.then(function(){return c(a,d)}):new(b("Promise"))(function(b){b(c(a,d))});f=e["catch"](function(a){});return e}this._invoke=g}a(v.prototype);i.async=function(a,b,c,d){var e=new v(j(a,b,c,d));return i.isGeneratorFunction(b)?e:e.next().then(function(a){return a.done?a.value:e.next()})};function w(a,b,c){var d=l;return function(e,f){if(d===n)throw new Error("Generator is already running");if(d===o){if(e==="throw")throw f;return B()}while(!0){var g=c.delegate;if(g){if(e==="return"||e==="throw"&&g.iterator[e]===void 0){c.delegate=null;var h=g.iterator["return"];if(h){h=k(h,g.iterator,f);if(h.type==="throw"){e="throw";f=h.arg;continue}}if(e==="return")continue}h=k(g.iterator[e],g.iterator,f);if(h.type==="throw"){c.delegate=null;e="throw";f=h.arg;continue}e="next";f=void 0;var i=h.arg;if(i.done)c[g.resultName]=i.value,c.next=g.nextLoc;else{d=m;return i}c.delegate=null}if(e==="next")d===m?c.sent=f:c.sent=void 0;else if(e==="throw"){if(d===l){d=o;throw f}c.dispatchException(f)&&(e="next",f=void 0)}else e==="return"&&c.abrupt("return",f);d=n;h=k(a,b,c);if(h.type==="normal"){d=c.done?o:m;var i={value:h.arg,done:c.done};if(h.arg===p)c.delegate&&e==="next"&&(f=void 0);else return i}else h.type==="throw"&&(d=o,e="throw",f=h.arg)}}}a(t);t[h]=function(){return this};t.toString=function(){return"[object Generator]"};function x(a){var b={tryLoc:a[0]};1 in a&&(b.catchLoc=a[1]);2 in a&&(b.finallyLoc=a[2],b.afterLoc=a[3]);this.tryEntries.push(b)}function y(a){var b=a.completion||{};b.type="normal";delete b.arg;a.completion=b}function z(a){this.tryEntries=[{tryLoc:"root"}],a.forEach(x,this),this.reset(!0)}i.keys=function(a){var b=[];for(var c in a)b.push(c);b.reverse();return function c(){while(b.length){var d=b.pop();if(d in a){c.value=d;c.done=!1;return c}}c.done=!0;return c}};function A(a){if(a){var b=a[h];if(b)return b.call(a);if(typeof a.next==="function")return a;if(!isNaN(a.length)){var c=-1;b=function b(){while(++c<a.length)if(g.call(a,c)){b.value=a[c];b.done=!1;return b}b.value=void 0;b.done=!0;return b};return b.next=b}}return{next:B}}i.values=A;function B(){return{value:void 0,done:!0}}z.prototype={constructor:z,reset:function(a){this.prev=0;this.next=0;this.sent=void 0;this.done=!1;this.delegate=null;this.tryEntries.forEach(y);if(!a)for(var b in this)b.charAt(0)==="t"&&g.call(this,b)&&!isNaN(+b.slice(1))&&(this[b]=void 0)},stop:function(){this.done=!0;var a=this.tryEntries[0];a=a.completion;if(a.type==="throw")throw a.arg;return this.rval},dispatchException:function(a){if(this.done)throw a;var b=this;function c(c,d){f.type="throw";f.arg=a;b.next=c;return!!d}for(var d=this.tryEntries.length-1;d>=0;--d){var e=this.tryEntries[d],f=e.completion;if(e.tryLoc==="root")return c("end");if(e.tryLoc<=this.prev){var h=g.call(e,"catchLoc"),i=g.call(e,"finallyLoc");if(h&&i){if(this.prev<e.catchLoc)return c(e.catchLoc,!0);else if(this.prev<e.finallyLoc)return c(e.finallyLoc)}else if(h){if(this.prev<e.catchLoc)return c(e.catchLoc,!0)}else if(i){if(this.prev<e.finallyLoc)return c(e.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(a,b){for(var c=this.tryEntries.length-1;c>=0;--c){var d=this.tryEntries[c];if(d.tryLoc<=this.prev&&g.call(d,"finallyLoc")&&this.prev<d.finallyLoc){var e=d;break}}e&&(a==="break"||a==="continue")&&e.tryLoc<=b&&b<=e.finallyLoc&&(e=null);d=e?e.completion:{};d.type=a;d.arg=b;e?this.next=e.finallyLoc:this.complete(d);return p},complete:function(a,b){if(a.type==="throw")throw a.arg;a.type==="break"||a.type==="continue"?this.next=a.arg:a.type==="return"?(this.rval=a.arg,this.next="end"):a.type==="normal"&&b&&(this.next=b)},finish:function(a){for(var b=this.tryEntries.length-1;b>=0;--b){var c=this.tryEntries[b];if(c.finallyLoc===a){this.complete(c.completion,c.afterLoc);y(c);return p}}},"catch":function(a){for(var b=this.tryEntries.length-1;b>=0;--b){var c=this.tryEntries[b];if(c.tryLoc===a){var d=c.completion;if(d.type==="throw"){var e=d.arg;y(c)}return e}}throw new Error("illegal catch attempt")},delegateYield:function(a,b,c){this.delegate={iterator:A(a),resultName:b,nextLoc:c};return p}}}),null);