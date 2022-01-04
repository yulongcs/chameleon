declare type RankItem = {
  uid: string // 主播id
  sid: string // 频道id
  liveStatus: number // 开播状态： 0 未开播，1开播中
  nickName: string //  用户名
  avatar: string // 头像
  value: string //积分数值
}

declare type ActivityRankInfo = {
  activityInfo: {
    activityId: number // 活动id
    status: number // 状态: 1 未开始，2 进行中，3 已结束
    startTime: string // 开始时间
    endTime: string // 结束时间
    startCountdown: string // 开始倒计时
    endCountdown: string // 结束倒计时
    rankLength: number // 排行榜长度
  }
  rankItems: Array<RankItem>
  nickExt: string // 用户多昵称json
  sourceHostIds: string // 用户来源hostid,json
  currentRankNo: number // 当前排名
  value: string // 积分
}
