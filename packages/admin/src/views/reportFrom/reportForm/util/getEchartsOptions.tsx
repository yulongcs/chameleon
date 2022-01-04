/**
 * 该函数用于批量生成echarts配置
 * @param timeRange 报表时间戳
 * @param activities echarts数据对象
 * @param legendPosition echarts标签位置
 * @param type 表报类型（本周、本月等）
 * @returns eharts配置对象
 */
export const getEhartsOptions = (timeRange: string, activities: any, legendPosition: string, type: string) => {
  return {
    title: {
      text: type,
      subtext: timeRange,
      left: 'center',
      textStyle: {fontSize: 20},
    },
    tooltip: {
      trigger: activities?.allCount ? 'item' : '',
      formatter: activities?.allCount ? '{a} <br/>{b} : {c} ({d}%)' : '{b}',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      [legendPosition]: 0,
      top: 20,
      bottom: 20,
      data: activities?.allCount ? activities?.legendData : [],
      legendunselected: (value: any) => {},
    },
    series: [
      {
        name: '新增活动',
        type: 'pie',
        radius: '180',
        center: ['50%', '60%'],

        data: activities?.allCount
          ? activities?.seriesData
          : [{name: '暂未发布活动', value: 0, itemStyle: {color: '#ccc'}}],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          normal: {
            position: activities?.allCount ? 'outer' : 'center',
            show: true,
            formatter: activities?.allCount ? '{b}-{c}' : '{b}',
            labelLine: {show: true},
            textStyle: {
              // fontWeight: activities?.allCount ? 300 : 300,
              fontSize: activities?.allCount ? 12 : 20, //文字的字体大小
            },
          },
        },
      },
    ],
  }
}
