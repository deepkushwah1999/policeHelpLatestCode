import React from 'react'
import Routes from './src/Routes/Routes'
import { Provider } from 'react-redux'
import { store } from './src/_helpers'

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
export default App