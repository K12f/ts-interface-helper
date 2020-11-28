const s = `export interface IAuto{ 
  app_id ?:string
  config_id?:number
  ghid ?:string
  date ?:string
  observer ?:string
  begin_date ?:string
  fans_package ?:string
  rate ?:number
  run_group ?:string
  group ?:string
  book_name ?:string
  type ?:string
  delivery_date ?:string
  year ?:string
  website_name ?:string
  ads_position ?:string
  run_days ?:string
  wechat_name ?:string
  run_name ?:string
  main_input_recharge ?:string
  history_paid_user ?:string
  history_fans ?:string
  remain_rate ?:string
  cs_rate ?:string
  active_rate ?:string
  income ?:string
  total_income ?:string
  total_cost ?:string
  total_new_income ?:string
  daily_roi_increase ?:string
  main_book_ratio ?:string
  arppu ?:string
  payment_cost ?:string
  total_roi ?:string
}`

run(s)

function run (s, keys = [], suffix = 'Schema') {
  const token = splitTokens(s)
  const schema = genSchema(token, keys, suffix)
  console.log(schema)
}

function splitTokens (interfaceString) {
  const tokens = []
  const patternTitle = /\w*\s*interface\s*(\w+)\s*{/
  const patternToken = /(\w+)\s*(\??):\s*(\w+)\s*/

  if (interfaceString.search('interface') === -1) {
    throw Error('can not found interface')
  }
  interfaceString = interfaceString.trim()
  const splitInterface = interfaceString.split('\n')

  // 去掉第一个和最后一个
  const firstLine = splitInterface.shift()
  const [, title] = firstLine.match(patternTitle)
  splitInterface.pop()

  splitInterface.map((v) => {
    // 每行分为3个token, : 前面是否有? 则是 required的 true or false, 后面则是类型, 不能匹配到的默认字符串
    // name
    let [, name, isRequired, type] = v.match(patternToken)
    let note = v.split('//')[1]
    note = note ? note.trim() : ''
    isRequired = !isRequired
    if (type.length < 0) {
      throw Error('can not find value type')
    }
    type = type[0].toUpperCase() + type.slice(1)
    tokens.push({ name: name, isRequired: isRequired, type: type, note: note })
  })
  return { title: title, tokens: tokens }
}

function genSchema (token, keys = [], suffix = 'Schema') {
  let schema = ''
  const title = token.title
  const tokens = token.tokens
  schema += `export const ${title}${suffix} = new Schema({ \n`
  tokens.map(v => {
    let index = false
    if (keys.indexOf(v.name) !== -1) {
      index = true
    }
    if (v.note) {
      v.note = ` // ${v.note}`
    }
    schema += `  ${v.name}: { type: ${v.type}, required: ${v.isRequired}, index: ${index} },${v.note}\n`
  })
  schema += '})'
  return schema
}
