class Component {
  static renderComponent(index, component, container) {
    component.componentType === 'input' && new Input(component).render(index, container)
    component.componentType === 'select' && new Select(component).render(index, container)
    component.componentType === 'radio' && new Radio(component).render(index, container)
    component.componentType === 'checkbox' && new Checkbox(component).render(index, container)
    component.componentType === 'date' && new MyData(component).render(index, container)
    component.componentType === 'submitButton' && new SubmitButton(component).render(index, container)
    component.componentType === 'textarea' && new Textarea(component).render(index, container)
  }
  constructor({ componentType, name, disabled = true, placeholder = '', options = [], width = 'auto', height = 'auto', borderRadius = '0' }) {
    this.componentType = componentType;
    this.name = name;
    this.disabled = disabled;
    this.placeholder = placeholder;
    this.options = options;
    this.width = width;
    this.height = height;
    this.borderRadius = borderRadius;
  }
  render(id, container) {
    if (this.formElem === undefined) {
      throw new Error("你还没有重写formElem属性方法或者你不应该渲染Component的实例");
    }
    const component = this.createCard(id)(this.formElem);
    container.innerHTML += component;
  }
  get title() {
    return `<h1 class="title">${this.name}</h1>`
  }
  createCard(id) {
    return (formElem, title = this.title) => `
    <div data-id="${id}" draggable="true" class="single-component-container card" >
      ${title}
      ${formElem}
    </div>
    `
  }
}
class Input extends Component {

  get formElem() {
    return `<input type="text" ${this.disabled ? 'disabled' : ''} style="width:${this.width};height:${this.height};border-radius:${this.borderRadius}" name="${this.name}" placeholder="${this.placeholder}">`
  }
}
class Select extends Component {

  get formElem() {
    return `<select style="width:${this.width};height:${this.height};border-radius:${this.borderRadius}" name="${this.name}" placeholder="${this.placeholder}" ${this.disabled ? 'disabled' : ''}>
      ${this.createOptions(this.options)}
    </select>`
  }
  createOptions(options) {
    const elem = document.createElement('select');
    options.forEach(item => {
      const option = document.createElement('option');
      option.value = item.label;
      option.innerHTML = item.label;
      elem.appendChild(option);
    })
    return elem.innerHTML;
  }
}
class Radio extends Component {

  get formElem() {
    let html = '';
    this.options.forEach(option => {
      html += `<input type="radio" ${this.disabled ? 'disabled' : ''} style="width:${this.width};height:${this.height};border-radius:${this.borderRadius}" name="${this.name}" placeholder="${this.placeholder}"><span>${option.label}</span>`
    })
    return html;

  }
}

class MyData extends Component {
  get formElem() {
    return `<input ${this.disabled ? 'disabled' : ''} style="width:${this.width};height:${this.height};border-radius:${this.borderRadius}" type="date"></input>`
  }
}

class Textarea extends Component {

  get formElem() {
    return `<textarea ${this.disabled ? 'disabled ' : ''} style="width:${this.width};height:${this.height};border-radius:${this.borderRadius};resize:none;" name="${this.name}" placeholder="${this.placeholder}"></textarea>`
  }
}

class Checkbox extends Component {

  get formElem() {
    let html = ''
    this.options.forEach(option => {
      html += `<input type="checkbox" ${this.disabled ? 'disabled' : ''} style="width:${this.width};height:${this.height};border-radius:${this.borderRadius}" name="${this.name}" placeholder="${this.placeholder}"><span>${option.label}</span>`
    })
    return html;
  }
}

class SubmitButton extends Component {
  get formElem() {
    return `<button type="submit" class="layui-btn-sm layui-btn" ${this.disabled ? 'disabled' : ''} style="width:${this.width};height:${this.height};border-radius:${this.borderRadius}">${this.name}</button>`
  }
  render(id, container) {
    container.innerHTML += this.createCard(id)(this.formElem, '')
  }
}
// new Input({
//   name: 'name',
//   placeholder: '请输入姓名',

// }).render(0, doms.componentLibrary)
// new Data({
//   name: 'data'
// }).render(1, doms.componentLibrary)
// new Checkbox({
//   options: [
//     { label: '选项1' },
//     { label: '选项2' },
//     { label: '选项3' },
//   ],
//   name: 'checkbox',
// }).render(2, doms.componentLibrary)

componentList.forEach((component) => {
  const id = component.id;
  Component.renderComponent(id, component, doms.componentLibraryContainer)
})