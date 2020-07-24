var baseUrl = document.location.protocol + "//"+location.host +"/zudian";

var aj = new Object();
// 创建XMLHttpRequest对象star
aj.request = function() {
    if (window.XMLHttpRequest) {
        var ajax = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            var ajax = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            try {
                var ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!ajax) {
        window.alert("不能创建XMLHttpRequest对象.");
        return false;
    }
    return ajax;
}
aj.req = aj.request();
// 创建对象end
// 服务器响应star
aj.Handle = function(callback) {
    aj.req.onreadystatechange = function() {
        if (aj.req.readyState == 4 && aj.req.status == 200) {
            callback(aj.req.responseText);
        }
    }
}
// 服务器响应end

//参数处理
aj.cl = function(o) {
    if (typeof(o) == 'object') {
        var str = '';
        for (a in o) {
            str += a + '=' + o[a] + '&';
        }
        str = str.substr(0, str.length - 1);
        return str;
    } else {
        return o;
    }
}

//向服务器发送请求start
// get 
aj.get = function(url, callback) {
	var reqUrl = baseUrl+url;
    aj.req.open('get', reqUrl, true);
    aj.req.send(null);
    aj.Handle(callback);
}
// post
aj.post = function(url, content, callback) {
	var reqUrl = baseUrl+url;
    aj.req.open('post', reqUrl, true);
    aj.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    content = aj.cl(content);
    aj.req.send(content);
    aj.Handle(callback);
}
//向服务器发送请求end

//使用
//get的使用
//aj.get(url, function(data) { 返回数据后处理 })
//post的使用
//aj.post(url, { data: aa }, function(data) { 返回的数据处理 })
