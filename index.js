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
 * @param (String) format 格式字符串（hh:mm:ss，yyyymmdd，yyyymmddhhmmss，yyyy-mm-dd，yyyy-mm-dd hh:mm:ss，yyyy/mm/dd，yyyy/mm/dd）
 * returns (String)
 */
export const date2str = (date, format) => {

}
