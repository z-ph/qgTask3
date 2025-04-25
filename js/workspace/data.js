let currentTemplate = []
let currentTemplateIndex = undefined
let saved = true;
let draggingItem = null
//后续将localStorag改成向发送数据库get请求
const templatesList = localStorage.getItem('templatesList') ? JSON.parse(localStorage.getItem('templatesList')) : []
const componentList = localStorage.getItem('componentList') ? JSON.parse(localStorage.getItem('componentList')) : []

function listen(data, fn) {
  //判断是否是原始类型
  if (typeof data !== 'object' || data === null) {
    const dataObj = {
      value: data
    }
    const dataProxy = new Proxy(dataObj, {
      set(target, key, value) {
        target[key] = value
        fn();
        return true
      }
    })
    return dataProxy
  }
  return new Proxy(data, {
    set(target, key, value) {
      target[key] = value
      fn();
      return true
    }
  })
}
const savedProxy = listen(saved, () => {
  changeSaveButtonStatus(savedProxy.value);
})
