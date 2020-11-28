// https://ad.oceanengine.com/openapi/doc/index.html?id=528

function gOne (text, name = 'AutoGen') {
  let result = `export enum ${name} { \n`

  text.split('\t').map(function (v, i) {
    // AD_STATUS_DELIVERY_OK='OK' //投放中
    console.log(v)
    console.log(i % 2)
    if (i % 2 === 0) {
      result += `\t${v} = '${v.split('_').slice(-1)}'`
    } else {
      result += ` // ${v} \n`
    }
  })
  result += '}'
  console.log(result)
}

function gOne4ThreeColumn (text, name = 'AutoGen') {
  let result = `export enum ${name} { \n`

  text.split('\t').map(function (v, i) {
    // AD_STATUS_DELIVERY_OK='OK' //投放中
    if (i % 3 === 0) {
      result += `\t${v}`
    } else if (i % 3 === 1) {
      if (isNaN(v)) {
        result += ` = '${v}',`
      } else {
        result += ` = ${v},`
      }
    } else {
      result += ` // ${v} \n`
    }
  })
  result += '}'
  console.log(result)
}

// 获取所有 枚举

(() => {
  function getAllEnum () {
    const table = document.querySelectorAll('table')
    let result = ''
    const regx = /[-，.]/g
    table.forEach(function (v, i) {
      const title = v.previousElementSibling.innerText
      const tbody = v.querySelector('tbody')
      result += `// ${title} \n`
      result += `export enum ${title.replace(regx, '_')} { \n`
      tbody.querySelectorAll('tr').forEach(function (v2, i2) {
        const td = v2.querySelectorAll('td')
        const td1Text = td[0].innerText
        let td1Temp = td1Text
        const td2Text = td[1].innerText.replace(/[\r\n]/g, ' ')

        if (!isNaN(td1Temp) || !isNaN(td1Temp.substr(0, 1))) {
          td1Temp = `Num_${td1Temp}`
        }

        td1Temp = td1Temp.replace(regx, '_')

        // result += `\t${td1Temp} = '${td1Text.split('_').slice(-1)}', // ${td2Text} \n`
        result += `\t${td1Temp} = '${td1Text}', // ${td2Text} \n`
      })
      result += '} \n\n'
    })
    console.log(result)
  }

  getAllEnum()
})()
