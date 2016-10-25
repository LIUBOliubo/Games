function setCookie(c_name, value, expiredays) {
    var exDate = new Date();
    exDate.setTime(exDate.getTime() + expiredays * 3600000 * 24);
    document.cookie = c_name + "=" + escape(value) +
    ((expiredays==null) ? "" : ";expires=" + exDate.toGMTString());
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        } 
    }
    return "";
}