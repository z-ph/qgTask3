//拖拽事件
doms.currentTemplate.addEventListener('dragover', e => {
  e.preventDefault();
})

doms.currentTemplate.addEventListener('drop', e => {
  e.preventDefault();
  template.addComponent(template.draggingItem.component)

})

doms.currentTemplate.addEventListener('dragstart', e => {
  template.draggingItem = {
    component: template.template.find(formElem => formElem.id === +e.target.getAttribute('data-id')),
    index: +e.target.getAttribute('data-id'),
    from: doms.currentTemplate,
    to: doms.componentLibrary
  }
})




doms.componentLibrary.addEventListener('dragstart', e => {
  const id = +e.target.getAttribute('data-id');
  template.draggingItem = {
    component: componentList.find(formElem => formElem.id === id),
    index: id,
    from: doms.componentLibrary,
    to: doms.currentTemplate
  }

})
doms.componentLibrary.addEventListener('dragend', e => {
  template.draggingItem = null;
})

doms.componentLibrary.addEventListener('dragover', e => {
  e.preventDefault();
})
// 从工作区拖到组件库，表示删除工作区的组件
doms.componentLibrary.addEventListener('drop', e => {
  e.preventDefault();
  const index = template.draggingItem.index
  template.removeComponent(index)
})
