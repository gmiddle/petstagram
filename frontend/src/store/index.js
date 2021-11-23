import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import postReducer from './posts';
import modal from './modal';
import singlePostReducer from './singlePost';
import commentsReducer from './comments';
import users from './users';


const rootReducer = combineReducers({
  session,
  posts: postReducer,
  singlePost: singlePostReducer,
  comments: commentsReducer,
  modal,
  users

});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
