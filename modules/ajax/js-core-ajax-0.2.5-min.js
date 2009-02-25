/* js-core AJAX module, version 0.2.5 (minified)
   Copyright (c) 2009 Dmitry Korobkin
   Released under the MIT License.
   More information: http://www.js-core.ru/
	Warning: do not use timeout for more then 2 XHR at one time!
*/
core.ajax=function(){if(this.ajax)return new this.ajax();this.xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()};core.ajax.type={html:'text/html',text:'text/plain',xml:'application/xml, text/xml',json:'application/json, text/javascript',script:'text/javascript, application/javascript','default':'application/x-www-form-urlencoded'};core.ajax.accept='*\/*';core.ajax.prototype.open=function(a){core.extend(this,{method:a.method||'GET',url:a.url||location.href,async:a.async!==false,user:a.user||null,password:a.password||null,params:a.params||null,processData:a.processData===true,timeout:a.timeout||0,contentType:core.ajax.type[a.contentType]||core.ajax.type['default'],dataType:core.ajax.type[a.dataType]?core.ajax.type[a.dataType]+', *\/*':core.ajax.accept,requestHeaders:a.requestHeaders||null,success:a.success,error:a.error});if(this.params){var a=[],e=this.process;core.forEach(this.params,function(c,d){a.push([c,'=',e?encodeURIComponent(d):d].join(''))});this.params=a.join('&')}try{this.xhr.open(this.method,this.method=='GET'&&this.params?this.url+'?'+this.params:this.url,this.async,this.user,this.password);this.xhr.setRequestHeader('Accept',this.dataType);this.xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');this.xhr.setRequestHeader('Content-Type',this.contentType);var b=this;if(this.requestHeaders)core.forEach(this.requestHeaders,function(key,value){b.xhr.setRequestHeader(key,value)});this.xhr.onreadystatechange=function(){if(b.xhr.readyState==4){if(b.xhr.status==200||b.xhr.status==0&&b.success)b.success(b.xhr.responseText);else if(b.error&&!b.aborted)b.error(b.xhr.statusText)}};this.xhr.send(this.params);if(this.async&&this.timeout)setTimeout(function(){if(b.xhr.readyState!=4){b.aborted=true;b.xhr.abort();if(b.error)b.error('Time is out')}},this.timeout)}catch(error){if(this.error)this.error(error)}};core.get=function(c,d,a){new core.ajax().open(core.extend(c,{success:d,error:a}));return this};core.post=function(c,d,a){new core.ajax().open(core.extend(c,{method:'POST',success:d,error:a}));return this};core.getJSON=function(d,a,e){new core.ajax().open(core.extend(d,{dataType:'json',success:function(c){try{a(eval('('+c+')'))}catch(e){if(this.error)this.error(e)}},error:e}));return this};core.prototype.load=function(d,a,e){var b=this;new core.ajax().open(core.extend(d,{success:function(c){b.html(c);if(a)a.call(b.node,c,this.xhr)},error:function(c){if(e)e.call(b.node,c,this.xhr)}}));return this};