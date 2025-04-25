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
  const copyComponent = JSON.parse(JSON.stringify(component));
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