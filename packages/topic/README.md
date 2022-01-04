# cweb
## 配置及启动

```
配置host
127.0.0.1   cweb-dev.yy.com


执行node_modules安装
yarn
"tss:lib": "emp tss https://cweb-test.yy.com/topic/emp.d.ts -n types/emp.d.ts && emp tss https://cweb-test.yy.com/topic/emptype.d.ts -n types/emptype.ts"

运行环境
yarn dev

```
## 权限问题

```
对接项目人添加权限
测试环境：https://cweb-test.yy.com/
线上环境：https://cweb.yy.com/
```
## 地址访问
```
url: https://cweb-test.yy.com/topic/editor?pageId=6045e0630c963d62f806d48d

h5: https://cweb-test.yy.com/6045e0630c963d62f806d48d

env: dev、test、prod
```

## 基站地址
https://cweb-test.yy.com/topic/editor?pageId=6045e0630c963d62f806d48d


## 版本号管理
```
x.y.z是现在的线上版本号，x.y.z-branchName.n 是测试版本号
变色龙多版本，现在是按照x.y的版本去获取的。
线上会获取最新的~x.y版本。
测试会获取<x.y.z-branchName.999版本

比如当前测试版本有1.0.0-test.n
emp.js的模块版本为emp_1_0，添加组件时会引用1.0.0-test.n的链接
当组件版本升级到1.0.1-test.n，添加组件时会变成引用1.0.1-test.n的链接（1.0.0-test.n被替换）

当组件升级到emp_1_1，对应的版本号有1.1.z-test.n
对应的emp_1_0的链接还是保留之前最新的
新的的emp_1_1的链接继续按照上面的逻辑，引用1.1.z-test.n的链接。

总结即如果组件没有啥变化，正常只会变化z版本号，新添加时，则会引用新的链接
如果组件有些需要版本号替换或升级，无法兼容z版本，则增加y版本即可。
```