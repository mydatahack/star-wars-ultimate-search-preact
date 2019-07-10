import { h, render } from 'preact'
import '../public/style/bootstrap.scss'
import '../public/style/custom.scss'
import App from './App'
import { Provider } from 'preact-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
