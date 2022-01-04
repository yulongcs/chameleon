/**
 * 该函数用于返回某时间点是否在某个时间范围内
 * @param time 需要判断的时间点时间戳
 * @param type 时间范围类型： 周、月、季度、年
 * @param selectedTime 时间范围： 某周、某月、某季度、某年等
 * @returns 如果不在该时间范围返回false,如果在该范围则返回该返回起始时间戳，为number[]
 */
export const getTimeRange = (time: any, type: string, selectedTime?: string): boolean | number[] => {
  const oneDayLong = 24 * 60 * 60 * 1000
  const oneWeekLong = oneDayLong * 7
  let firstDate = 0
  let lastDate = 0
  const date = new Date(time)
  switch (type) {
    case 'week':
      //获取当天零点时间戳
      const curTime = new Date(date.toLocaleDateString()).getTime()
      //获取当前在本周中第几天
      //周一0点
      firstDate = curTime - (date.getDay() - 1) * oneDayLong
      //周日0点
      lastDate = Number(firstDate) + oneWeekLong - 1
      break
    case 'month':
      //获取当月第一天时间
      firstDate = new Date(date.getFullYear(), date.getMonth()).getTime()
      //获取下月第一天时间(当月最后一天最后一秒的时刻)
      lastDate = new Date(date.getFullYear(), date.getMonth() + 1).getTime() - 1
      break
    case 'quarter':
      const quarter = Math.floor(
        (date.getMonth() + 1) % 3 === 0 ? (date.getMonth() + 1) / 3 : (date.getMonth() + 1) / 3 + 1,
      )
      firstDate = new Date(date.getFullYear(), (quarter - 1) * 3).getTime()
      lastDate = new Date(date.getFullYear(), quarter * 3).getTime() - 1
      break
    case 'year':
      firstDate = new Date(date.getFullYear(), 0).getTime()
      lastDate = new Date(date.getFullYear(), 12).getTime() - 1
      break
    default:
      'week'
      break
  }
  if ((firstDate <= Number(selectedTime) && Number(selectedTime) <= lastDate) || !selectedTime) {
    return [firstDate, lastDate]
  } else {
    return false
  }
}
