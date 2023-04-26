import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import AppContent from './components/AppContent'

if (document.getElementById('app')) {
  ReactDOM.render(
    <Provider store={store}>
      <div className='container'>
        <AppContent />
      </div>
    </Provider>, document.getElementById('app'));
}