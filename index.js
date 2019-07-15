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
