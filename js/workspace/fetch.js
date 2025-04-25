// 后续将localStorage改成向发送数据库post请求
async function saveTemplateList() {
  // 保存到localStorage
  localStorage.setItem('templatesList', JSON.stringify(templatesList));
  //设置保存状态
  savedProxy.value = true;
  // fetch 发送到数据库
  const data = {
    templatesList: templatesList,
    token: JSON.parse((localStorage.getItem('token')))
  }
  const res = await fetch('http://localhost:3000/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const body = await res.json();
  if (body.code !== 200) {
    alert('服务端同步保存失败(不影响本地保存)');
  }
}