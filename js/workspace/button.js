doms.addNewTemplate.addEventListener('click', () => {
  // 添加数据到模板列表
  const name = prompt('请输入模板名称');
  if (!name) return;
  templatesList.push({
    id: templatesList.length,
    name,
    components: []
  })
  //如果工作区模板有组件，并且为指向当前模板列表中的任意模板，则保存到新键的模板
  if (currentTemplateIndex === undefined && currentTemplate.length > 0) {
    templatesList.at(-1).components = currentTemplate;
  }
  //当前显示模板指向新建的模板，并渲染
  currentTemplate = templatesList[templatesList.length - 1].components;
  currentTemplateIndex = templatesList.length - 1;
  renderTemplatesList();
  // 新建模板自动保存
  doms.save.click();
  // 模拟用户点击最后一个模板
  const liNodeList = doms.templatesLibraryContainer.querySelectorAll('li');
  liNodeList[liNodeList.length - 1].click();
})


doms.deleteCurrentTemplate.addEventListener('click', e => {
  //删除currentTemplateIndex指向的模板
  if (currentTemplateIndex === undefined) return;
  templatesList.splice(currentTemplateIndex, 1);
  //设置保存状态
  savedProxy.value = false;
  //将id重新赋值
  templatesList.forEach((template, index) => {
    template.id = index;
  })
  currentTemplate = []
  currentTemplateIndex = undefined;

  // 重新渲染模板列表和当前模板
  renderTemplatesList();
  renderCurrentTemplate();

  // 模拟用户点击最后一个模板
  const liNodeList = doms.templatesLibraryContainer.querySelectorAll('li');
  const index = templatesList.length - 1;
  index >= 0 && liNodeList[index].click();
})

doms.save.addEventListener('click', e => {
  saveTemplateList()
})
// doms.saveToSelectedTemplate.addEventListener('click', e => {
//   if (currentTemplateIndex === null) return;
//   templatesList[currentTemplateIndex].components = currentTemplate;
// })