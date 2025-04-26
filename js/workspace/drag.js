//拖拽事件
doms.currentTemplate.addEventListener('dragover', e => {
  e.preventDefault();
})

doms.currentTemplate.addEventListener('drop', e => {
  e.preventDefault();
  if (!draggingItem || draggingItem.to !== doms.currentTemplate) return;
  if (currentTemplateIndex === undefined) {
    alert('请先创建或选中一个模板!');
    return;
  }

  // 把draggingFormElemData添加到currentTemplate中
  currentTemplatePushAndRender(draggingItem.component);
  // 设置未保存状态
  savedProxy.value = false;
})

doms.currentTemplate.addEventListener('dragstart', e => {
  draggingItem = {
    component: currentTemplate.find(formElem => formElem.id === +e.target.getAttribute('data-id')),
    from: doms.currentTemplate,
    to: doms.componentLibrary
  }
})




doms.componentLibrary.addEventListener('dragstart', e => {
  const id = +e.target.getAttribute('data-id');
  draggingItem = {
    component: componentList.find(formElem => formElem.id === id),
    from: doms.componentLibrary,
    to: doms.currentTemplate
  }
})
doms.componentLibrary.addEventListener('dragend', e => {
  draggingItem = null;
})

doms.componentLibrary.addEventListener('dragover', e => {
  e.preventDefault();
})
// 从工作区拖到组件库，表示删除工作区的组件
doms.componentLibrary.addEventListener('drop', e => {
  e.preventDefault();
  if (!draggingItem || draggingItem.to !== doms.componentLibrary) return;
  // 设置未保存状态
  savedProxy.value = false;
  // 获取id, 删除currentTemplate中的组件
  const index = currentTemplate.indexOf(draggingItem.component)
  currentTemplate.splice(index, 1)
  //重置id
  currentTemplate.forEach((formElem, index) => {
    formElem.id = index;
  })
  renderCurrentTemplate()
})
