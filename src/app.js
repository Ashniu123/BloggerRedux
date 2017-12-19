import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AppRouter, { history } from './routes/app_router';
import LoadingPage from './components/loading_page';
import reducers from './reducers';

import { login, logout } from './actions/auth';

import { firebase } from './firebase/firebase';

import '../styles/styles.scss';

const store = applyMiddleware(thunk)(createStore)(reducers); // create store with middleware

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
      , document.getElementById("root"));
    hasRendered = true;
  }
};

setTimeout(() => {
  renderApp();
}, 3000);

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     store.dispatch(login(user.uid));
//     store.dispatch(startSetExpenses()).then(() => {
//       renderApp();
//       if (history.location.pathname === '/') {
//         history.push('/dashboard');
//       }
//     });
//   } else {
//     store.dispatch(logout());
//     renderApp();
//     history.push('/');
//   }
// });