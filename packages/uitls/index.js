/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

// 当前时间
export function getCurrentDay() {
  return parseTime(new Date(), '{y}-{m}-{d}')
}

/**
     * @param {number} time
     * @param {string} option
     * @returns {string}
     */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
          1 +
          '月' +
          d.getDate() +
          '日' +
          d.getHours() +
          '时' +
          d.getMinutes() +
          '分'
    )
  }
}

/**
     * @param {string} url
     * @returns {Object}
     */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
     * @param {string} input value
     * @returns {number} output value
     */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
     * @param {Array} actual
     * @returns {Array}
     */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
     * @param {Object} json
     * @returns {Array}
     */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
     * @param {string} url
     * @returns {Object}
     */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
          decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') +
          '"}'
  )
}

/**
     * @param {string} val
     * @returns {string}
     */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
     * Merges two objects, giving the last one precedence
     * @param {Object} target
     * @param {(Object|Array)} source
     * @returns {Object}
     */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
     * @param {HTMLElement} element
     * @param {string} className
     */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
          classString.substr(0, nameIndex) +
          classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
     * @param {string} type
     * @returns {Date}
     */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
     * @param {Function} func
     * @param {number} wait
     * @param {boolean} immediate
     * @return {*}
     */
export function debounce1(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
     * This is just a simple version of deep copy
     * Has a lot of edge cases bug
     * If you want to use a perfect deep copy, use lodash's _.cloneDeep
     * @param {Object} source
     * @returns {Object}
     */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
     * @param {Array} arr
     * @returns {Array}
     */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
     * @returns {string}
     */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
     * Check if an element has a class
     * @param {HTMLElement} elm
     * @param {string} cls
     * @returns {boolean}
     */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
     * Add class to element
     * @param {HTMLElement} elm
     * @param {string} cls
     */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
     * Remove class from element
     * @param {HTMLElement} elm
     * @param {string} cls
     */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function getRandomID(length = 36) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}

export function debounce(callback, delay) {
  let lastTime
  return function() {
    clearTimeout(lastTime)
    const [that, args] = [this, arguments]
    lastTime = setTimeout(() => {
      callback.apply(that, args)
    }, delay)
  }
}

export function observerDomResize(dom, callback) {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

  const observer = new MutationObserver(callback)

  observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })

  return observer
}

export function deepMerge(target, merged) {
  for (var key in merged) {
    target[key] = target[key] && target[key].toString() === '[object Object]' ? deepMerge(target[key], merged[key]) : target[key] = merged[key]
  }

  return target
}

// 返回最后的名字 /transferManagement
export function lastStringName(string = '') {
  return string ? string.split('/')[string.split('/').length - 1] : 'noPage'
}

// 递归处理菜单树状结构
export const handlerTree = (data = [], newArr = []) => {
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    const rowItem = { }
    if (element.parentId === '00000000-0000-0000-0000-000000000000') {
      rowItem.path = '/' + element.url
      rowItem.name = element.name
      rowItem.url = element.url
      rowItem.component = 'Layout'
      rowItem.children = []
    } else {
      rowItem.path = '/' + element.url
      rowItem.name = element.name
      rowItem.url = element.url
      rowItem.component = '@/views/' + element.url
      rowItem.children = []
    }
    if (element.children.length) {
      rowItem.children = handlerTree(element.children)
    }
    newArr.push(rowItem)
  }
  return newArr
}

export function dellTreeEmptyChildren(data = [], newArr = []) {
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    const rowItem = {}
    if (element.children && element.children.length) {
      rowItem.label = element.label
      rowItem.value = element.value
      rowItem.children = []
    } else {
      rowItem.label = element.label
      rowItem.value = element.value
    }
    if (element.children && element.children.length) {
      rowItem.children = dellTreeEmptyChildren(element.children)
    }
    newArr.push(rowItem)
  }
  return newArr
}

/**
 *  MaxHeight -> maxHeight
 */
export function transformCamelCase(str) {
  var re = /-(\w)/g
  return str.replace(re, function($0, $1) {
    return $1.toLowerCase()
  })
}

export function generateUuID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}