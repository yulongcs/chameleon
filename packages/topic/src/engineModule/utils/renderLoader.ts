import ReactDOM from 'react-dom'

export const renderMethod = typeof window !== undefined ? ReactDOM.render : ReactDOM.hydrate
export const unmountComponentAtNode = ReactDOM.unmountComponentAtNode
