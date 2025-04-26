// 页面中的dom元素以及数据渲染dom元素的方法
const doms = {}
doms.componentLibrary = document.querySelector('.component-library')
doms.componentLibraryContainer = document.querySelector('.component-library .container')

doms.templatesLibraryContainer = document.querySelector('.templates-libaray')
doms.templatesLibraryContainer = document.querySelector('.templates-libaray .container')
doms.currentTemplate = document.querySelector('.current-template')
doms.currentTemplateContainer = document.querySelector('.current-template .container')
doms.addNewTemplate = document.querySelector('.add-new-template')

doms.deleteCurrentTemplate = document.querySelector('.delete-current-template')

doms.save = document.querySelector('.save')
// doms.saveToSelectedTemplate = document.querySelector('.save-to-selected-template')

// doms.newTemplateToSave = document.querySelector('.new-template-to-save')
//渲染模板列表
function renderTemplatesList() {
  doms.templatesLibraryContainer.innerHTML = '';
  templatesList.forEach(template => {
    const li = document.createElement('li');
    li.innerText = template.name;
    li.setAttribute('data-id', template.id);
    doms.templatesLibraryContainer.appendChild(li);
  })
}
renderTemplatesList();
// 向当前模板添加组件
function currentTemplatePushAndRender(component) {
  // const copyComponent = JSON.parse(JSON.stringify(component));
  const copyComponent = new Component(component)
  copyComponent.id = currentTemplate.length;
  currentTemplate.push(copyComponent);
  renderCurrentTemplate();
}
// 渲染当前模板的组件
function renderCurrentTemplate() {
  doms.currentTemplateContainer.innerHTML = '';
  currentTemplate.forEach((component, index) => {
    Component.renderComponent(index, component, doms.currentTemplateContainer);
  })
}
// 点击事件切换模板
doms.templatesLibraryContainer.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    const id = +e.target.getAttribute('data-id');
    currentTemplateIndex = id;
    currentTemplate = templatesList[id].components;
    renderCurrentTemplate();
    doms.templatesLibraryContainer.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
    e.target.classList.add('selected');
  }
})

function changeSaveButtonStatus(savedStatus) {
  const span = doms.save.querySelector('span');
  span && span.remove();
  const haveSaved = `<span style="font-size: 0.7em;">(已保存)</span>`
  const haveNoSaved = `<span style="font-size: 0.7em;">(未保存)</span>`
  if (savedStatus) {
    doms.save.innerHTML += haveSaved;
  } else {
    doms.save.innerHTML += haveNoSaved;
  }
}
class MyDialog {
  constructor(data) {
    this.data = data;
    this.dialog = document.createElement('dialog');
    this.dialog.innerHTML = `
            <div class="input-container">
            <p><span>宽度:</span><input type="text" name="width"   autocomplete="off" value="${this.data.width}"></p>
            <p><span>高度:</span><input type="text" name="height"  autocomplete="off" value="${this.data.height}"></p>
            <p><span>圆角:</span><input type="text" name="borderRadius"  autocomplete="off" value="${this.data.borderRadius}"></p>
            </div>
            <button class="comfirm">确定</button>
            <button class="cancel">取消</button>
    `
    this.dialog.querySelector('.comfirm').addEventListener('click', () => {
      this.data.width = this.dialog.querySelector('input[name="width"]').value;
      this.data.height = this.dialog.querySelector('input[name="height"]').value;
      this.data.borderRadius = this.dialog.querySelector('input[name="borderRadius"]').value;
      // 重新渲染
      renderCurrentTemplate();
      //设置未保存状态
      savedProxy.value = false;
      this.close();
    })
    this.dialog.querySelector('.cancel').addEventListener('click', () => {
      this.close();
    })
  }
  showModal() {
    document.body.appendChild(this.dialog);
    this.dialog.showModal();
  }
  close() {
    this.dialog.close();
    this.dialog.remove();
  }
}
