const s = `-- auto-generated definition
create table g_novel_monitor_data_source
(
    id                             int unsigned auto_increment primary key,
    config_id                      int                 default 0                 not null comment '配置表的id,表g_novel_monitor_data_config',
    account_status                 varchar(15)         default ''                not null comment '帐号状态',
    begin_date                     varchar(15)         default ''                not null comment '起投日期',
    delivery_date                  varchar(15)         default ''                not null comment '交付日期',
    observer                       varchar(20)         default ''                not null comment '投放人员',
    date                           varchar(15)         default ''                not null comment '当日日期',
    ghid                           varchar(100)        default ''                not null comment '公众号ghid',
    wechat_name                    varchar(50)         default ''                not null comment '公众号名称',
    type                           varchar(15)         default ''                not null comment '账号类型',
    website_name                   varchar(30)         default ''                not null comment '所属平台',
    rate                           varchar(10)         default ''                not null comment '书城分成',
    increase                       varchar(10)         default ''                not null comment '新增用户',
    new_user_recharge_num          varchar(10)         default ''                not null comment '当日新增充值人数',
    increase_recharge              varchar(10)         default ''                not null comment '当天总付费人数',
    new_user_recharge_money        varchar(15)         default ''                not null comment '当日新增充值（分成前）',
    total_recharge_amount          varchar(15)         default ''                not null comment '当日总充值（分成前）',
    business_income                varchar(15)         default ''                not null comment '商务收入',
    traffic_income                 varchar(15)         default ''                not null comment '流量主收入',
    new_user                       varchar(10)         default ''                not null comment '公众号新增',
    netgain_user                   varchar(10)         default ''                not null comment '公众号净增',
    cost                           varchar(15)         default ''                not null comment '账户币消耗',
    action_count                   varchar(10)         default ''                not null comment '转化数',
    run_name                       varchar(20)         default ''                not null comment '运营人员',
    \`group\`                        varchar(15)         default ''                not null comment '分组',
    main_input_book_name           varchar(30)         default ''                not null comment '主推书名',
    main_role                      varchar(20)         default ''                not null comment '主角名',
    direct_one                     varchar(20)         default ''                not null comment '定向1',
    direct_two                     varchar(20)         default ''                not null comment '定向2',
    history_fllow                  varchar(10)         default ''                not null comment '总关注用户',
    total_register_user            varchar(10)         default ''                not null comment '平台注册用户',
    history_paid_user              varchar(10)         default ''                not null comment '累计付费用户',
    net_follow_num                 varchar(10)         default ''                not null comment '净关注用户',
    custom_send_people_num         varchar(10)         default ''                not null comment '客服消息发送人数',
    custom_total_uv                varchar(10)         default ''                not null comment '客服消息UV',
    custom_daily_uv                varchar(10)         default ''                not null comment '客服消息当日UV',
    custom_total_recharge          varchar(15)         default ''                not null comment '客服消息总充值',
    custom_daily_recharge          varchar(15)         default ''                not null comment '客服消息当日充值',
    menu_uv                        varchar(10)         default ''                not null comment '菜单链接总UV',
    menu_dayuv                     varchar(10)         default ''                not null comment '菜单链接当日UV',
    menu_money                     varchar(15)         default ''                not null comment '菜单链接总充值',
    menu_daymt                     varchar(15)         default ''                not null comment '菜单链接当日充值',
    promote_uv                     varchar(10)         default ''                not null comment '推广链接总UV',
    promote_dayuv                  varchar(10)         default ''                not null comment '推广连接当日UV',
    promote_money                  varchar(15)         default ''                not null comment '推广链接总充值',
    promote_daymt                  varchar(15)         default ''                not null comment '推广链接当日充值',
    history_user_paid_transactions varchar(10)         default ''                not null comment '累计总完成订单',
    history_user_transactions      varchar(10)         default ''                not null comment '累计总订单',
    user_paid_transactions         varchar(10)         default ''                not null comment '当日总完成订单',
    main_input_recharge            varchar(15)         default ''                not null comment '主投书充值',
    other_input_recharge           varchar(15)         default ''                not null comment '其他书充值',
    history_fans                   varchar(10)         default ''                not null comment '累计粉丝',
    fans_package                   varchar(15)         default ''                not null comment '人群包',
    ads_position                   varchar(30)         default ''                not null comment '朋友圈 底部 小程序',
    run_group                      varchar(30)         default ''                not null comment '运营部门',
    year                           varchar(10)         default ''                not null comment '年份',
    new_add_roi                    varchar(10)         default ''                not null comment '新增ROI',
    refer_roi                      varchar(10)         default ''                not null comment '参考ROI',
    fix_roi                        varchar(10)         default ''                not null comment '修正ROI',
    control_roi                    varchar(10)         default ''                not null comment '控制ROI',
    advertise_rate                 varchar(10)         default ''                not null comment '服务商返点',
    quarter                        tinyint(2) unsigned default 0                 not null comment '季度',
    uv                             int                                           not null comment 'uv数',
    pv                             int                 default 0                 not null comment 'pv数',
    quarter_calc                   tinyint(2) unsigned default 0                 not null comment '计算季度',
    create_time                    timestamp           default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time                    timestamp           default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '修改时间'
)
    comment '小说监控室数据源表';
`

// s.replace('/\n/g','')

function getToken (s) {
  let token = s.trim().split('\n')

  token = token.slice(3, -3)

  const result = []
  for (let i = 0; i < token.length; i++) {
    const minToken = token[i].replace(/(\s+)/g, '$')
    const key = minToken.split('$')[1].replace(/`/g, '')
    let type = minToken.split('$')[2]
    if (type.indexOf('char') !== -1) {
      type = 'string'
    } else if (type.indexOf('int') !== -1) {
      type = 'number'
    }
    result.push({ key: key, type: type })
  }
  return result
}

function genInterface (token) {
  let inter = 'interface AutoGen {' + '\n'
  token.map(({ key, type }) => {
    inter += `\t${key} ?: ${type} \n`
  })

  inter += '}'

  console.log(inter)
}

function genSequelizeClass (token) {
  let inter = 'interface AutoGen {' + '\n'
  token.map(({ key, type }) => {
    inter += `public ${key} !: ${type} \n`
  })

  inter += '}'

  console.log(inter)
}

function genSequelizeInit (token) {
  let inter = ''
  token.map(({ key, type }) => {
    const defaultValue = type === 'number' ? 0 : "''"
    type = `DataTypes.${type.toUpperCase()}`
    inter += `${key} :{ type: ${type} ,allowNull:true ,defaultValue: ${defaultValue} },\n`
  })

  console.log(inter)
}

genSequelizeInit(getToken(s))
