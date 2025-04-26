// 请求后端以及保存本地
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
  try {
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
  } catch (err) {
    console.log('无法访问服务端，但不影响本地保存');
  }
}
// 十秒自动保存
const timer = setInterval(saveTemplateList, 10000);