// 将 html table 中的数据格式化 到接口中
(() => {
  const table = document.querySelectorAll('table')

  const result = new Map()
  table.forEach((v, k1) => {
    let content = ''
    const tbody = v.querySelector('tbody')
    const tr = tbody.querySelectorAll('tr')

    // 父级title
    const title = `${k1}table`

    tr.forEach((v, k2) => {
      const td = v.querySelectorAll('td')
      let field = td[0].innerText.trim()
      field = field || ''
      let des = td[1].innerText.trim()
      des = des || ''
      let space = ''
      // if (des.length > 30) {
      //   des = des.substr(0, 30)
      //   des += '...'
      // }
      field = field.replace(/∟/g, '')
      des = des.replace(/[\r\n]/g, ' ').trim()
      space += '\t'
      content += `${space}${field}?: string // ${des}\n`
    })
    // if (curLevel )
    console.log(content)
    result.set(title, content)
  })
  // console.log(result);
})()
