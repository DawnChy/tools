# tools
js common tools

/**
 * @description 判断数据类型
 * @param {*} obj 传入数据
 * @returns String
 */
export const TypeOf = obj => {
  if (obj instanceof Element) {
    return 'Element'
  } else {
    //toString会返回对应不同标签的构造函数
    let toString = Object.prototype.toString
    let map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object',
    }
    return map[toString.call(obj)]
  }
}

/**
 * @description 深拷贝（递归）
 * @param (*) data 数据
 * returns (*) data
 */
export const deepClone1 = data => {
  let obj = null
  const type = typeOf(data)
  if （type === ‘array’）{
    obj = []
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone1(data[i]))
    }
  } else if (type === 'object') {
    obj = {}
    for (let key in data) {
      obj[key] = deepClone1(data[key])
    }
  } else {
    return data
  }
  return obj
}

/**
 * @description 深拷贝（JSON解析与反解析）
 * @param (*) data 数据
 * returns (*) data
 */
export const deepClone2 = data => JSON.parse(JSON.stringify(data))

/**
 * @description 将小于10的数字十位补零转字符串输出
 * @param (Number) n 数字
 * returns (String) string
 */
export const numZeroFill = n => {
  n = number(n)
  if (n < 10){
    return `0${n}`
  } else {
    return `${n}`
  }
}

/**
 * @description 将时间过滤为指定格式的时间字符串
 * @param (Date | String) date 时间对象或时间字符串
 * @param (String) format 格式字符串（hh:mm:ss，hh-mm-ss，YYYYMMDD，YYYYMMDDhhmmss，YYYY-MM-DD，
 *                                   YYYY-MM-DD hh:mm:ss，YYYY/MM/DD，YYYY/MM/DD hh:mm:ss，cn）
 * returns (String)
 */
export const date2str = (date, format) => {
  date = new Date(date)
  const Y = date.getFullYear
  const M = numZeroFill(date.getMonth() + 1)
  const D = numZeroFill(date.getDate())
  const h = numZeroFill(date.getHours())
  const m = numZeroFill(date.getMinutes())
  const s = numZeroFill(date.getSeconds())
  
  switch (format) {
    case 'hh:mm:ss' : return `${h}:${m}:${s}`
    case 'hh-mm-ss' : return `${h}-${m}-${s}`
    case 'YYYYMMDD' : return `${Y}${M}${D}`
    case 'YYYYMMDDhhmmss' : return `${Y}${M}${D}${h}${m}${s}`
    case 'YYYY-MM-DD' : return `${Y}-${M}-${D}`
    case 'YYYY-MM-DD hh:mm:ss' : return `${Y}-${M}-${D} ${h}:${m}:${s}`
    case 'YYYY/MM/DD' : return `${Y}/${M}/${D}`
    case 'YYYY/MM/DD hh:mm:ss' : return `${Y}/${M}/${D} ${h}:${m}:${s}`
    case 'cn' : return `${Y}年${M}月${D}日 ${h}时${m}分${s}秒`
    default: return `${Y}-${M}-${D} ${h}:${m}:${s}`
  }
}

/**
 * @description 流量单位转换
 * @param (Number) val 传入值
 * @param (String) type 类型
 * returns (Number, String) 传入单位（type）
 */
export const flow2str = (val, type) => {
  switch (type) {
    case 'GB': return (val / 1024 / 1024 / 1024).toFixed(2)
    case 'MB': return (val / 1024 / 1024).toFixed(2)
    case 'KB': return (val / 1024).toFixed(2)
    case 'B': return val.toFixed(2)
    default: {
      let gb = (val / 1024 / 1024 / 1024).toFixed(2)
      let mb = (val / 1024 / 1024).toFixed(2)
      let kb = (val / 1024).toFixed(2)
      if (val < 1024) {
        return val + 'B'
      } else if (kb < 1024) {
        return kb + 'KB'
      } else if (mb < 1024) {
        return mb + 'MB'
      } else if (gb < 1024) {
        return gb + 'GB'
      }
    }
  }
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值（必填）
 * @param {Number} max 最大值（必填）
 * @param {Number} count 数量
 * @return {Number | Array} 一个数或者包含多个数的数组
 */
export const random = (min, max, count) => {
  if (count && count > 1) {
    let r = []
    while (count > 0) {
      r.push(Math.floor(Math.random() * (max - min) + min))
      count--
    }
    return r
  } else {
    return Math.floor(Math.random() * (max - min) + min)
  }
}

/**
 * @description 将空值过滤为指定值
 * @param {*} val 传入值
 * @param {*} fill 填充值
 * @return {*}
 */
export const null2fill = (val, fill) => {
  if (val) {
    return val
  } else {
    return fill
  }
}

/**
 * @description 绑定事件
 * @param {Element} element 元素
 * @param {String} event 事件名称
 * @param {Function} handler 事件
 */
export const addEvent = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件
 * @param {Element} element 元素
 * @param {String} event 事件名称
 * @param {Function} handler 事件
 */
export const removeEvent = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 数组扁平化（递归实现很简洁易懂，就是将每一项遍历，如果某一项为数组，则让该项继续调用，这里指定了 depth 作为扁平化的深度，因为这个参数对数组的每一项都要起作用，故放在循环的里面。）
 * @param {Array} array 待扁平化数组
 * @param {Number} depth 深度
 * @returns {Array} 指定深度的数组
 */
export const flattenDepth = (array, depth = 1) => {
  let result = []
  array.forEach(item => {
    let d = depth
    if (Array.isArray(item) && d > 0) {
      result.push(...(flattenDepth(item, --d)))
    } else {
      result.push(item)
    }
  })
  return result
}
console.log(flattenDepth([1, [2, [3, [4]], 5]])) // [ 1, 2, [ 3, [ 4 ] ], 5 ]
console.log(flattenDepth([1, [2, [3, [4]], 5]], 2)) // [ 1, 2, 3, [ 4 ], 5 ]
console.log(flattenDepth([1, [2, [3, [4]], 5]], 3)) // [ 1, 2, 3, 4, 5 ]
console.log(flattenDepth([1, [2, [3, [4]], 5]], 4)) // [ 1, 2, 3, 4, 5 ]

/**
 * @description 柯里化(每次判断参数的个数，与被柯里化的函数参数个数比较，如果小于就继续返回函数，否则就执行。)
 * @param {Function} func 方法
 * @returns {Function | func()} 返回函数本身或者函数执行结果
 */
export const curry = func => {
  var l = func.length
  return function curried() {
    var args = [].slice.call(arguments)
    if(args.length < l) {
      return function() {
        var argsInner = [].slice.call(arguments)
        return curried.apply(this, args.concat(argsInner))
      }
    } else {
      return func.apply(this, args)
    }
  }
}
var f = function(a, b, c) {
 return console.log([a, b, c])
};
var curried = curry(f)
curried(1)(2)(3) // => [1, 2, 3]
curried(1, 2)(3) // => [1, 2, 3]
curried(1, 2, 3) // => [1, 2, 3]
