// 业务逻辑的主要数据
const template = new CurrentTemplate()

let saved = true;
const savedProxy = listen(saved, () => {
  changeSaveButtonStatus(savedProxy.value);
})
//网络请求结果保存到localStorage中
const templatesList = localStorage.getItem('templatesList') ? JSON.parse(localStorage.getItem('templatesList')) : []
const componentList = [
  {
    "id": 0,
    "componentType": "input",
    "name": "姓名",
    "placeholder": "请输入姓名",
    "disabled": true
  },
  {
    "id": 1,
    "componentType": "textarea",
    "name": "自我介绍",
    "placeholder": "请输入自我介绍",
    "disabled": true
  },
  {
    "id": 2,
    "componentType": "radio",
    "name": "性别",
    "options": [
      {
        "label": "男"
      },
      {
        "label": "女"
      }
    ],
    "disabled": true,
    width: 'auto'
  },
  {
    "id": 3,
    "componentType": "select",
    "name": "爱好",
    "options": [
      {
        "label": "打篮球"
      },
      {
        "label": "打足球"
      },
      {
        "label": "打排球"
      }
    ],
    "disabled": true
  },
  {
    "id": 4,
    "componentType": "checkbox",
    "name": "爱好",
    "options": [
      {
        "label": "打球"
      },
      {
        "label": "看电影"
      },
      {
        "label": "看动漫"
      }
    ],
    "disabled": true,
    width: 'auto'
  },
  {
    "id": 5,
    "componentType": "date",
    "name": "出生日期",
    "disabled": true
  },
  {
    "id": 6,
    "componentType": "submitButton",
    "name": "提交",
    "disabled": true
  }
]

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
renderTemplatesList();


