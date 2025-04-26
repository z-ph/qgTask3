doms.currentTemplateContainer.addEventListener('click', e => {
  if (isOrbelongTo(e.target, doms.currentTemplateContainer)) {
    // console.log('yes')

    const id = +e.target.getAttribute('data-id') || +e.target.parentNode.getAttribute('data-id');
    // console.log(id)
    const component = currentTemplate.find(formElem => formElem.id === id);
    const dialog = new MyDialog(component)
    dialog.showModal()
  }
})

function isOrbelongTo(dom, parentDom) {
  while (dom) {
    if (dom === parentDom) return true;
    dom = dom.parentNode;
  }
  return false;
}