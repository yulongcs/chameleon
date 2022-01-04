import React from 'react'
class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {hasError: false, error: '', errorInfo: ''}
  }

  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {hasError: true}
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 你同样可以将错误日志上报给服务器
    console.log(error, errorInfo)
    this.setState({error, errorInfo})
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <div>
          <h1>{this.state.error.toString()}</h1>
          <h5 dangerouslySetInnerHTML={{__html: JSON.stringify(this.state.error.stack, null, 2)}}></h5>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
