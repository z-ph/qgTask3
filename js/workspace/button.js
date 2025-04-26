//按钮事件
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
  if (template.index === undefined && template.template.length > 0) {
    templatesList.at(-1).components = template.template;
  }
  //当前显示模板指向新建的模板，并渲染
  template.template = templatesList[templatesList.length - 1].components;
  template.index = templatesList.length - 1;
  renderTemplatesList();
  // 新建模板自动保存
  doms.save.click();
  // 模拟用户点击最后一个模板
  const liNodeList = doms.templatesLibraryContainer.querySelectorAll('li');
  liNodeList[liNodeList.length - 1].click();
})


doms.deleteCurrentTemplate.addEventListener('click', e => {
  //删除template.index指向的模板
  if (template.index === undefined) return;
  templatesList.splice(template.index, 1);
  //设置保存状态
  savedProxy.value = false;
  //将id重新赋值
  templatesList.forEach((template, index) => {
    template.id = index;
  })
  currentTemplate = []
  template.index = undefined;

  // 重新渲染模板列表和当前模板
  renderTemplatesList();
  template.render();

  // 模拟用户点击最后一个模板
  const liNodeList = doms.templatesLibraryContainer.querySelectorAll('li');
  const index = templatesList.length - 1;
  index >= 0 && liNodeList[index].click();
})

doms.save.addEventListener('click', e => {
  saveTemplateList()
})
// doms.saveToSelectedTemplate.addEventListener('click', e => {
//   if (template.index === null) return;
//   templatesList[template.index].components = currentTemplate;
// })