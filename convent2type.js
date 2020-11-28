(() => {
  const table = document.querySelectorAll('.x-table')

  const result = new Map()
  table.forEach((v, k1) => {
    let content = ''
    const tbody = v.querySelector('tbody')
    const tr = tbody.querySelectorAll('tr')

    // 父级title
    const grand = v.closest('pre')
    const title = grand.previousElementSibling.innerHTML

    tr.forEach((v, k2) => {
      let curLevel = v.getAttribute('data-level')
      const td = v.querySelectorAll('td')
      if (td.length === 3) {
        let field = td[0].querySelector('div>span').innerText
        field = field || ''
        let typ = td[1].innerText
        typ = typ || ''
        typ = toNumber(typ)
        let des = td[2].innerText
        des = des || ''
        let space = ''
        // if (des.length > 30) {
        //   des = des.substr(0, 30)
        //   des += '...'
        // }
        des = des.replace(/[\r\n]/g, ' ')
        curLevel = Number(curLevel)
        if (curLevel > 0) {
          for (let i = 0; i < curLevel; i++) {
            space += '\t'
          }
        }
        content += `${space}${field}?: ${typ} // ${des} \n`
      }
    })
    // if (curLevel )
    console.log(content)
    result.set(title, content)
  })
  // console.log(result);
})()

function toNumber (type) {
  let result = type
  switch (type) {
    case 'float':
      result = 'number'
      break
    default:
      break
  }
  return result
}
