// 该工具类参考了一下博文,感谢大佬们的分享(排名不分先后)
/**
 * https://blog.csdn.net/kuangshp128/article/details/71104988
 * https://blog.csdn.net/hj7jay/article/details/77703420
 */
(function () {
  let $ = {};
  window.$ = $;
  window.xtools = $;

  /**---------------URL地址栏相关类--------------- */
  /**
   * 获取地址栏URL参数
   * @param {String} name 期望获取的参数名称
   * @return {any} 取得的参数值
   */
  $.getUrlQuery = function (name) {
    if ($.objRootIn(name) !== "String") throw (`方法期望传入一个字符串, 但您传入了"${$.objRootIn(name)}"`);
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let query = window.location.search.substr(1).match(reg);
    if (query !== null) return unescape(query[2]);
    else return null;
  }

  /**---------------时间相关类--------------- */
  /**
   * 时间数据获取
   * @param {Date} format 目标时间对象
   * @return {Object} 返回一个包含目标时间对象信息的数据对象
   */
  $.timeFormat = function (format) {
    if ($.objRootIn(format) !== "Date") throw (`方法期望您传入Date对象, 您传入的是${$.objRootIn(format)}`);
    let week1 = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    let week2 = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    return time = {
      year: $.zeroFill(format.getFullYear()),
      month: $.zeroFill(format.getMonth() + 1),
      day: $.zeroFill(format.getDate()),
      week_n: format.getDay(),
      week_v1: week1[format.getDay()],
      week_v2: week2[format.getDay()],
      hours: $.zeroFill(format.getHours()),
      min: $.zeroFill(format.getMinutes()),
      sec: $.zeroFill(format.getSeconds())
    }
  }
  /**
   * 字符串转换为时间对象
   * @param {String} str 目标字符串, 格式为 YYYY-MM-DD
   * @return {Object} 返回一个包含目标时间对象的信息数据对象
   */
  $.strToDate = function (str) {
    if ($.objRootIn(str) !== "String") throw (`方法期望您传入String对象, 您传入的是${$.objRootIn(str)}`);
    let strs = str.split("-");
    if (strs.length !== 3) throw (`方法期望您传入YYYY-MM-DD格式的字符串, 您未正确传入`);
    let format = new Date(strs[0], +strs[1] - 1, strs[2]);
    return {
      time: format,
      year: format.getFullYear(),
      month: format.getMonth() + 1,
      day: format.getDate(),
      hours: format.getHours(),
      min: format.getMinutes(),
      src: format.getSeconds(),
      week: format.getDay()
    }
  }
  /**
   * 计算两个时间内的相差天数, 计算时, 以包含start不包含end 为依据进行计算
   * @param {Date} start 
   * @param {Date} end 
   * @return {Number} 相差的天数
   */
  $.dayDiffer = function (start, end) {
    if ($.objRootIn(start) !== "Date" || $.objRootIn(end) !== "Date") throw (`方法期望您传入Date对象, 您传入的是${$.objRootIn(start)}和${$.objRootIn(end)}`);
    let _start = start.getTime();
    let _end = end.getTime();
    let _deffer = Math.abs(_end - _start);
    let day = Math.floor(_deffer / 1000 / 60 / 60 / 24);
    return day;
  }
  /**
   * 计算两个时间内的相差月份, 计算时, 以包含start不包含end 为依据进行计算
   * @param {Date} start 
   * @param {Date} end 
   * @return {Number} 相差的月份
   */
  $.monthDiffer = function (start, end) {
    if ($.objRootIn(start) !== "Date" || $.objRootIn(end) !== "Date") throw (`方法期望您传入Date对象, 您传入的是${$.objRootIn(start)}和${$.objRootIn(end)}`);
    let _start = start.getTime();
    let _end = end.getTime();
    let _deffer = _end - _start;
    let month = Math.floor(_deffer / 1000 / 60 / 60 / 24 / 30);
    return month;
  }
  /**
   * 计算两个时间内的相差年份, 计算时, 以包含start不包含end 为依据进行计算
   * @param {Date} start 
   * @param {Date} end 
   * @return {Number} 相差的年份
   */
  $.yearDiffer = function (start, end) {
    if ($.objRootIn(start) !== "Date" || $.objRootIn(end) !== "Date") throw (`方法期望您传入Date对象, 您传入的是${$.objRootIn(start)}和${$.objRootIn(end)}`);
    let _start = start.getTime();
    let _end = end.getTime();
    let _deffer = _end - _start;
    let year = Math.floor(_deffer / 1000 / 60 / 60 / 24 / 30 / 12);
    return year;
  }
  /**
   * 计算两个时间内的相差小时, 计算时, 以包含start不包含end 为依据进行计算
   * @param {Date} start 
   * @param {Date} end 
   * @return {Number} 相差的小时
   */
  $.hoursDiffer = function (start, end) {
    if ($.objRootIn(start) !== "Date" || $.objRootIn(end) !== "Date") throw (`方法期望您传入Date对象, 您传入的是${$.objRootIn(start)}和${$.objRootIn(end)}`);
    let _start = start.getTime();
    let _end = end.getTime();
    let _deffer = _end - _start;
    let hours = Math.floor(_deffer / 1000 / 60 / 60);
    return hours;
  }
  /**
   * 计算两个时间内的相差分钟, 计算时, 以包含start不包含end 为依据进行计算
   * @param {Date} start 
   * @param {Date} end 
   * @return {Number} 相差的分钟
   */
  $.minDiffer = function (start, end) {
    if ($.objRootIn(start) !== "Date" || $.objRootIn(end) !== "Date") throw (`方法期望您传入Date对象, 您传入的是${$.objRootIn(start)}和${$.objRootIn(end)}`);
    let _start = start.getTime();
    let _end = end.getTime();
    let _deffer = _end - _start;
    let min = Math.floor(_deffer / 1000 / 60);
    return min;
  }

  /**---------------数字处理相关类--------------- */
  /**
   * 不足两位向前添加0
   * @param {Number} num 期望处理的数字
   * @return {String} 处理补零后的字符串
   */
  $.zeroFill = function (num) {
    if ($.objRootIn(num) !== "Number") throw (`方法期望传入一个数值, 但您传入了"${$.objRootIn(num)}"`);
    return num < 10 ? "0" + num : "" + num;
  }
  /**
   * 判断目标值是否是数字
   * @param {any} target 目标值
   * @return {Boolean}
   */
  $.isNum = function (target) {
    return target != null && target.length > 0 && isNaN(target) == false ? true : false;
  }
  /**
   * 为指定数值添加千分位符号(小数点后仅保留两位)
   * @param {Number} num 目标数值
   * @return {String}
   */
  $.formatNum = function (num) {
    if ($.objRootIn(num) !== "Number") throw (`方法期望传入一个数值, 但您传入了"${$.objRootIn(num)}"`);
    let str = "" + num;
    let _str = "";
    let count = 0;
    // 没有小数的情况
    if (str.indexOf(".") == -1) {
      for (let i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          _str = str.charAt(i) + "," + _str;
        }
        else {
          _str = str.charAt(i) + _str;
        }
        count++;
      }
      str = _str + ".00";
      return str;
    }
    // 有小数的情况
    else {
      for (let i = str.indexOf(".") - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          _str = str.charAt(i) + "," + _str;
        }
        else {
          _str = str.charAt(i) + _str;
        }
        count++;
      }
      str = _str + (str + "00").substr((str + "00").indexOf("."), 3);
      return str;
    }
  }

  /**---------------构造函数判断相关类--------------- */
  /**
   * 判断目标来源于哪个构造函数
   * @param {Object} obj 目标
   * @return {String} 目标的构造函数名称
   */
  $.objRootIn = function (obj) {
    return Object.prototype.toString.call(obj).split(" ")[1].slice(0, -1);
  }

  /**---------------字符串操作相关类--------------- */
  /**
   * 判断字符串是否为空
   * @param {String} str 目标字符串
   * @return {Boolean}
   */
  $.isStrEmpty = function (str) {
    if ($.objRootIn(str) !== "String") throw (`方法期望传入一个字符串, 但您传入了"${$.objRootIn(str)}"`);
    return str != null && str.length > 0 ? false : true;
  }
  /**
   * 忽略大小写判断两个字符串是否相同
   * @param {String} str1 目标字符串1
   * @param {String} str2 目标字符串2
   * @return {Boolean}
   */
  $.isEquals = function (str1, str2) {
    if ($.objRootIn(str1) !== "String" || $.objRootIn(str2) !== "String") throw (`方法期望传入两个字符串, 但您传入了"${$.objRootIn(str1)}和${$.objRootIn(str2)}"`);
    return str1.toUpperCase() == str2.toUpperCase() ? true : false;
  }
  /**
   * 判断是否是中文
   * @param {String} 目标字符串
   * @return {Boolean}
   */
  $.isZW = function (str) {
    if ($.objRootIn(str) !== "String") throw (`方法期望传入一个字符串, 但您传入了"${$.objRootIn(str)}"`);
    let _str = str;
    _str = _str.replace(/[ ]/g, "");
    let reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
    return !reg.test(_str) ? true : false;
  }

  /**---------------数组操作相关类--------------- */
  /**
   * 求数组中的最大值
   * @param {Array} arr 目标数组
   * @return {Array}
   */
  $.arrMax = function (arr) {
    if ($.objRootIn(arr) !== "Array") throw (`方法期望传入一个数组, 但您传入了"${$.objRootIn(arr)}"`);
    console.log(arr);
    return Math.max.apply(null, arr);
  }
  /**
   * 求数组中的最小值
   * @param {Array} arr 目标数组
   * @return {Array}
   */
  $.arrMin = function (arr) {
    if ($.objRootIn(arr) !== "Array") throw (`方法期望传入一个数组, 但您传入了"${$.objRootIn(arr)}"`);
    console.log(arr);
    return Math.min.apply(null, arr);
  }
  /**
   * 数组随机排序
   * @param {Array} arr 目标数组
   * @return {Array}
   */
  $.arrRandomSort = function (arr) {
    if ($.objRootIn(arr) !== "Array") throw (`方法期望传入一个数组, 但您传入了"${$.objRootIn(arr)}"`);
    return arr.sort(function (a, b) {
      return Math.random() > 0.5 ? -1 : 1;
    })
  }
  /**
   * 随机返回数组中的某一项
   * @param {Array} arr 目标数组
   * @return {any}
   */
  $.arrRandomGet = function (arr) {
    if ($.objRootIn(arr) !== "Array") throw (`方法期望传入一个数组, 但您传入了"${$.objRootIn(arr)}"`);
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**---------------文件操作相关类--------------- */
  /**
   * 判断是否为图片
   * @param {String} name
   * @return {Boolean}
   */
  $.isImgFile = function (name) {
    if ($.objRootIn(name) !== "String") throw (`方法期望传入一个字符串, 但您传入了"${$.objRootIn(name)}"`);
    return /.(git|jpg|jpeg|png|GIF|JPG|PNG)$/ig.test(name);
  }
  /**
   * 判断是否为视频
   * @param {String} name
   * @return {Boolean}
   */
  $.isVideoFile = function (name) {
    if ($.objRootIn(name) !== "String") throw (`方法期望传入一个字符串, 但您传入了"${$.objRootIn(name)}"`);
    return /.(mp4|mp3|flv|wav)$/ig.test(name);
  }
  /**
   * 判断是否为文档
   * @param {String} name
   * @return {Boolean}
   */
  $.isDocFile = function (name) {
    if ($.objRootIn(name) !== "String") throw (`方法期望传入一个字符串, 但您传入了"${$.objRootIn(name)}"`);
    return /.(doc|docx|xls|xlsx|pdf|txt|ppt|pptx)$/ig.test(name);
  }
}())
