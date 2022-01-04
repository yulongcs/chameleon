export const timeStringFormat = (value: number, type: string) => {
  switch (type) {
    case 'week':
      return value + '周'
    case 'month':
      if (value < 10) {
        return '0' + (value + 1)
      } else {
        return value
      }
    case 'quarter':
      return 'Q' + value
    case 'year':
      return ''
  }
}
