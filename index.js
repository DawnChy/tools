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

