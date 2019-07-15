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
 * @description 深拷贝函数 （递归）
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
