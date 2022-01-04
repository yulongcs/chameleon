import {
  TextAlign,
  Position,
  WhiteSpace,
  Margin,
  Display,
  Padding,
  BorderStyle,
  BorderRadius,
  Overflow,
} from './customWidget'

export const group1 = {
  name: '宽高&定位',
  render: [
    {
      col: {
        span: 24,
      },
      item: {
        formItemOptions: {},
        type: 'inputText',
        Comp: null,
        name: 'width',
        label: '容器宽度',
        options: {
          max: 375,
          min: 0,
        },
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        type: 'inputText',
        name: 'height',
        label: '容器高度',
        options: {
          min: 0,
          max: 667,
        },
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        type: 'custom',
        label: '容器定位',
        name: 'position',
        Comp: Position,
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        type: 'inputNumber',
        defaultValue: 0,
        name: 'top',
        label: 'top',
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        type: 'inputNumber',
        defaultValue: 0,
        name: 'left',
        label: 'left',
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        formItemOptions: {
          // tooltip: '所在层级',
        },
        type: 'inputNumber',
        // defaultValue: 0,
        name: 'zIndex',
        label: 'zIndex',
      },
    },
  ],
}

const group2 = {
  name: '字体',
  render: [
    {
      col: {
        span: 24,
      },
      item: {
        type: 'inputText',
        name: 'fontSize',
        defaultValue: 8,
        label: '字体大小',
        options: {
          max: 100,
          min: 0,
        },
        unit: 'vw',
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        type: 'colorPicker',
        label: '字体颜色',
        name: 'color',
        options: {
          type: 'hex',
        },
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        type: 'custom',
        label: '对其方式',
        name: 'textAlign',
        Comp: TextAlign,
      },
    },
  ],
}

const group3 = {
  name: '背景&透明度',
  render: [
    {
      col: {
        span: 24,
      },
      item: {
        type: 'slider',
        label: '透明度',
        name: 'opacity',
        options: {
          min: 0.01,
          step: 0.01,
          max: 1,
        },
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        type: 'colorPicker',
        label: '背景颜色',
        name: 'backgroundColor',
        options: {
          type: 'hex',
        },
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        type: 'upload',
        label: '背景图',
        name: 'backgroundImage',
        options: {
          format: (str: string) => `url(${str})`,
        },
      },
    },
  ],
}

const group4 = {
  name: '边距',
  render: [
    {
      col: {
        span: 24,
      },
      item: {
        formItemOptions: {
          noStyle: true,
          tooltip: '',
        },
        type: 'custom',
        label: '外边距',
        name: 'margin',
        Comp: Margin,
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        formItemOptions: {
          noStyle: true,
          tooltip: '',
        },
        type: 'custom',
        label: '内边距',
        name: 'padding',
        Comp: Padding,
      },
    },
  ],
}

const group5 = {
  name: '布局',
  render: [
    {
      col: {
        span: 24,
      },
      item: {
        formItemOptions: {},
        type: 'custom',
        label: '容器布局方式',
        name: 'display',
        Comp: Display,
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        formItemOptions: {},
        type: 'custom',
        label: 'X轴内容超出显示方式',
        name: 'overflowX',
        Comp: Overflow,
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        formItemOptions: {},
        type: 'custom',
        label: 'Y轴内容超出显示方式',
        name: 'overflowY',
        Comp: Overflow,
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        type: 'custom',
        label: '子元素是否换行',
        name: 'whiteSpace',
        Comp: WhiteSpace,
      },
    },
  ],
}

const group6 = {
  name: '边框',
  render: [
    {
      col: {
        span: 24,
      },
      item: {
        formItemOptions: {},
        type: 'custom',
        label: '边框样式',
        name: 'borderStyle',
        Comp: BorderStyle,
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        formItemOptions: {},
        options: {
          min: 0,
        },
        type: 'inputNumber',
        label: '边框宽度',
        name: 'borderWidth',
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        formItemOptions: {},
        type: 'colorPicker',
        label: '边框颜色',
        name: 'borderColor',
      },
    },
    {
      col: {
        span: 24,
      },
      item: {
        formItemOptions: {},
        type: 'custom',
        label: '边框圆角',
        name: 'borderRadius',
        Comp: BorderRadius,
      },
    },
  ],
}
export const formList = [group1, group2, group3, group4, group5, group6]

export const styleList = [
  //group1
  'width',
  'height',
  'position',
  'left',
  'top',
  'zIndex',
  //group2
  'textAlign',
  'fontSize',
  'color',
  //group3
  'opacity',
  'backgroundColor',
  'backgroundImage',

  //group4
  'margin',
  'padding',
  //group5
  'display',
  'borderWidth',
  'borderStyle',
  'borderColor',
  'borderRadius',
  'overflowY',
  'overflowX',
  'whiteSpace',
]
